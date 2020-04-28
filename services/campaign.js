const campaignRepository = require('../repositories/campaign');
const transactionRepository = require('../repositories/transaction');
const redisRepository = require('../repositories/redis');
const bqRepository = require('../repositories/bq');
const offerService = require('../services/offer');
const pageService = require('../services/page');
const notificationService = require('../services/notification');

const validateCampaign = (myCampaign) => {
    try {
        if(myCampaign.name && myCampaign.name !== "" 
            && myCampaign.pageId && (myCampaign.positionId || myCampaign.position)  && myCampaign.from && myCampaign.to){
            return true
        }
        return false
    } catch (e) {
        throw (e);
    }
}

const findCollisions = async (myCampaign)  => {

    let response = {};
    response.collisions = [];
    response.collisionsLive = false;
    //get all the campaigns with from or to date between myCampaign.to and mycampaign.from
    //for each founded campaign fill the array of collisions setting the name, id and status
    let filters = {
        dates: {
            to: myCampaign.to,
            from: myCampaign.from
        },
        positionId: myCampaign.positionId
    };
    try {
        let collisionCampaigns =  await campaignRepository.fetchAll(filters);
        if(collisionCampaigns && collisionCampaigns.length>0){
            collisionCampaigns.forEach(myCollisionCampaign => {
                if (myCollisionCampaign.id !== myCampaign.id){
                    response.collisions.push({
                        id: myCollisionCampaign.id,
                        status: myCollisionCampaign.status,
                        name: myCollisionCampaign.name
                    });
                    if ((myCollisionCampaign.status === 'LIVE')||(myCollisionCampaign.status === 'SCHEDULED')){
                        response.collisionsLive = true
                    }

                }
            });
        
            var msg = response.collisions.map(function (myCollision) {
                return myCollision.name;
            }).join(", ");
            if (response.collisions.length > 0){
                response.msg = `Collision with: ${msg}`
            }
        }

        return response
    } catch (error) {
        throw(error)
    }

}

const getTagsByType = (tagType, tags) => {
    let cleanTags = tags.filter( (tag) => {
        return tag.type === tagType;
    } ).map( (tag) => {
        return { "id": tag.id,
                "name": tag.name}
    });
    return cleanTags
}

const create = async (campaignInfo) => {

    //Add extra fields
    let warning = "";
    campaignInfo.status = 'DRAFT';
    campaignInfo.createdAt = new Date();
    try {
        let response = await findCollisions(campaignInfo);

        if (response.msg) {
            warning = response.msg
        }
        let campaignInserted = await campaignRepository.create(campaignInfo);
        let result = { "campaign": campaignInserted, "warning": warning}
        return result
        
    } catch (e) {
        throw (e);
    }
}

const remove = async (id) => {
    try {
        return await campaignRepository.remove(id);
    } catch (e) {
        throw (e);
    }
}

const fetch = async (id) => {
    try {
        return await campaignRepository.fetch(id);
    }catch(e){
        throw (e);
    }
}

const fetchAll = async (filters) => {

    try{
        return await campaignRepository.fetchAll(filters);
    }catch(e){
        throw (e);
    }
}

const fetchAllWithOffers = async (filter) => {
    try {
        return await campaignRepository.fetchAllWithOffers(filter);
    } catch (e) {
        throw (e);
    }
}

const fetchCampaignWithOffers = async (id) => {
    try {
        let myCampaign = await campaignRepository.fetchCampaignWithOffers(id);
        return myCampaign
    }catch(e){
        throw (e);
    }
}

const fetchOffersByCampaign = async (id) => {
    try {
        let campaigns = await campaignRepository.fetchCampaignWithOffers(id);
        campaigns = campaigns.toJSON();
        if (campaigns && campaigns.offers){
            let offers = campaigns.offers;
            for(let myOffer of offers){
                if (myOffer){
                    delete myOffer.CampaignOffers
                    myOffer.segmentationTags = getTagsByType('segmentation', myOffer.tags);
                    myOffer.documentationTags = getTagsByType('thematic', myOffer.tags);
                    delete myOffer.tags
                } 
            }
            return offers;
        } else
            return [];
    }catch(e){
        throw (e);
    }
}

