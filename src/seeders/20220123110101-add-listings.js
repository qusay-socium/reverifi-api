'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('listings', [
      {
        id: '64000c4f-f009-4d71-abf7-711f5f88a9b5',
        agent_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        images: [
          'https://photos.zillowstatic.com/fp/b740db5b614aa6260773342b7b24c6ae-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/628ea6a2b888dad284c01667268c39df-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/547958d1e69d851a5d9aab1e5eaf6364-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/831e364f32bcfd1a352fa61525a72789-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 300000,
        country: 'US',
        lang: '30',
        lat: '11',
        city: 'NY',
        zip_code: '10467',
        street: '638 Western Ave',
        address: '638 Western Ave, Bronx, NY 10467',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "225"}',
        lot_area: '{"sqft": "225"}',
        lot_dimensions: '{"sqft": "225"}',
        rooms: 1,
        garage: 1,
        tags: ['For Rent', 'Pending'],
        year_built: 2012,
        overview: 'nice home',
        per_period: 'Month',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
      {
        id: '69f98cbd-1463-406e-be73-1db83bc2c1a7',
        agent_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        images: [
          'https://photos.zillowstatic.com/fp/47ad5294bdd28fe3a3b0e66f4edbedab-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/1255b8d2a35167b73eababcc5d0dc41e-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/6c1356231ae6f6006cb799da5e2b370e-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 550000,
        country: 'US',
        lang: '50',
        lat: '8',
        city: 'NJ',
        zip_code: '08540',
        street: '627 Princeton Kingston Rd',
        address: '627 Princeton Kingston Rd, Princeton, NJ 08540',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "225"}',
        lot_area: '{"sqft": "225"}',
        lot_dimensions: '{"sqft": "225"}',
        rooms: 1,
        garage: 1,
        tags: ['Price Cut'],
        year_built: 2009,
        overview: 'nice home',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
      {
        id: 'e8bef5e4-83bb-4be0-9288-f5688d46f8d8',
        agent_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        images: [
          'https://photos.zillowstatic.com/fp/2123a7af7a0afd50d062f04c1f3912e0-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/4b3ed02d6c4993338fdad647b9c99afb-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/0c2313dc8f7d89d558ea950e37c2c23f-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 660000,
        country: 'US',
        lang: '50',
        lat: '8',
        city: 'NJ',
        zip_code: '08540',
        street: '627 Princeton Kingston Rd',
        address: '627 Princeton Kingston Rd, Princeton, NJ 08540',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "225"}',
        lot_area: '{"sqft": "225"}',
        lot_dimensions: '{"sqft": "225"}',
        rooms: 1,
        garage: 1,
        tags: ['New construction'],
        year_built: 2009,
        overview: 'nice home',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
      {
        id: '3517ae87-a54c-4935-8c7a-40f9800920fe',
        agent_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        images: [
          'https://photos.zillowstatic.com/fp/91d21915b0f05822a0defc6511f0129a-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/685583cc7a38c8b689b6f7ac6b9e0444-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/1d1568f3d9cf23914c01554a888a0d27-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 400000,
        country: 'US',
        lang: '30',
        lat: '11',
        city: 'NY',
        zip_code: '10467',
        street: '638 Western Ave',
        address: '638 Western Ave, Bronx, NY 10467',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "225"}',
        lot_area: '{"sqft": "225"}',
        lot_dimensions: '{"sqft": "225"}',
        rooms: 1,
        garage: 1,
        tags: ['For Rent'],
        year_built: 2012,
        overview: 'nice home',
        per_period: 'Month',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
      {
        id: '96f4d561-27c9-4c01-b28d-9bb9fe46314c',
        agent_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        images: [
          'https://photos.zillowstatic.com/fp/1bd1180a479cd9e91d58abbff5855df1-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/5522fc71a24dda5f7545f20e7c3d2ef3-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/55260528bf93582c31a3880f360d1aeb-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/d29f15935dcd831f80d76fc0c81f022c-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 700000,
        country: 'US',
        lang: '99',
        lat: '2',
        city: 'NJ',
        zip_code: '07078',
        street: '17 Oaklawn Rd',
        address: '17 Oaklawn Rd, Short Hills, NJ 07078',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "225"}',
        lot_area: '{"sqft": "225"}',
        lot_dimensions: '{"sqft": "225"}',
        rooms: 1,
        garage: 1,
        tags: ['For Sale'],
        year_built: 2012,
        overview: 'nice home',
        per_period: 'Month',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
      {
        id: '4dc61602-b414-41b2-a456-2499b3f9b3a4',
        agent_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        images: [
          'https://photos.zillowstatic.com/fp/a15b9130f0d7f5ae4dacbe3e5f25ff20-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/9bdb3c12b363453c85a390532abc5545-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/7dec66f1ce12c7dcf55acefc4e783a25-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/64302a90072e3dca5e11cbd10cffa91e-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 700000,
        country: 'US',
        lang: '99',
        lat: '2',
        city: 'NJ',
        zip_code: '07078',
        street: '17 Oaklawn Rd',
        address: '17 Oaklawn Rd, Short Hills, NJ 07078',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "225"}',
        lot_area: '{"sqft": "225"}',
        lot_dimensions: '{"sqft": "225"}',
        rooms: 1,
        garage: 1,
        tags: ['Pending'],
        year_built: 2012,
        overview: 'nice home',
        per_period: 'Month',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('listings', {
      id: [
        '64000c4f-f009-4d71-abf7-711f5f88a9b5',
        '69f98cbd-1463-406e-be73-1db83bc2c1a7',
        'e8bef5e4-83bb-4be0-9288-f5688d46f8d8',
        '3517ae87-a54c-4935-8c7a-40f9800920fe',
        '96f4d561-27c9-4c01-b28d-9bb9fe46314c',
        '4dc61602-b414-41b2-a456-2499b3f9b3a4',
      ],
    });
  },
};
