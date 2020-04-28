const { query  } = require('express-validator')

const getSignedUrl = () => {
    return [
        query('filetype')
            .exists().withMessage('Param filetype missing'),
        query('uuid')
            .exists().withMessage('Param uuid missing'),
        query('height')
            .optional(),
        query('width')
            .optional()

    ]
}


module.exports = {
    getSignedUrl
}