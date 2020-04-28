const { check, param, body, query } = require('express-validator')

const checkCampaign = require('../validators/utils').checkCampaign
const checkPageById = require('../validators/utils').checkPageById
const checkPositionById = require('../validators/utils').checkPositionById
const checkCampaignDates = require('../validators/utils').checkCampaignDates
const checkCampaignAndOffers = require('../validators/utils').checkCampaignAndOffers
const checkStatus = require('../validators/utils').checkStatus

const fetch = () => {
    return [ 
        check('id').trim()
        .exists().withMessage('Field id missing')
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage("Must be an integer greater than 0")
    ]
}

const fetchAll = () => {
    return [ 
        query('page').trim()
        .optional()
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage("Must be an integer greater than 0"),

        query('status.*').trim()
        .optional()
        .custom((status) => {
            return checkStatus(status);
        }).withMessage("Invalid status")
    ]
}

const create = () => {
    return [ 
        body('name').trim()
        .exists().withMessage('Field name is missing').bail()
        .isLength({min: 5, max: 50}).withMessage('Must be between 5 and 30 chars long'),

        body('pageId')
        .exists().withMessage('Field pageId missing').bail()
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage("Must be an integer greater than 0").bail()
        .custom((id)=>{
            return checkPageById(id);
        }),

        body('positionId')
            .exists().withMessage('Field positionId missing').bail()
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integer greater than 0").bail()
            .custom((id) => {
                return checkPositionById(id);
            }),
        
        body('from').trim()
        .optional()
        .isISO8601().withMessage('Date format is incorrect'),
        
        body('to').trim()
        .optional()
        .isISO8601().withMessage('Date format is incorrect').bail()
        .custom((value, { req }) => {
            return checkCampaignDates(value, req);
        }).withMessage('end date (to) have to be after start date (from)')
    ]
}


//TODO: Include FetchAll validator when we use filters
const remove = () => {
    return [ 
        param('id').trim()
        .exists().withMessage('Field id missing').bail()
        .custom((id)=>{
            return checkCampaign(id);
        })
    ]
}

const update = () => {
    return [ 


        param('id').trim()
        .exists().bail()
        .isInt().withMessage('Wrong value type. It must be Integer'),

        check('name').trim()
        .optional()
        .isLength({min: 5, max: 50}).withMessage('Must be between 5 and 50 chars long'),

        check('from').trim()
        .optional({
            nullable: true
        })
        .isISO8601().withMessage('Date format is incorrect'),
        
        check('to').trim()
        .optional({
            nullable: true
        })
        .isISO8601().withMessage('Date format is incorrect').bail()
        .custom((value, { req }) => {
            return checkCampaignDates(value, req);
        }).withMessage('EndDate have to be after startDate'),

        body('offers')
        .exists().isArray().withMessage('Array of Offers should be provided')
        .bail()
        .custom((value, { req }) => {
            return checkCampaignAndOffers(value, req);
        })

    ]
}

module.exports = {
    fetch, 
    fetchAll,
    create,
    remove,
    update
}