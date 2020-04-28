const positionRepository = require('../repositories/position');

const fetchPositionsByPage = async (id) => {
    try {
        let myPage = await positionRepository.fetchPositionsByPage(id);
        if (myPage) {
            let myPositions = await myPage.getPositions();
            myPositions.forEach(myPosition => {
                delete myPosition.dataValues.PagePositions
            });
            return myPositions
        } else {
            return []
        }

    } catch (e) {
        throw (e);
    }
}

const create = async (positionInfo) => {


    try {

        return await positionRepository.create(positionInfo);

    } catch (e) {
        throw (e);
    }
}

const remove = async (id) => {
    try {
        return await positionRepository.remove(id);
    } catch (e) {
        throw (e);
    }
}

const update = async (id, positionInfo) => {
    try {
        return await positionRepository.update(id, positionInfo);
    } catch (e) {
        throw (e);
    }
}

const fetch = async (id) => {

    try {
        return await positionRepository.fetch(id);
    } catch (e) {
        throw (e);
    }

}

const fetchAll = async () => {

    try {
        return await positionRepository.fetchAll();
    } catch (e) {
        throw (e);
    }
}


module.exports = {
    fetchPositionsByPage,
    fetch,
    create,
    remove,
    fetchAll,
    update
}