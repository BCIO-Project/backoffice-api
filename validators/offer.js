const { check, param, body } = require('express-validator')


const checkCampaign = require('../validators/utils').checkCampaign
const checkUrl = require('../validators/utils').checkUrl
const checkOffer = require('../validators/utils').checkOffer
const checkAction = require('../validators/utils').checkAction


const create = () => {
    return [ 
        body('name').trim()
        .exists().withMessage('Field name missing')
        .isLength({min: 5, max: 150}).withMessage('Must be between 5 and 150 chars long'),

        body('campaignId').trim()
        .exists().withMessage('Field campaign is missing')

        .custom((id)=>{
            return checkCampaign(id)
        }),

        body('defaultOffer').trim()
        .optional()
        .isBoolean().withMessage('Wrong value type. It must be Boolean'),
        
        body('description').trim()
        .optional()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),
        
        body('image').trim()
        .optional()
        .isURL().withMessage('Wrong value type. It must be and URL')
        .custom((url) =>{
            return checkUrl(url)
        }),
        body('author').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),
        
        body('authorLink').trim()
            .optional()
            .isURL().withMessage('Wrong value type. It must be and URL')
            .custom((url) => {
                return checkUrl(url)
            }),
        body('footerUrl').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),

        body('photoAuthor').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),

        body('copyright').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),

        body('offerUrl').trim()
        .optional()
        .isURL().withMessage('Wrong value type. It must be an URL')
        .custom((url) =>{
            return checkUrl(url)
        }),

        body('goal').trim()
        .optional()
        .isInt({gt: 1, allow_leading_zeroes: false}).withMessage('Wrong value type. It must be an integer greater than 0'),

        body('brandName').trim()
        .optional()
        .isLength({min: 2, max: 100}).withMessage('Must be between 2 and 100 chars long'),
        
        body('headline').trim()
        .optional()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),

        body('subtitle').trim()
        .optional()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),


        body('kickerText').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 2 and 250 chars long'),


        body('kickerUrl').trim()
        .optional()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long')
        .custom((url) =>{
            return checkUrl(url)
        }),
        
        body('kickerClass').trim()
            .optional()
            .isLength({ min: 2, max: 50 }).withMessage('Must be between 10 and 250 chars long'),

        body('segmentationTags').trim()
        .optional()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),

        body('documentationTags')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),




    ]
}
   

const update = () => {
    return [ 
        param('id')
        .exists().trim()
        .isInt().withMessage('Wrong value type. It must be Integer'),

        check('name')
        .optional().trim()
        .isLength({min: 5, max: 50}).withMessage('Must be between 5 and 50 chars long'),

        check('defaultOffer')
        .optional()
        .isBoolean().withMessage('Wrong value type. It must be Boolean'),
        
        check('description')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),
        
        check('image')
        .optional().trim()
        .isURL().withMessage('Wrong value type. It must be and URL')
        .custom((url) =>{
            return checkUrl(url)
        }),
        check('offerUrl')
        .optional().trim()
        .isURL().withMessage('Wrong value type. It must be an URL')
        .custom((url) =>{
            return checkUrl(url)
        }),
        check('goal')
        .optional()
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage('Wrong value type. It must be an integer greater than 0'),
        check('brandName')
        .optional().trim()
        .isLength({min: 2, max: 100}).withMessage('Must be between 2 and 100 chars long'),
        
        check('headline')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),

        check('subtitle')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),
        
        check('campaign')
        .optional().trim()
        .custom((id)=>{
            return checkCampaign(id);
        }),
        
        check('brandName')
        .optional().trim()
        .isLength({min: 2, max: 100}).withMessage('Must be between 2 and 100 chars long'),
        
        check('kickerUrl')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long')
        .custom((url) =>{
            return checkUrl(url)
        }),
        check('kickerText').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 2 and 250 chars long'),

        check('kickerImg')
        .optional().trim()
        .isURL().withMessage('Wrong value type. It must be an URL'),
        
        check('kickerClass').trim()
            .optional()
            .isLength({ min: 2, max: 50 }).withMessage('Must be between 10 and 250 chars long'),

        check('segmentationTags')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),

        check('documentationTags')
        .optional().trim()
        .isLength({min: 10, max: 250}).withMessage('Must be between 10 and 250 chars long'),

        check('author').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),

        check('authorLink').trim()
            .optional()
            .isURL().withMessage('Wrong value type. It must be and URL')
            .custom((url) => {
                return checkUrl(url)
            }),
        check('footerUrl').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),

        check('photoAuthor').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),

        check('copyright').trim()
            .optional()
            .isLength({ min: 2, max: 250 }).withMessage('Must be between 10 and 250 chars long'),
    ]
}
   

const remove = () => {
    return [ 
        param('id')
        .exists().withMessage('Field id missing').trim()
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage('Must be a number greater than 0')
        .custom((id)=>{
            return checkOffer(id);
        })
    ]
}


const fetch = () => {
    return [ 
        param('id')
        .exists().withMessage('Field id missing').trim()
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage('Must be a number greater than 0').bail()
        .custom((id)=>{
            return checkOffer(id);
        })
    ]
}

const action = () => {
    return [ 
        param('id')
        .exists().withMessage('Field id missing').trim().bail()
        .isInt({gt: 0, allow_leading_zeroes: false}).withMessage('Must be a number greater than 0')
        .custom((id)=>{
            return checkOffer(id);
        }),

        param('action')
        .exists().withMessage('Field action is missing').trim().bail()
        .custom((action)=>{
            return checkAction(action);
        }),
    ]
}

module.exports = {
    create,
    update,
    remove,
    fetch,
    action
}