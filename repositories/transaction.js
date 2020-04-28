const db = require('../models');

const getTransaction = async() => {
    try {
        return db.sequelize.transaction()
    } catch (error) {
        console.error(error);
        throw ('Can not get the transaction');
    }
}


module.exports = {
    getTransaction
}