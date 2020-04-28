const db = require('../models/');
const Notification = db.Notification;
const Campaign = db.Campaign;
const Page = db.Page;
const Position = db.Position;

const fetch = async (id) => {

    try {
        return Notification.findByPk(id, {});
    } catch (e) {
        console.error(e)
        throw ('Could not fetch the Notification')
    }
}

const create = async (notificationInfo) => {

    try {
        return await Notification.create(notificationInfo);
    } catch (e) {
        console.error(e);
        throw ('Could not create the notification')
    }
}

const remove = async (id) => {
    let myNotification
    try {
        myNotification = await Notification.findByPk(id);
        return await myNotification.destroy();
    } catch (e) {
        console.error(e)
        throw ('Could not remove the notification')
    }

}

const fetchAllByUser = async (userId) => {
    try {
        //only show newest 30 notifications
        const limitNotifications = 30;
        let responseObj = {};
        responseObj.notifications = await Notification.findAll({
            where: {
                userId: userId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            limit: limitNotifications,
            include: [
                { model: Campaign,
                where: { deletedAt: null },
                include: [
                    { model: Page, as: "page", attributes: ['name'] },
                    { model: Position, as: "position", attributes: ['name'] }
                        ],
                attributes: ['name']
                }
            ]
        });
        responseObj.totalUnread = await Notification.count({
            where: {
                userId: userId,
                read: false
            }
        });
        return responseObj
    } catch (e) {
        console.error(e)
        throw ('Can not fetch Notifications');
    }
}

const fetchAllByCampaign = async (campaignId) => {
    try {
        let responseObj = {};
        responseObj.notifications = await Notification.findAll({
            where: {
                campaignId: campaignId
            },
            order: [
                ['createdAt', 'DESC']
            ],
            include: [
                { model: Campaign
                }
            ]
        });

        return responseObj
    } catch (e) {
        console.error(e)
        throw ('Can not fetch Notifications Campaign');
    }
}

const update = async (id, notificationInfo) => {
    let myNotification;
    //get the object
    try {
        myNotification = await Notification.findByPk(id);
        //update values
        return myNotification.update(notificationInfo);
    } catch (error) {
        console.error(error);
        throw ('Can not update the Notification');
    }

}
module.exports = {
    fetch,
    fetchAllByUser,
    fetchAllByCampaign,
    create,
    remove,
    update
}
