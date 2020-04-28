'use strict';
const crypto2 = require('crypto2');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    try {      
      await queryInterface.bulkInsert('Users', [{
        name: 'Admin',
        username: 'bcio@paradigmadigital.com',
        password: await crypto2.hash.sha1('XXXXX'),
        createdAt: new Date(),
        updatedAt: new Date()
      },{
        name: 'Data',
        username: 'data@prisa.com',
        password: await crypto2.hash.sha1('XXXXX'),
        createdAt: new Date(),
        updatedAt: new Date()
      }], {});
    }catch(e){
      console.error(e)
    }
  },

  down: async (queryInterface, Sequelize) => {
    try{
        await queryInterface.sequelize.query(`TRUNCATE TABLE "Users" CASCADE;`);
    }catch(e){
      console.error(e);
    }
  }
};
