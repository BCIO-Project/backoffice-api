const db = require('../models');
const Sequelize = require('sequelize');
const Campaign = db.Campaign;
const Offer = db.Offer;
const Page = db.Page;
const Position = db.Position;
const Size = db.Size;
const Tag = db.Tag;
const op = Sequelize.Op;




const create = async (campaignInfo, transaction) => {

    try {
        return await Campaign.create(campaignInfo, { "transaction": transaction });
    }catch(e){
        console.error(e);
        throw ('Could not create Campaign')
    } 
}

const remove = async (id) => { 
    let myCampaign
    try {
        myCampaign = await Campaign.findByPk(id);
        return await myCampaign.destroy();
    }catch(e){
        console.error(e)
        throw ('Could not remove Campaign')
    }

}


const fetch = async (id) => {

    try{
        return Campaign.findByPk(id, {
            attributes: { exclude: ['pageId', 'positionId'] },
            include: [
                { model: Position, as: "position", attributes: { exclude: ['pageId'] }},
                { model: Page, as: "page", include: [{ model: Size, as: "sizes", attributes: { exclude: ['pageId']} }]}
                
            ]
          });
    }catch(e){
        console.error(e)
        throw('Could not fetch the Campaign')
    }
}

const fetchCampaignWithOffers = async (id) => {

    try{
        const filter = { include: [{ model: Offer, as: "offers", include: [{ model: Tag, as: "tags" }] }]};
        const myCampaign = await Campaign.findByPk(id, filter );
        //sorting the offers by their id number before return
        myCampaign.offers.sort(function (a, b) { return a.id - b.id });
        return myCampaign
    }catch(e){
        console.error(e)
        throw('Could not fetch the Campaign')
    }
    
}

const cleanCampaign = (campaign) => {
    delete campaign.pageId;
    delete campaign.positionId;
    return campaign;
}

const fetchAll = async (filters) => {
    const pageSize = 15;
    try{

        //WHERE filters
        let where = [];
        if(filters&&filters.status){
            if(filters.status.or){
                where.push({status:{[op.or]: filters.status.or}});
            }
        }

        if (filters.positionId) {

            where.push({ "positionId": filters.positionId });
            
        }

        if (filters&&filters.nearDate) {

            let whereObj = {
                [op.and]: [
                    {
                        from: {
                            [op.gt]: filters.nearDate.from,
                        }
                    },
                    {
                        from: {
                            [op.lt]: filters.nearDate.to,
                        }
                    }
                ]
            };
            where.push(whereObj);

        }


        if (filters&&filters.dates) {
            let whereObj = {
                [op.or]: [
                {
                    from: {
                        [op.lt]: filters.dates.from,
                    },
                    to: {
                        [op.gt]: filters.dates.from,
                    }
                }, 
                {
                    from: {
                        [op.lt]: filters.dates.to,
                    },
                    to: {
                        [op.gt]: filters.dates.to,
                    }
                }, 
                {
                    from: {
                        [op.gt]: filters.dates.from,
                    },
                    to: {
                        [op.lt]: filters.dates.to,
                    }
                }
            ]
            };
            where.push(whereObj);
        }

        //PAGE/LIMIT filters
        let offset = 0;
        if (filters&&filters.page && filters.page>0){
            offset = (filters.page-1) * pageSize;
        }

        let campaigns = await Campaign.findAll({
            attributes: { 
                exclude: ['pageId', 'positionId'] 
            },
            include: [
                { model: Page, as: "page" },
                { model: Position, as: "position" }
            ],
            order: [
                ['createdAt', 'DESC']
            ],
            where: where,
            offset: 0 + offset,
            limit: pageSize,
        });
        return campaigns;
    }catch(e){
        console.error(e)
        throw('Can not fetch Campaigns');
    }
}

const fetchAllWithOffers = async (filters) => {
    try {
        let where = [];
        if (filters && filters.status) {
            if (filters.status.or) {
                where.push({ status: { [op.or]: filters.status.or } });
            }
        }

        let campaigns = await Campaign.findAll({
            attributes: {
                exclude: ['positionId']
            },
            include: [
                { model: Position, as: "position" },
                { model: Offer, as: "offers", include: [{ model: Tag, as: "tags"}] }
            ],
            where: where,
            order: [
                ['pageId', 'ASC'],
            ]
        });
        return campaigns;
    } catch (e) {
        console.error(e)
        throw ('Can not fetch Campaigns');
    }
}

const update = async (id, campaignInfo, transaction) => {
    let myCampaign;
    //get the object
    try {
        myCampaign = await Campaign.findByPk(id);
        
            //update values
        return myCampaign.update(campaignInfo, { "transaction": transaction });
    } catch (error) {
        console.error(error);
        throw('Can not update the campaign');
    }

}



module.exports = {
    create,
    remove,
    fetch,
    fetchCampaignWithOffers,
    fetchAll,
    fetchAllWithOffers,
    update
}