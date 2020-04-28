const db = require('../models/');
const Size = db.Size;


const fetchAllByPage = async (pageId) => {
    try {
        return Size.findAll({
            where: {
                pageId: pageId
            }
        });
    } catch (e) {
        console.error(e)
        throw ('Can not fetch Sizes');
    }
}

module.exports = {
    fetchAllByPage
}