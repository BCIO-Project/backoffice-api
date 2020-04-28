const { param, check } = require('express-validator')
const checkTagsTypeExists = require('../validators/utils').checkTagsTypeExists


const fetchAllByType = () => {
    return [ 
        param('type').trim()
        .exists().withMessage('Field tag type missing')
        .isLength({min: 5, max: 50}).withMessage('Must be between 5 and 50 chars long')
        .custom( (type) => {
            return checkTagsTypeExists(type)
        }).withMessage('Tag type is not valid')
    ]
}
        

module.exports = {
    fetchAllByType
}