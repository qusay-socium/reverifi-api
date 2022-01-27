'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'property_type',
      [
        { id: '5051b500-c9c7-4ba5-ae3f-966abcdaee99', type: 'House' },
        { id: '5bf8038e-2d18-49c0-8c42-eb9392462068', type: 'Townhouse' },
        { id: '6af792b3-5f59-4789-bd5a-3714e5b7aa14', type: 'Apartments' },
        { id: 'b986f728-fdc7-46cb-bde5-de1ddc741052', type: 'Condominium' },
        { id: '1730387e-4775-493e-8562-e97787d5642a', type: 'Co-op' },
        { id: '2ecaada7-22da-4660-9e60-b20ce38b16c3', type: 'Mobile' },
        { id: 'ddaae875-e369-4ada-b544-dfb6b3476c2d', type: 'Land' },
        { id: '40572ec0-e7c8-4495-8ae1-11b425ea83cf', type: 'Coming Soon' },
        { id: 'f68ede04-86ed-4317-b1fa-0c8c061dd26a', type: 'Other' },
        {
          id: 'fb472696-c305-4d48-bd49-9d95672332ac',
          type: 'Single Family Home',
        },
        {
          id: 'ea3302b1-092b-4a32-9eb7-7cb3ac68cc4f',
          type: 'Multi Family Home',
        },
        {
          id: '06ce057b-b3b6-42cc-8f47-1d24cc77f695',
          type: 'New Construction',
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );
    await queryInterface.bulkInsert(
      'listing_type',
      [
        { id: '0ec0b55b-0195-414b-bb69-3a7875aa2104', type: 'Sale' },
        { id: 'e7f4803a-8cbc-4028-8c9e-641644fe8b13', type: 'Rent' },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );
  },

  down: async (queryInterface) => {
    await queryInterface.bulkDelete('property_type', {
      id: [
        '5051b500-c9c7-4ba5-ae3f-966abcdaee99',
        '5bf8038e-2d18-49c0-8c42-eb9392462068',
        '6af792b3-5f59-4789-bd5a-3714e5b7aa14',
        'b986f728-fdc7-46cb-bde5-de1ddc741052',
        '1730387e-4775-493e-8562-e97787d5642a',
        '2ecaada7-22da-4660-9e60-b20ce38b16c3',
        'ea3302b1-092b-4a32-9eb7-7cb3ac68cc4f',
        'fb472696-c305-4d48-bd49-9d95672332ac',
        '06ce057b-b3b6-42cc-8f47-1d24cc77f695',
        'ddaae875-e369-4ada-b544-dfb6b3476c2d',
        '40572ec0-e7c8-4495-8ae1-11b425ea83cf',
        'f68ede04-86ed-4317-b1fa-0c8c061dd26a',
      ],
    });
    await queryInterface.bulkDelete('listingType', {
      id: ['0ec0b55b-0195-414b-bb69-3a7875aa2104', 'e7f4803a-8cbc-4028-8c9e-641644fe8b13'],
    });
  },
};
