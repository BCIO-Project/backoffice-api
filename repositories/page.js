const db = require('../models/');
const Page = db.Page;
const Position = db.Position;
const Size = db.Size;
const slug = require('slug');


const create = async (pageInfo) => {

    try {
        return await Page.create(pageInfo);
    }catch(e){
        console.error(e);
        throw ('Could not create Page')
    } 
}

const removeById = async (id) => { 
    let myPage;
    try {
        myPage = await Page.findByPk(id);
        return await myPage.destroy();
    }catch(e){
        console.error(e);
        throw('Could not remove Page')
    }
}


const removeBySlug = async (pageName) => { 
    let myPage;
    try {
        myPage = await Page.findAll({
            where: {
              slug: slug(pageName, {lower: true})
            }
          });
        if(myPage.length>0){
            const pageId = myPage[0].dataValues.id;
            await  myPage[0].destroy();
            return {id: pageId}
        }else{
            throw('Could not remove Page')
        }
    }catch(e){
        console.error(e);
        throw('Could not remove Page')
    }
}


const fetch = async (id) => {
    try{
        return await Page.findByPk(id);
    }catch(e){
        console.error(e)
        throw('Could not fetch the Page')
    }
    
}



const fetchBySlug = async (pageName) => {

    try{
        return await Page.findAll({
            where: {
              slug: slug(pageName, {lower: true})
            }
          });
    }catch(e){
        console.error(e)
        throw('Could not fetch the Page')
    }
    
}

const fetchPositionsByPage = async (pageName) => {
    try{
        return await Page.findByPk(id, {
            include: [{ model: Position, as: "positions"}]
        }); 
    }catch(e){
        console.error(e)
        throw('Could not fetch the Campaign')
    }    
}


const fetchAll = async (filters) => {
    try{
        return Page.findAll(filters);
    }catch(e){
        console.error(e)
        throw('Can not fetch Pages');
    }
}

const updatePositionsByPage = async (id, positions) => {
    try {
        let myPage = await Page.findByPk(id);
        myPage.setPositions(positions);
        return await myPage.save()


    } catch (e) {
        console.error(e)
        throw ('Can not update the positions in the pages');
    }
} 


module.exports = {
    create,
    removeById,
    removeBySlug,
    fetch,
    fetchAll,
    fetchBySlug,
    fetchPositionsByPage,
    updatePositionsByPage
}