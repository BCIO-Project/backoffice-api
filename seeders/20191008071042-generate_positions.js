'use strict';



const findInArray = (arr, needle) => {
    for (let elem in arr) {
        if (arr[elem].name === needle)
            return arr[elem].id
    }
    return false;
};

module.exports = {

    up: async (queryInterface, Sequelize) => {

        try {
            //PORTADA
            await queryInterface.bulkInsert('Positions', [{
                name: 'Premium',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionPortadaPremium = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 1',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionPortadaS1 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 2',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionPortadaS2 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 3',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionPortadaS3 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            //SOCIEDAD
            await queryInterface.bulkInsert('Positions', [{
                name: 'Premium',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSociedadPremium = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 1',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSociedadS1 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 2',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSociedadS2 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 3',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSociedadS3 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );


            //SMODA


            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 1',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSMODAS1 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 2',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSMODAS2 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );

            await queryInterface.bulkInsert('Positions', [{
                name: 'Standard 3',
                createdAt: new Date(),
                updatedAt: new Date()
            }],
                {});
            let lastPositionSMODAS3 = await queryInterface.sequelize.query(
                `SELECT MAX("id") FROM "Positions" `
            );






            const pages = await queryInterface.sequelize.query(
                `SELECT id, name from "Pages";`
            );

            await queryInterface.bulkInsert('PagePositions', [
                {
                    pageId: findInArray(pages[0], 'El País - PORTADA'),
                    positionId: lastPositionPortadaPremium[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - PORTADA'),
                    positionId: lastPositionPortadaS1[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - PORTADA'),
                    positionId: lastPositionPortadaS2[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - PORTADA'),
                    positionId: lastPositionPortadaS3[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    positionId: lastPositionSociedadPremium[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    positionId: lastPositionSociedadS1[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    positionId: lastPositionSociedadS2[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SOCIEDAD'),
                    positionId: lastPositionSociedadS3[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SMODA'),
                    positionId: lastPositionSMODAS1[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SMODA'),
                    positionId: lastPositionSMODAS2[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }, {
                    pageId: findInArray(pages[0], 'El País - SMODA'),
                    positionId: lastPositionSMODAS3[0][0].max,
                    createdAt: new Date(),
                    updatedAt: new Date(),
                }
            ], {});
            //creo position y guardo el id
        } catch (e) {
            console.log(e);
        };




    },

    down: async (queryInterface, Sequelize) => {
        try {
            await queryInterface.sequelize.query(`TRUNCATE TABLE "PagePositions" CASCADE;`);
            await queryInterface.sequelize.query(`TRUNCATE TABLE "Positions" CASCADE;`);
        } catch (e) {
            console.log(e);
        }
    }
};
