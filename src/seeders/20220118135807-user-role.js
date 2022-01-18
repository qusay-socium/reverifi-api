'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'user_roles',
      [
        {
          id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
          role: 'Seller',
        },
        {
          id: '695d7d66-135d-437b-b0d8-7fe37e831136',
          role: 'Buyer',
        },
        {
          id: '0d07a040-c95a-45e2-873a-7ca81095b994',
          role: 'Home Inspector',
        },
        {
          id: 'fcd77749-1884-4f0f-83a7-9f67781466c4',
          role: 'Lender',
        },
        {
          id: '6c85c8ea-a560-4a8c-813c-d7508df50207',
          role: 'Attorney',
        },
        {
          id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
          role: 'Agent',
        },
        {
          id: '389424be-cc5b-47c5-9274-fdc68c88baf0',
          role: 'Insurance Provider',
        },
        {
          id: 'e8f1f077-c48e-4d00-84f9-22b9e159a322',
          role: 'Transaction Coordinator',
        },
        {
          id: '1a757bc6-89de-4656-af74-f7f9fbd74d62',
          role: 'reverifi+',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('user_roles', {
      id: [
        'a784ef06-781a-4ea2-9323-eb77a543293a',
        '695d7d66-135d-437b-b0d8-7fe37e831136',
        '0d07a040-c95a-45e2-873a-7ca81095b994',
        'fcd77749-1884-4f0f-83a7-9f67781466c4',
        '6c85c8ea-a560-4a8c-813c-d7508df50207',
        'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
        '389424be-cc5b-47c5-9274-fdc68c88baf0',
        'e8f1f077-c48e-4d00-84f9-22b9e159a322',
        '1a757bc6-89de-4656-af74-f7f9fbd74d62',
      ],
    });
  },
};
