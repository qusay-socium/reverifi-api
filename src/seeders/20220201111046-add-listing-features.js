'use strict';

module.exports = {
  up: async (queryInterface) => {
    await queryInterface.bulkInsert('listing_features', [
      {
      id: '64000c4f-f009-4d71-abf7-711f5f88a9b7',
      listing_id:'64000c4f-f009-4d71-abf7-711f5f88a9b5',
      feature_id:'baea13ce-c7f5-43c0-b9d7-659a3a716529'
    },{
      id: '64000c4f-f009-4d71-abf7-711f5f88a9b6',
      listing_id:'64000c4f-f009-4d71-abf7-711f5f88a9b5',
      feature_id:'d4fa0e2f-4ab8-4673-84a1-911eb73abbbb'
    }],);
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('listing_features', {
      id: [
        '64000c4f-f009-4d71-abf7-711f5f88a9b7',
        '64000c4f-f009-4d71-abf7-711f5f88a9b6',
      ],
    });
  }
};
