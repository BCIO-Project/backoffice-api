const validator = require('express-validator');
const pageService = require('../services/page');
const positionService = require('../services/position');


const fetch = async (req, res, next) => { 
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try{
        const page = await pageService.fetch(req.params.id);
        return res.json(page);
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

const fetchAll = async (req, res, next) => { 
    
    const errors = validator.validationResult(req)
    
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try{
        const pages = await pageService.fetchAll();
        return res.json(pages);
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

const create = async (req, res, next) => { 
    
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    const pageInfo = {
        "name" : req.body.name
    }

    try{
        const page = await pageService.create(pageInfo);
        return res.json(page);
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

const remove = async (req, res, next) => { 
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }
    
    try{
        const page = await pageService.removeById(req.params.id);
        return res.json({
            id: page.id 
        });
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


const fetchPositionsByPage = async (req, res, next) => {

    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }

    try {
        const positions = await positionService.fetchPositionsByPage(req.params.id);
        return res.json(positions);
    } catch (e) {
        console.log(e)
        return res.status(422).json({
            errors: [
                {
                    msg: e
                }
            ]
        });
    }
}

const updatePositionsByPage = async (req, res, next) => {

    //check if validation errors
    const errors = validator.validationResult(req)
    if (!errors.isEmpty()) {
        return res.status(422).json({ errors: errors.array() });
    }


    try {
        //get the page object
        let page = await pageService.updatePositionsByPage(req.params.id, req.body.positions);
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


module.exports = {
    fetch,
    fetchAll,
    fetchPositionsByPage,
    create,
    remove,
    updatePositionsByPage
}