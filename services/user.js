const userRepository = require('../repositories/user');

const fetchAll = async () => {
    try {
        return await userRepository.fetchAll();
    } catch (e) {
        console.log(e);
        throw (e);
    }
}

module.exports = {
    fetchAll
}