const db = require('../models/');
const Page = db.Page;
const Position = db.Position;


const fetchPositionsByPage = async (id) => {
    try {
        return await Page.findByPk(id, {
            include: [{ model: Position, as: "positions" }]
        });
    } catch (e) {
        console.error(e)
        throw ('Could not fetch positions')
    }
}

const fetch = async (id) => {
    try {
        return await Position.findByPk(id);
    } catch (e) {
        console.error(e)
        throw ('Could not fetch the Positions')
    }

}

const fetchAll = async () => {
    try {
        return Position.findAll();
    } catch (e) {
        console.error(e)
        throw ('Can not fetch Positions');
    }
}

const create = async (positionInfo) => {

    try {
        return await Position.create({ "name": positionInfo.name});
    } catch (e) {
        console.error(e);
        throw ('Could not create position')
    }
}

const update = async (id, positionInfo) => {

    try {
        myPosition = await Position.findByPk(id);
        return await myPosition.update(positionInfo)
        
    } catch (e) {
        console.error(e);
        throw ('Could not update position')
    }
}

const remove = async (id) => {
    let myPosition;
    try {
        myPosition = await Position.findByPk(id);
        return await myPosition.destroy();
    } catch (e) {
        console.error(e);
        throw ('Could not remove position')
    }
}

module.exports = {
    fetchPositionsByPage,
    fetch,
    fetchAll,
    create,
    remove,
    update
}