const { body, param } = require('express-validator')
const checkPositionById = require('../validators/utils').checkPositionById



const create = () => {
    return [
        body('name').trim()
            .exists().withMessage('Field name missing')
            .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 chars long')
    ]
}

const update = () => {
    return [
        body('name').trim()
            .exists().withMessage('Field name missing')
            .isLength({ min: 5, max: 50 }).withMessage('Must be between 5 and 50 chars long'),
        param('id').trim()
            .exists().withMessage('Field id missing')
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integerr greater than 0").bail()
            .custom((positionId) => {
                return checkPositionById(positionId);
            })
    ]
}


const remove = () => {
    return [
        param('id').trim()
            .exists().withMessage('Field id missing')
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integerr greater than 0").bail()
            .custom((positionId) => {
                return checkPositionById(positionId);
            })
    ]
}


const fetch = () => {
    return [
        param('id').trim()
            .exists().withMessage('Field id missing')
            .isInt({ gt: 0, allow_leading_zeroes: false }).withMessage("Must be an integerr greater than 0").bail()
            .custom((positionId) => {
                return checkPositionById(positionId);
            })
    ]
}


module.exports = {
    create,
    update,
    remove,
    fetch
}