const update = async (campaignId, campaignInfo) => {
        let transaction;

        try {
            // get transaction
            transaction =  await transactionRepository.getTransaction();
            let myCampaign = await campaignRepository.fetchCampaignWithOffers(campaignId)
            let myOffers = (campaignInfo.offers || []);
            let offersId = [];

            for (const myOffer of myOffers) {
                if (myOffer.id && myOffer.id!=="") {
                    offersId.push(myOffer.id);
                    myOffer.campaignId = campaignId;
                    await offerService.update(myOffer.id, myOffer, transaction)
                } else {
                    myOffer.campaignId = campaignId;
                    const offerCreated = await offerService.create(myOffer, transaction)
                    offersId.push(offerCreated.id);
                }
            }
            //eliminate the relations for offers that stop to come
            myCampaign.offers.forEach(myOffer => {
                if (!offersId.includes(myOffer.id)) {
                    offerService.remove(myOffer.id, transaction)
                }
            });
            campaignInfo.id = parseInt(campaignId);
            campaignInfo.positionId = myCampaign.positionId;
            let collisionsResponse = await findCollisions(campaignInfo);
            if (myCampaign.status==='LIVE' && collisionsResponse.collisionsLive) {
                 throw ("Cannot save. " + collisionsResponse.msg)
            }else{
                await campaignRepository.update(campaignId, campaignInfo, transaction);
                // commit
                await transaction.commit();
                let warning;
                if (collisionsResponse.collisions){
                    warning = collisionsResponse.msg;
                }
                let campaignUpdated = await campaignRepository.fetchCampaignWithOffers(campaignId);
                const result = { "campaign": campaignUpdated, "warning": warning}
                return result
            }


        } catch (e) {
            // Rollback transaction only if the transaction object is defined
            if (transaction){
                await transaction.rollback();
            }
            console.error(e)
            throw (e);
        }
}

const processCampaign = (myCampaign) => {
    try {
        let validateResult;
        let error = "";
        const now = Date.now();
        if ((myCampaign.to < now) && ((myCampaign.status === "PAUSED") || (myCampaign.status === "LIVE"))) {
            //the campaign LIVE or PAUSED goes CLOSED if the date pass.
            validateResult = 'CLOSED';
            
        }else if (validateCampaign(myCampaign)) {
            //only one offer must be default and the default must be live
            let defaultCount = 0;
            let hasNotLiveOffer = false;
            myCampaign.offers.forEach((myOffer) => {
                if (myOffer.defaultOffer) {
                    if (myOffer.status === 'LIVE'){
                        defaultCount++;
                    }else{
                        error= " The default offer is incomplete, please check the required fields marked with *."
                    }
                }
                if (myOffer.status !== 'LIVE'){
                    hasNotLiveOffer = true
                }
            });
            if (defaultCount === 1) {
                //check the date to see if is sheduled complete live
                if (myCampaign.to < now) {
                    if (myCampaign.status !== "CLOSED") {
                        validateResult = 'CLOSED';
                    }
                    error= "The campaign's dates are already past and can not be launched"
                } else if (myCampaign.from > now) { 
                    if (myCampaign.status !== "SCHEDULED") {
                        validateResult = 'SCHEDULED';
                    }
                } else {
                    if (myCampaign.status !== "LIVE") {
                        //Check if there is any offer not live
                        if (hasNotLiveOffer){
                            notificationService.create({
                                "type": "Warning",
                                "text": `The Campaign ${myCampaign.name} went LIVE with some offers incomplete or paused`,
                                "campaignId": myCampaign.id
                            })
                        }
                        validateResult = 'LIVE';
                    }
                }
            }else{
                //more or less than 1 default
                if ((myCampaign.status !== "DRAFT") && (myCampaign.status !== "PAUSED")) {
                    validateResult = 'DRAFT';
                }
                if (error){
                    error = error + " You need only one default offer in LIVE state to launch the campaign and you have " + defaultCount + ".";
                }else{
                    error =" You need only one default offer in LIVE state to launch the campaign and you have " + defaultCount + ".";
                }

            }
        } else {
            //campaign data is not complete so change status a draft
            if ((myCampaign.status !== "DRAFT") && (myCampaign.status !== "PAUSED")) {
                validateResult = 'DRAFT';
            }
            error= "The Campaign needs a name, page, position and dates to launch."
        }
        responseObj = {
            status: validateResult,
            error: error
        }
        return responseObj;
    } catch (e) {
        throw (e);
    }
}


