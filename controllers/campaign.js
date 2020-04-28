const { validationResult } = require('express-validator');
const campaignService = require('../services/campaign');


const fetch = async (req, res, next) => { 
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const campaign = await campaignService.fetch(req.params.id);
        const response = (campaign) ? campaign : {};
        return res.json(response);
    }catch(e){
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const fetchAll = async (req, res, next) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        
        let filters = {}
        if (req.query.page)
            filters.page = req.query.page;
        if (req.query.status)
            filters.status =  {"or": req.query.status};

        const campaigns = await campaignService.fetchAll(filters);
        return res.json(campaigns);
    }catch(e){
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const fetchAllWithOffers = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {

        let filters = {}
        if (req.query.page)
            filters.page = req.query.page;
        if (req.query.status)
            filters.status = { "or": req.query.status };

        const campaigns = await campaignService.fetchAllWithOffers(filters);
        return res.json(campaigns);
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}




const fetchCampaignWithOffers = async (req, res, next) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const campaigns = await campaignService.fetchCampaignWithOffers(req.params.id);
        return res.json(campaigns);
    }catch(e){
        console.log(e)
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}


const fetchOffersByCampaign = async (req, res, next) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {

        const offers = await campaignService.fetchOffersByCampaign(req.params.id);
        return res.json(offers);
    }catch(e){
        console.log(e)
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const create = async (req, res, next) => { 
    
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const data = {
        name: req.body.name,
        pageId: req.body.pageId,
        positionId: req.body.positionId,
        from: req.body.from,
        to: req.body.to
    }

    try{
        
        const campaignCreateResult = await campaignService.create(data);
        return res.json(campaignCreateResult);

    }catch(e){
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const remove = async (req, res, next) => { 
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try{
        const myCampaign = await campaignService.remove(req.params.id);
        return res.json({
            id: myCampaign.id 
        });
    }catch(e){
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const update = async (req, res, next) => { 

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        //if there is errors in offers param need to get and concat
        let myErrors = errors.array()
        myErrors.forEach((error, index) => {
            if (error.param === "offers" && error.msg[0] === '[') {
                let offersErrors = JSON.parse(error.msg)
                myErrors = myErrors.concat(offersErrors);
                myErrors.splice(index, 1);
            }
        });
        return res.status(422).json({
            errors: myErrors
        });
    }else{
        const data = {
            name: req.body.name,
            from: req.body.from,
            to: req.body.to,
            offers: req.body.offers
        }
        
        try {
            const campaign = await campaignService.update(req.params.id, data);
            return res.json(campaign);
        } catch (e) {
            console.error(e);
            return res.status(422).json({
                errors: [{
                    msg: e
                }]
            });
        }
    }
}

const refreshCacheActiveCampaigns = async (req, res, next) => {

    try {
        return res.json(await campaignService.refreshCacheActiveCampaigns());
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const refreshCampaigns = async (req, res, next) => {

    try {
        return res.json(await campaignService.refreshCampaigns());
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [{
                msg: e
            }]
        });
    }
}

const launchPauseClone = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        let status = false;
        if (req.params.action === 'launch'){
            status = await campaignService.launchCampaign(req.params.id)
            return res.json(status);
        } else if (req.params.action === 'pause'){
            status = await campaignService.pauseCampaign(req.params.id);
            return res.json(status);
        } else if (req.params.action === 'clone'){
            status = await campaignService.cloneCampaign(req.params.id);
            return res.json(status);
        } else
            throw('Wrong action')
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [{
                msg: e
            }]
        });
 
    }
}

const draftReview = async (req, res, next) => {

    try {
        return res.json(await campaignService.draftReview());
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [{
                msg: e
            }]
        });
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
    launchPauseClone,
    draftReview
}