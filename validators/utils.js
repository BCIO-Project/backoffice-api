const pageService = require('../services/page')
const campaignService = require('../services/campaign')
const offerService = require('../services/offer')
const positionService = require('../services/position')
const notificationService = require('../services/notification')
const tagTypesConfig = require('../config/tagTypes.json')
const validator = require('validator');
const slug = require('slug');

const axios = require("axios");

const existPage = (name) => {
    return pageService.fetchBySlug(slug(name, { lower: true })).then((pages)=>{
        if (pages&&pages.length!==0)
            return Promise.reject('Page already exists')
    })
}

const checkStatus = (status) => {
    const statusAvailable = ['DRAFT', 'LIVE', 'SCHEDULED', 'PAUSED', 'CLOSED']
    if (status !== undefined){
        return statusAvailable.includes(status);
    }
}

const checkAction = (action) => {
    const actionsAvailable = ['launch', 'pause']
    if (action !== undefined){
        return actionsAvailable.includes(action);
    }
}

const checkPage = async (id) =>{
    return pageService.fetch(id).then((page) => {
        if (!page||page.length===0)
            return Promise.reject('Page do not exists')
    })
}

const checkPageById = async (id) =>{
    return pageService.fetch(id).then((page) => {
        if (!page ||!page.dataValues.id)
            return Promise.reject('Page do not exists')
    })
}

const checkPositionById = async (id) => {
    return positionService.fetch(id).then((position ) => {
        if (!position ||!position .dataValues.id)
            return Promise.reject('Position do not exists')
    })
}

const checkPositionsArray = async (positionsArray) => {
    
        for (const id of positionsArray) {
            let position = await positionService.fetch(id);
            if (!position || !position.id){
                throw(`Position ${id} do not exists`)
            }
        }
        return
}




const checkCampaign = async (id) => {
    return campaignService.fetch(id).then( campaign => {
        if (!campaign || (campaign && Object.entries(campaign).length === 0))
            return Promise.reject('Campaign do not exists')
    })
}

const checkNotification = async (id) => {
    return notificationService.fetch(id).then(notification => {
        if (!notification || (notification && Object.entries(notification).length === 0))
            return Promise.reject('Notification do not exists')
    })
}

checkNotification

const checkOffer = async (id) => {
    return offerService.fetch(id).then( offer => {
        if (!offer || (offer && Object.entries(offer).length === 0))
            return Promise.reject('Offer do not exists')
    })
}
const checkUrl = async (url) => {
    try {
        await axios.get(url);
    }catch(e){
        return Promise.reject('URL does not exists')
    }
}
const checkCampaignDates = (value, req) => {
    if(value&&req){
        let from = req.body.from;
        if (!value || !from)
            return false;
        const endDate = new Date(value);
        from = new Date(from);
        return endDate > from;
    }else{
        return true
    }
}

const checkTagsTypeExists = (type) => {

    for (let tagType in tagTypesConfig){
        if (tagTypesConfig[tagType] === type)
            return true;
    }

    return false;
}


const checkCampaignAndOffers = async (offers, req) => {

    let validationResult = true;
    let campaignId = req.params.id;
    let myCampaign = await campaignService.fetchCampaignWithOffers(campaignId);
    //IF the campaing is close dont accept the changes
    if (myCampaign.status === "CLOSED"){
        return Promise.reject("A closed Campaign can not be edited");
    }else if(myCampaign.status === "DRAFT" || myCampaign.status === "PAUSE") {
        //Basic validations for each offers
        let errors = [];
        for (let [index, myOffer] of offers.entries()) {
            errors = errors.concat(await validateOffer(myCampaign, myOffer,index))
        }
        if(errors.length>0){
            return Promise.reject(JSON.stringify(errors));
        }
    }else{
        //One default and complete
        let defaultCount = 0;
        for (const myOffer of offers) {
            if (offerService.isOfferReady(myOffer) && myOffer.defaultOffer) {
                defaultCount++;
            }
        }
        if (defaultCount < 1){
            return Promise.reject("One offer complete and default is required");
        }else if (defaultCount > 1) {
            return Promise.reject("Only one default offer is allowed");
        }
        //Basic validations for each offers
        let errors = [];
        for (let [index, myOffer] of offers.entries()) {
            errors = errors.concat(await validateOffer(myCampaign,myOffer, index))
        }
        if (errors.length > 0) {
            return Promise.reject(JSON.stringify(errors));
        }

    }

    return validationResult;
}

