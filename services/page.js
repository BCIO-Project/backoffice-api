const pageRepository = require('../repositories/page');
const sizeRepository = require('../repositories/size');
const slug = require('slug');

const create = async (pageInfo) => {

    pageInfo.slug = slug(pageInfo.name, { lower: true });

  try {

      const pageInserted = await pageRepository.create(pageInfo);
      return pageInserted;

  }catch(e){
    console.log(e);
    throw(e); //TODO: HANDLE ERROR PROPPERLY
  } 
}


const removeBySlug = async (name) => {
  try {
    return await pageRepository.removeBySlug(name)
  } catch (e) {
    console.log(e);
    throw (e);
  }
}



const removeById = async (id) => {
  try {
    return await pageRepository.removeById(id)
  } catch (e) {
    console.log(e);
    throw (e);
  }
}


const fetch = async (id) => {
  try {
    return await pageRepository.fetch(id);
  }catch(e){  
    console.log(e);
    throw (e);
  }
}

const fetchSizesByPage = async (id) => {
    try {
        return await sizeRepository.fetchAllByPage(id);
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

const fetchBySlug = async (pageName) => {
  try {
    return await pageRepository.fetchBySlug(pageName);
  }catch(e){  
    console.log(e);
    throw (e);
  }
}


const fetchAll = async () => {
  try {
    let pages = await pageRepository.fetchAll();
    return pages;
  }catch(e){
    console.log(e);
    throw (e);
  }
}

const updatePositionsByPage = async (pageId, positions) => {
    try {
        let page = await pageRepository.updatePositionsByPage(pageId, positions);
        return page;
    } catch (e) {
        console.log(e);
        throw (e);
    }
}



module.exports = {
    fetch,
    fetchSizesByPage,
    fetchAll,
    fetchBySlug,
    create,
    removeById,
    removeBySlug,
    updatePositionsByPage
}