const refreshCacheActiveCampaigns = async () => {

    try {
        console.log("REFRESCANDO CAMPAIGN DATA", new Date())
        await redisRepository.openConnection();
        let campaignData = {
            "name": "Campaign Data JSON 1.0",
            "creation_date": new Date().toString(),
            "pageId": null
        }
        const myFilter = { status: { "or": ["LIVE"] } };
        let allCampaigns = await fetchAllWithOffers(myFilter);
        let myPageId= -1;
        let campaignsPerPage = [];
        for (let myCampaign of allCampaigns){
            if (myCampaign.offers){
                if (myCampaign.toJSON){
                    myCampaign = myCampaign.toJSON();
                }
                myCampaign.offers.sort(function (a, b) {
                    return (b.goal - b.clicks) - (a.goal - a.clicks)
                });
                //remove the not live offers
                let myOffers = [];
                myCampaign.offers.forEach(myOffer => {
                    if(myOffer.status === 'LIVE'){
                        myOffers.push(myOffer);
                    }
                });
                myCampaign.offers = myOffers;
                if (myCampaign.pageId !== myPageId) {
                    if ((campaignsPerPage.length > 0) && (myPageId > 0)) {
                        campaignData.pageId = myPageId;
                        campaignData.campaigns = campaignsPerPage;
                        let sizes = await pageService.fetchSizesByPage(myPageId);
                        if (sizes) {
                            campaignData.classes = sizes;
                        }
                        redisRepository.setCampaignData(myPageId, campaignData);
                        campaignsPerPage = [];
                    }
                }
                campaignsPerPage.push(myCampaign);
                myPageId = myCampaign.pageId;
            }
        }

        if (campaignsPerPage) {
            campaignData.pageId = myPageId;
            campaignData.campaigns = campaignsPerPage;
            let sizes = await pageService.fetchSizesByPage(myPageId);
            if (sizes) {
                campaignData.classes = sizes;
            }
            redisRepository.setCampaignData(myPageId, campaignData);
            campaignsPerPage = [];
        }
        
        await redisRepository.closeConnection();
        return {"result": "ok"};

    } catch (e) {
        throw (e);
    }
}

const refreshCampaigns = async () => {
    try {
        //Update events with the data from BQ
        let rows = await bqRepository.getNewEvents();
        rows.forEach((row) =>{
            if(row.eventType === 'click'){
                offerService.updateEvent(row.offerId, {
                    "clicks": parseInt(row.eventCount)
                });
            } else if (row.eventType === 'impression') {
                offerService.updateEvent(row.offerId, {
                    "impressions": parseInt(row.eventCount)
                });
            }
        });
        //Only process the live of scheduled
        const myFilter = { status: {"or": ["LIVE", "SCHEDULED"] } };
        let campaigns = await fetchAllWithOffers(myFilter);

        for (const myCampaign of campaigns) {
            const status = await processCampaign(myCampaign).status;
            if (status !== undefined)
                //only can change to closed if comes from live or paused status
                if (((status === 'CLOSED') && (myCampaign.status === 'LIVE')) || ((status === 'CLOSED') && (myCampaign.status === 'PAUSED')) || (status !== 'CLOSED')  ){
                    await campaignRepository.update(myCampaign.id, { status: status });
                }                
        }
        //check for errors in bq
        rows = await bqRepository.getNewErrors();
        const maxAllowedNumOfErrorByCampaign = 10;
        if (rows&&rows.length>0){
            for (const row of rows) {
                if (row.count > maxAllowedNumOfErrorByCampaign){
                    //fetch campaign
                    let myCampaign = await campaignRepository.fetch(row.campaignId)
                    //check if already notificated the same day
                    let alreadyNotificated = false;
                    const today = new Date();
                    alreadyNotificated = (myCampaign && myCampaign.lastNotificationDate &&  myCampaign.lastNotificationDate.getFullYear() === today.getFullYear() &&
                        myCampaign.lastNotificationDate.getMonth() === today.getMonth() &&
                        myCampaign.lastNotificationDate.getDate() === today.getDate());
                    if (myCampaign && myCampaign.status !== "PAUSED" && !alreadyNotificated){
                        await campaignRepository.update(myCampaign.id, { status: "PAUSED", lastNotificationDate: new Date() });
                        notificationService.create({
                            "type": "Error",
                            "text": `The default offer url of the Campaign ${myCampaign.name} is not in the page. The campaign was PAUSED`,
                            "campaignId": myCampaign.id
                        })
                    }
         
                } 
            };
        }

        return {
            "result": "ok"
        };
    } catch (e) {
        throw (e);
    }
}


