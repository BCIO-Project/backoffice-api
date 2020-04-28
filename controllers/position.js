const validator = require('express-validator');
const positionService = require('../services/position');


const fetch = async (req, res, next) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const position = await positionService.fetch(req.params.id);
        return res.json(position);
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

const fetchAll = async (req, res, next) => {

    const errors = validator.validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const positions = await positionService.fetchAll();
        return res.json(positions);
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

const create = async (req, res, next) => {

    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const positionInfo = {
        "name": req.body.name
    }

    try {
        const page = await positionService.create(positionInfo);
        return res.json(page);
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
const update = async (req, res, next) => {
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    const positionInfo = {
        "name": req.body.name
    }

    try {
        const position = await positionService.update(req.params.id, positionInfo);
        return res.json(position);
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
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const page = await positionService.remove(req.params.id);
        return res.json({
            id: page.id
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




module.exports = {
    fetch,
    fetchAll,
    create,
    remove,
    update
}