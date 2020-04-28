const validator = require('express-validator');
const tagService = require('../services/tag');


const fetchAllByType = async (req, res, next) => { 

    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try{

        const tags = await tagService.fetchAllByType(req.params.type);
        return res.json(tags);

    }catch(e){
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
    fetchAllByType
}