const draftReview = async () => {
    try {

        //Only process the live of scheduled
        //campaign that start between tomorrow and the day after tomorrow
        let tomorrow = new Date().setHours(new Date().getHours() + 24);
        let aferTomorrow = new Date().setHours(new Date().getHours() + 48);
        const myFilter = { 
            status: { "or": ["DRAFT"] },
            nearDate: {
                from: tomorrow,
                to: aferTomorrow
            }
        };
        let campaigns = await campaignRepository.fetchAll(myFilter);

        for (const myCampaign of campaigns) {
            notificationService.create({
                "type": "Warning",
                "text": `The Campaign ${myCampaign.name} should start at ${myCampaign.from} but continues DRAFT `,
                "campaignId": myCampaign.id
            })
        }
        return {
            "result": "ok"
        };
    } catch (e) {
        throw (e);
    }
}

const launchCampaign = async (campaignId) => {
    try {
        let warning;
        let campaign = await campaignRepository.fetchCampaignWithOffers(campaignId);
        if (campaign.status && (campaign.status === 'PAUSED' || 
                campaign.status === 'DRAFT' )){
            let validationResult = processCampaign(campaign);
            if ( validationResult.status === 'LIVE' || validationResult.status === 'SCHEDULED'){
                //validate collisions
                let collisionsResponse = await findCollisions(campaign);
                if (collisionsResponse.collisions && collisionsResponse.collisions.length>0) {
                    if (((validationResult.status === 'LIVE') || (validationResult.status === 'SCHEDULED')) && collisionsResponse.collisionsLive){
                        throw ("Cannot lauch campaign: " + collisionsResponse.msg)
                    }else{

                        warning = collisionsResponse.msg
                    }
                }
                await campaignRepository.update(campaignId, {status: validationResult.status});
                return {"result": "ok", "warning": warning};
            } else if (validationResult.status === undefined) {
                throw ('Wrong information:' + validationResult.error);
            } else {
                throw('Dates or offers incorrect. '+ validationResult.error);
            }
        }else{
            throw('You are trying to publish an already published or closed campaign.');
        }
    }catch(e){
        throw (e); 
    }
}
const pauseCampaign = async (campaignId) => {
    try {
        let campaign = await campaignRepository.fetch(campaignId);
        if (campaign.status && (campaign.status === 'LIVE' || campaign.status === 'SCHEDULED')){
            await campaignRepository.update(campaign.id, {status: 'PAUSED'});
            return true;
        }else{
            throw('You are trying to pause a non live or scheduled campaign.');
        }
    }catch(e){
        throw (e); 
    }
}

const cloneCampaign = async (campaignId) => {
    try {
        let campaignToClone = await fetchCampaignWithOffers(campaignId);
           
        if (campaignToClone){
            let newCampaign={};
            newCampaign.name = "** COPIA ** "+campaignToClone.name;
            newCampaign.pageId = campaignToClone.pageId;
            newCampaign.positionId =  campaignToClone.positionId;
            try {
                let newCampaignData = await create(newCampaign);

                campaignToClone.offers.forEach(async function(element){
                    let newOffer = {
                        name: element.name,
                        defaultOffer: element.defaultOffer,
                        description: element.description,
                        image: element.image,

                        campaignId: newCampaignData.campaign.id,

                        offerUrl: element.offerUrl,
                        goal: element.goal,

                        brandName: element.brandName,

                        headline: element.headline,
                        subtitle: element.subtitle,

                        kickerUrl: element.kickerUrl,
                        kickerClass: element.kickerClass,
                        segmentationTags: offerService.getTagsByType('segmentation', element.tags),
                        documentationTags: offerService.getTagsByType('thematic', element.tags),
                        uuid: element.uuid,
                        author: element.author,
                        authorLink: element.authorLink,
                        footerUrl: element.footerUrl,
                        photoAuthor: element.photoAuthor,
                        copyright: element.copyright
                    }
                    try {
                        const offer = await offerService.create(newOffer);
                    }catch(e){
                        throw (e); 
                    }
                },newCampaignData);
                return {
                    "result": "ok"
                };
            }catch(e){
                throw (e); 
            }


        }else{
            throw('You are trying to clone a non existing campaign.');
        }
    }catch(e){
        throw (e); 
    }
}


module.exports = {
    fetch,
    fetchAll,
    fetchAllWithOffers,
    fetchCampaignWithOffers,
    fetchOffersByCampaign,
    create,
    remove,
    update,
    refreshCacheActiveCampaigns,
    refreshCampaigns,
    validateCampaign,
    launchCampaign,
    pauseCampaign,
    draftReview,
    cloneCampaign
}