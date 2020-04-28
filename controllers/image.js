
const imageService = require('../services/image');
const { validationResult } = require('express-validator');

const getSignedUrl = async (req, res, next) => {

    const errors = validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        //get the params
        const imageInfo = {
            filetype : req.query.filetype,
            uuid : req.query.uuid,
            height : req.query.height,
            width : req.query.width
        }

        const responseObj = await imageService.getSignedUrl(imageInfo);
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
    getSignedUrl
}

