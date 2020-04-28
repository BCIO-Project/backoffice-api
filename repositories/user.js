const db = require('../models/');
const User = db.User;

const fetchAll = async (type) => {
    try {
        return User.findAll({});
    } catch (e) {
        console.error(e)
        throw ('Can not fetch Users');
    }
}

module.exports = {
    fetchAll
}