'use strict';

const slug = require('slug');

const findInArray = (arr,needle) => {
    for(let elem in arr){
        if (arr[elem].name === needle)
        return arr[elem].id
    }
    return false;
};

module.exports = {
    
    up: async (queryInterface, Sequelize) => {
        
        try{
            
                
                let page1 = 'El País - PORTADA';
                let page2 = 'El País - SOCIEDAD';
                let page3 = 'El País - SMODA';
                await queryInterface.bulkInsert('Pages', [{
                    name: page1,
                    slug: slug(page1, {lower: true}),
                    createdAt: new Date(),
                    updatedAt: new Date()
                },{
                    name: page2,
                    slug: slug(page2, {lower: true}),
                    createdAt: new Date(),
                    updatedAt: new Date()
                },{
                    name: page3,
                    slug: slug(page3, {lower: true}),
                    createdAt: new Date(),
                    updatedAt: new Date()
                }], {});
                
                
                const pages = await queryInterface.sequelize.query(
                    `SELECT id, name from "Pages";`
                    );
                }catch(e){
                    console.log(e);
                }
                
                
            },
            
            down: async (queryInterface, Sequelize) => {
                try {
                    await queryInterface.sequelize.query(`TRUNCATE TABLE "Pages" CASCADE;`);
                }catch(e){
                    console.log(e);
                }
            }
        };
        