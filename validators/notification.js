const { check, param, body, query } = require('express-validator')

const checkCampaign = require('../validators/utils').checkCampaign
const checkNotification = require('../validators/utils').checkNotification

const create = () => {
    return [
        body('type').trim()
            .exists().withMessage('Field name is missing').bail()
            .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 30 chars long'),

        body('campaignId')
            .exists().withMessage('Field campaignId missing').bail()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integer greater than 0").bail()
            .custom((id) => {
                return checkCampaign(id);
            }),

        body('text')
            .exists().withMessage('Field text is missing')
    ]
}

const fetch = () => {
    return [
        param('id').trim()
            .exists().withMessage('Field id missing').bail()
            .custom((id) => {
                return checkNotification(id);
            })
    ]
}



module.exports = {
    create,
    fetch
}