const { body, param } = require('express-validator')
const checkPage = require('../validators/utils').checkPage
const existPage = require('../validators/utils').existPage
const checkPositionsArray = require('../validators/utils').checkPositionsArray


const create = () => {
    return [ 
        body('name').trim()
        .exists().withMessage('Field name missing')
            .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 chars long').bail()
        .custom((pageName)=>{
            return existPage(pageName);
        })
    ]
}
        

const remove = () => {
    return [ 
        param('id').trim()
        .exists().withMessage('Field id missing')
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integer greater than 0").bail()
        .custom((pageName)=>{
            return checkPage(pageName);
        })
    ]
}


const fetch = () => {
    return [ 
        param('id').trim()
        .exists().withMessage('Field id missing')
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integer greater than 0").bail()
        .custom((pageName)=>{
            return checkPage(pageName);
        })
    ]
}


const updatePositionsByPage = () => {
    return [
        param('id').trim()
            .exists().withMessage('Field id missing')
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integer greater than 0").trim()
            .custom((pageName) => {
                return checkPage(pageName);
            }),
        body('positions')
            .exists().withMessage('Field positions missing')
            .exists().isArray().withMessage('Array of Positions ids should be provided')
            .custom((positionsArray) => {
                return checkPositionsArray(positionsArray);
            })
        
    ]
}

module.exports = {
    create,
    remove,
    fetch,
    updatePositionsByPage
}