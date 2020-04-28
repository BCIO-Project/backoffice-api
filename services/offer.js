const offerRepository = require('../repositories/offer');
const isActiveCampaign = require('../services/campaignUtils').isActiveCampaign;

const isOfferReady = (offer) => {
    //if the offer has the minimal information will be live
    if(offer.name && (offer.name !== "") && offer.image && (offer.image !== "") &&
        offer.goal && offer.offerUrl && (offer.offerUrl !== "") &&
        offer.headline && (offer.headline !== "")  &&
        offer.documentationTags.length > 0 && offer.segmentationTags.length > 0 ){
            return true
        }
    return false
}

   
const create = async (offerInfo, transaction) => {
    
    offerInfo.status = isOfferReady(offerInfo) ? "LIVE" : "DRAFT";
    offerInfo.createdAt = new Date();
    offerInfo.clicks = 0;
    offerInfo.impressions = 0;
    offerInfo.campaignId = parseInt(offerInfo.campaignId)
    let segmentationTags = offerInfo.segmentationTags || []
    let documentationTags = offerInfo.documentationTags || []
    offerInfo.tags = segmentationTags.concat(documentationTags);
    delete offerInfo.id;
    delete offerInfo.segmentationTags;
    delete offerInfo.documentationTags;

    if(offerInfo.goal === ""){
        delete offerInfo.goal
    }
    try {
        //t

        let newOffer = await offerRepository.createWithCampaign(offerInfo, transaction);
        //end t
        return newOffer
    } catch (e) {
        console.log(e)
        throw (e);
    }
}
    
    
    

const fetch = async (id) => {

    try {
        return await offerRepository.fetch(id);
    }catch(e){
        throw (e);
    }
    
}

const update = async (id, rawOfferInfo, transaction) => {
    //TODO: añadir validaciones de tags
    try {
        //In order to manage propperly it status. We assume that all fields
        // are passed on each call. Not only differences

        const offerStored = await offerRepository.fetch(id);

        let offerInfo = {};
        offerInfo.description= rawOfferInfo.description;
        offerInfo.name= rawOfferInfo.name;
        offerInfo.brandName= rawOfferInfo.brandName;
        offerInfo.image= rawOfferInfo.image;
        offerInfo.headline= rawOfferInfo.headline;
        offerInfo.subtitle= rawOfferInfo.subtitle;
        offerInfo.offerUrl= rawOfferInfo.offerUrl;
        offerInfo.kickerUrl= rawOfferInfo.kickerUrl;
        offerInfo.kickerText= rawOfferInfo.kickerText;
        offerInfo.kickerClass= rawOfferInfo.kickerClass;
        offerInfo.uuid = rawOfferInfo.uuid;
        offerInfo.author = rawOfferInfo.author;
        offerInfo.authorLink = rawOfferInfo.authorLink;
        offerInfo.footerUrl = rawOfferInfo.footerUrl;
        offerInfo.photoAuthor = rawOfferInfo.photoAuthor;
        offerInfo.copyright = rawOfferInfo.copyright;
        offerInfo.segmentationTags = rawOfferInfo.segmentationTags || []
        offerInfo.documentationTags = rawOfferInfo.documentationTags || []
        if (rawOfferInfo.goal !== "") {
            offerInfo.goal = rawOfferInfo.goal
        }
        offerInfo.tags = offerInfo.segmentationTags.concat(offerInfo.documentationTags);
        offerInfo.defaultOffer= rawOfferInfo.defaultOffer;

        if (offerStored && offerStored.status && offerStored.status !== 'PAUSED')
            offerInfo.status = isOfferReady(offerInfo)  ? "LIVE" : "DRAFT";

        offerInfo.updatedAt = new Date();
        delete offerInfo.segmentationTags;
        delete offerInfo.documentationTags;
        const offerUpdated = await offerRepository.update(id, offerInfo, transaction);
        return offerUpdated;
    } catch (e) {
        throw (e);
    }
}

const updateEvent = async (id, eventInfo, transaction) => {
    try {
        eventInfo.updatedAt = new Date();
        const offerUpdated = await offerRepository.update(id, eventInfo, transaction);
        return offerUpdated;

    } catch (e) {
        throw (e);
    }
}

const remove = async (id, transaction) => {

    try {
        const offerRemoved = await offerRepository.remove(id, transaction);
        return offerRemoved;

    } catch (e) {
        throw (e);
    }
}

const getTagsByType = (tagType, tags) => {
    let cleanTags = tags.filter( (tag) => {
        return tag.type === tagType;
    } ).map( (tag) => { return tag.id });
    return cleanTags
}

const launchOffer = async(offerId) => {
    try {
        let offer = await offerRepository.fetchOfferWithCampaignInfo(offerId);
        offer.segmentationTags = getTagsByType('segmentation', offer.tags);
        offer.documentationTags = getTagsByType('thematic', offer.tags);
        const campaign = (Array.isArray(offer.campaigns) && offer.campaigns[0]) ? offer.campaigns[0] : null;
        if (campaign){
            if (isOfferReady(offer))
                await offerRepository.update(offer.id, {status: 'LIVE'});
            else
                throw('Offer information is not complete');
        }else
            throw('This offer does not belong to any campaign');
        return true;
    }catch(e){
        throw (e); 
    }

}

const pauseOffer = async(offerId) => {
    try {
        let offer = await offerRepository.fetchOfferWithCampaignInfo(offerId);
        const campaign = (Array.isArray(offer.campaigns) && offer.campaigns[0]) ? offer.campaigns[0] : null;
        if (campaign){
            if (isActiveCampaign(campaign))
                if (!offer.defaultOffer)
                    await offerRepository.update(offer.id, {status: 'PAUSED'});
                else
                    throw('Default offer cannot be PAUSED if the cmapaign is LIVE');
            else
                await offerRepository.update(offer.id, {status: 'PAUSED'});
        }else
            throw('This offer does not belong to any campaign');
        
        return true;
    }catch(e){
        throw (e); 
    }
} 

module.exports = {
    create,
    update,
    remove,
    fetch,
    updateEvent,
    isOfferReady,
    launchOffer,
    pauseOffer,
    getTagsByType
}
