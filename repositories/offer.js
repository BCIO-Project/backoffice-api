const db = require('../models/');
const Offer = db.Offer;
const Tag = db.Tag;
const Campaign = db.Campaign;
const campaignRepository = require('./campaign');

const createWithCampaign = async (offerInfo, transaction) => {
    
    try {
        let offer = await Offer.create(offerInfo, {"transaction": transaction});
        offer.addCampaigns(offerInfo.campaignId, {"transaction": transaction});
        offer.setTags(offerInfo.tags, {"transaction": transaction});
        offer.save({"transaction": transaction});
        return offer;
    }catch(e){
        console.error(e);
        throw ('Could not create Offer with Campaign Id')
    } 
}


const remove = async (id, transaction) => { 
    let myOffer
    try {
        myOffer = await Offer.findByPk(id);
        return await myOffer.destroy({ "transaction": transaction });
    }catch(e){
        console.error(e)
        throw ('Could not remove Offer')
    }
    
}

const update = async (id, offerInfo, transaction) => {
    
    try {
        let myOffer = await Offer.findByPk(id);
        let updatedOffer = await myOffer.update(offerInfo, {"transaction": transaction});
        if (offerInfo.tags && offerInfo.tags.length > 0 ){
            myOffer.setTags(offerInfo.tags, {"transaction": transaction}); 
        }
        return updatedOffer
    } catch (error) {
        console.error(error);
        throw('Can not update the offer');
    }
}

const fetchOffersByCampaign = async (id) => {
    try{
        return new Promise(function(resolve, reject) {
             campaignRepository.fetchCampaignWithOffers(id).then(()=>{
                resolve(myData.offers);
            })
        });
        
    }catch(e){
        console.error(e);
        throw('Can not fetch Offers by Campaign');
    }
}

const fetch = async (id) => {
    
    try{
        return Offer.findByPk(id);
    }catch(e){
        console.error(e)
        throw('Could not fetch the Offer')
    }
    
}


const fetchOfferWithCampaignInfo = async (offerId) => {
    
    try{
        return Offer.findByPk(offerId, {
            include: [
                {model: Tag, as: "tags"},
                {model: Campaign, as: "campaigns"}
            ]
        });
    }catch(e){
        console.error(e)
        throw('Could not fetch the Offer')
    }
    
}



module.exports = {
    createWithCampaign,
    remove,
    update,
    fetchOffersByCampaign,
    fetch,
    fetchOfferWithCampaignInfo
}
