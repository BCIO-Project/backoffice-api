const notificationRepository = require('../repositories/notification');
const userService = require('../services/user');

const fetch = async (id) => {
    try {
        return await notificationRepository.fetch(id);
    } catch (e) {
        throw (e);
    }
}

const create = async (notificationInfo) => {

    notificationInfo.createdAt = new Date();
    notificationInfo.read = false;

    try {
        //get all users
        const myUsers = await userService.fetchAll();
        for (const user of myUsers) {
            notificationInfo.userId = user.id
            await notificationRepository.create(notificationInfo);
        }
        return {result: "ok"}

    } catch (e) {
        throw (e);
    }
}

const remove = async (id) => {
    try {
        return await notificationRepository.remove(id);
    } catch (e) {
        throw (e);
    }
}


const fetchAllByUser = async (userId) => {
    try {
        let notifications = await notificationRepository.fetchAllByUser(userId);
        return notifications;
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const fetchAllByCampaign = async (campaignId) => {
    try {
        let notifications = await notificationRepository.fetchAllByCampaign(campaignId);
        return notifications;
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const readNotification = async (notificationId) => {
    try {
        let notification = await notificationRepository.fetch(notificationId);
        if (!notification.read) {
            await notificationRepository.update(notification.id, { read: true });
            return true;
        } else {
            throw ('You are trying to read an already readed notification.');
        }
    } catch (e) {
        throw (e);
    }
}

const unreadNotification = async (notificationId) => {
    try {
        let notification = await notificationRepository.fetch(notificationId);
        if (notification.read) {
            await notificationRepository.update(notification.id, { read: false });
            return true;
        } else {
            throw ('You are trying to mark unread an already unreaded notification.');
        }
    } catch (e) {
        throw (e);
    }
}

module.exports = {
    fetch,
    fetchAllByUser,
    fetchAllByCampaign,
    create,
    remove,
    readNotification,
    unreadNotification
}
