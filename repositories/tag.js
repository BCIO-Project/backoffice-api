const db = require('../models/');
const Tag = db.Tag;


const fetchAllByType = async (type) => {
    try{
        return Tag.findAll({
            where: {
              type: type
            }
          });
    }catch(e){
        console.error(e)
        throw('Can not fetch Tags');
    }
}

module.exports = {
    fetchAllByType
}