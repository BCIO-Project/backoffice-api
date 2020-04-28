
const notificationService = require('../services/notification');
const { validationResult } = require('express-validator');

const create = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const data = {
        type: req.body.type,
        campaignId: parseInt(req.body.campaignId),
        text: req.body.text
    }
    try {
        const notificationCreateResult = await notificationService.create(data);
        return res.json(notificationCreateResult);
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

const remove = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        const myNotification = await notificationService.remove(req.params.id);
        return res.json({
            id: myNotification.id
        });
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

const readUnread = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    try {
        let status = false;
        if (req.params.action === 'read') {
            status = await notificationService.readNotification(req.params.id)
            return res.json(status);
        } else if (req.params.action === 'unread') {
            status = await notificationService.unreadNotification(req.params.id);
            return res.json(status);
        } else
            throw ('Wrong action')
    } catch (e) {
        console.error(e);
        return res.status(422).json({
            errors: [{
                msg: e
            }]
        });
    }
}

const fetchAll = async (req, res, next) => {

    try {
        //get the user for the request
        const userId = req.userId;
        const responseObj = await notificationService.fetchAllByUser(userId);
        return res.json(responseObj);
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

const fetchAllByCampaign = async (req, res, next) => {

    try {
        const responseObj = await notificationService.fetchAllByCampaign(req.params.id);
        return res.json(responseObj);
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

module.exports = {
    fetchAll,
    fetchAllByCampaign,
    readUnread,
    create,
    remove
}

