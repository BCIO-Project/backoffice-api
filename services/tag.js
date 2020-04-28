const tagRepository = require('../repositories/tag');

const fetchAllByType = async (type) => {
    try {
        const tags = await tagRepository.fetchAllByType(type);
        return tags;
    }catch(e){
        console.log(e);
        throw (e);
    }
  }

module.exports = {
    fetchAllByType
}