const validateOffer = async (campaign, offer, position) => {

    let errors = [];
    if (offer.id) {
        if (!Number.isInteger(offer.id)) {
            errors.push({
                "value": offer.id,
                "msg": "Wrong value type. It must be Integer",
                "param": `offers[${position}].id`,
                "location": "body"
            })
        }
    }

    if (offer.name && offer.name!=="" ) {
        if (typeof offer.name !== "string") {
            errors.push({
                "value": offer.name,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].name`,
                "location": "body"
            })
        }
        if (offer.name.length < 5 || offer.name.length > 50) {
            errors.push({
                "value": offer.name,
                "msg": "Must be between 5 and 50 chars long",
                "param": `offers[${position}].name`,
                "location": "body"
            })
        }
    }

    if (offer.defaultOffer) {
        if (typeof offer.defaultOffer !== "boolean") {
            errors.push({
                "value": offer.defaultOffer,
                "msg": "Wrong value type. It must be true or false",
                "param": `offers[${position}].defaultOffer`,
                "location": "body"
            })
        }
    }

    if (offer.description && offer.description !== "") {
        if (typeof offer.description !== "string") {
            errors.push({
                "value": offer.description,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].description`,
                "location": "body"
            })
        }
        if (offer.description.length < 10 || offer.description.length > 250) {
            errors.push({
                "value": offer.description,
                "msg": "Must be between 10 and 250 chars long",
                "param": `offers[${position}].description`,
                "location": "body"
            })
        }
    }
    if (offer.image && offer.image !== "") {
        try {
            //obtain all the positions for the page
            const mySizes = await pageService.fetchSizesByPage(campaign.pageId)
            //check all the images
            for (const mySize of mySizes) {
                //set height and width and check
                let position = offer.image.lastIndexOf(".");
                let newUrl = [offer.image.slice(0, position), `__${mySize.height}__${mySize.width}`, offer.image.slice(position)].join('');
                await axios.get(newUrl);
            }
            await axios.get(offer.image);
        } catch (e) {
            errors.push({
                "value": offer.image,
                "msg": "URL does not exists or sizes missing",
                "param": `offers[${position}].image`,
                "location": "body"
            })
        }
    }

    if (offer.offerUrl && offer.offerUrl !== "") {
        try {
            await axios.get(offer.offerUrl);
        } catch (e) {
            errors.push({
                "value": offer.offerUrl,
                "msg": "URL does not exists",
                "param": `offers[${position}].offerUrl`,
                "location": "body"
            })
        }
    }

    if (offer.goal && offer.goal !== "") {
        if (!Number.isInteger(offer.goal)) {
            errors.push({
                "value": offer.goal,
                "msg": "Wrong value type. It must be Integer",
                "param": `offers[${position}].goal`,
                "location": "body"
            });
            if (offer.goal < 1) {
                errors.push({
                    "value": offer.goal,
                    "msg": "Must be greater than 0",
                    "param": `offers[${position}].goal`,
                    "location": "body"
                });
            }
        }
    }

    if (offer.brandName && offer.brandName !== "") {
        if (typeof offer.brandName !== "string") {
            errors.push({
                "value": offer.brandName,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].brandName`,
                "location": "body"
            })
        }
        if (offer.brandName.length < 2 || offer.brandName.length > 100) {
            errors.push({
                "value": offer.brandName,
                "msg": "Must be between 2 and 100 chars long",
                "param": `offers[${position}].brandName`,
                "location": "body"
            })
        }
    }

    if (offer.headline && offer.headline !== "") {
        if (typeof offer.headline !== "string") {
            errors.push({
                "value": offer.headline,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].headline`,
                "location": "body"
            })
        }
        if (offer.headline.length < 10 || offer.headline.length > 250) {
            errors.push({
                "value": offer.headline,
                "msg": "Must be between 10 and 250 chars long",
                "param": `offers[${position}].headline`,
                "location": "body"
            })
        }
    }
    if (offer.subtitle && offer.subtitle !== "") {
        if (typeof offer.subtitle !== "string") {
            errors.push({
                "value": offer.subtitle,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].subtitle`,
                "location": "body"
            })
        }
        if (offer.subtitle.length < 10 || offer.subtitle.length > 250) {
            errors.push({
                "value": offer.subtitle,
                "msg": "Must be between 10 and 250 chars long",
                "param": `offers[${position}].subtitle`,
                "location": "body"
            })
        }
    }


    if (offer.kickerText && offer.kickerText !== "") {
        if (typeof offer.kickerText !== "string") {
            errors.push({
                "value": offer.kickerText,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].kickerText`,
                "location": "body"
            })
        }
        if (offer.kickerText.length < 2 || offer.kickerText.length > 250) {
            errors.push({
                "value": offer.kickerText,
                "msg": "Must be between 2 and 250 chars long",
                "param": `offers[${position}].kickerText`,
                "location": "body"
            })
        }
    }

    if (offer.kickerUrl && offer.kickerUrl !== "") {
        try {
            await axios.get(offer.kickerUrl);
        } catch (e) {
            errors.push({
                "value": offer.kickerUrl,
                "msg": "URL does not exists",
                "param": `offers[${position}].kickerUrl`,
                "location": "body"
            })
        }
    }

    if (offer.kickerClass && offer.kickerClass !== "") {
        if (typeof offer.kickerClass !== "string") {
            errors.push({
                "value": offer.kickerClass,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].kickerClass`,
                "location": "body"
            })
        }
        if (offer.kickerClass.length < 2 || offer.kickerClass.length > 250) {
            errors.push({
                "value": offer.kickerClass,
                "msg": "Must be between 2 and 250 chars long",
                "param": `offers[${position}].kickerClass`,
                "location": "body"
            })
        }
    }

    
    if (offer.author && offer.author !== "") {
        if (typeof offer.author !== "string") {
            errors.push({
                "value": offer.author,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].author`,
                "location": "body"
            })
        }
        if (offer.author.length < 2 || offer.author.length > 250) {
            errors.push({
                "value": offer.author,
                "msg": "Must be between 2 and 250 chars long",
                "param": `offers[${position}].author`,
                "location": "body"
            })
        }
    }

    
    if (offer.authorLink && offer.authorLink !== "") {
        try {
            await axios.get(offer.authorLink);
        } catch (e) {
            errors.push({
                "value": offer.authorLink,
                "msg": "URL does not exists",
                "param": `offers[${position}].authorLink`,
                "location": "body"
            })
        }
    }
    
    if (offer.footerUrl && offer.footerUrl !== "") {
        if (typeof offer.footerUrl !== "string") {
            errors.push({
                "value": offer.footerUrl,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].footerUrl`,
                "location": "body"
            })
        }
        if (offer.footerUrl.length < 2 || offer.footerUrl.length > 50) {
            errors.push({
                "value": offer.footerUrl,
                "msg": "Must be between 2 and 50 chars long",
                "param": `offers[${position}].footerUrl`,
                "location": "body"
            })
        }
    }
    
    if (offer.photoAuthor && offer.photoAuthor !== "") {
        if (typeof offer.photoAuthor !== "string") {
            errors.push({
                "value": offer.photoAuthor,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].photoAuthor`,
                "location": "body"
            })
        }
        if (offer.photoAuthor.length < 2 || offer.photoAuthor.length > 50) {
            errors.push({
                "value": offer.photoAuthor,
                "msg": "Must be between 2 and 50 chars long",
                "param": `offers[${position}].photoAuthor`,
                "location": "body"
            })
        }
    }
    
    if (offer.copyright && offer.copyright !== "") {
        if (typeof offer.copyright !== "string") {
            errors.push({
                "value": offer.copyright,
                "msg": "Wrong value type. It must be String",
                "param": `offers[${position}].copyright`,
                "location": "body"
            })
        }
        if (offer.copyright.length < 2 || offer.copyright.length > 10) {
            errors.push({
                "value": offer.copyright,
                "msg": "Must be between 2 and 10 chars long",
                "param": `offers[${position}].copyright`,
                "location": "body"
            })
        }
    }


    return errors

}

module.exports = {
    checkPage,
    existPage,
    checkStatus,
    checkAction,
    checkPageById,
    checkCampaign,
    checkOffer,
    checkUrl,
    checkCampaignDates,
    checkTagsTypeExists,
    checkPositionById, 
    checkCampaignAndOffers,
    validateOffer,
    checkPositionsArray,
    checkNotification
}