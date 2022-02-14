'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('listings', [
      {
        id: 'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        agent_id: '96088d97-7ee7-4868-a490-d96c1fdd26ee',
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
        city: 'new york',
        zip_code: '10467',
        street: '638 Western Ave',
        address: '638 Western Ave, Bronx, new york 10467',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "435"}',
        lot_area: '{"sqft": "789"}',
        lot_dimensions: '{"sqft": "786"}',
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
        id: '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        agent_id: '5b8a89f6-9f66-48da-865c-d8a20098fa67',
        images: [
          'https://photos.zillowstatic.com/fp/47ad5294bdd28fe3a3b0e66f4edbedab-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/1255b8d2a35167b73eababcc5d0dc41e-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/6c1356231ae6f6006cb799da5e2b370e-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 550000,
        country: 'US',
        lang: '50',
        lat: '8',
        city: 'new york',
        zip_code: '08540',
        street: '627 Princeton Kingston Rd',
        address: '627 Princeton Kingston Rd, Princeton, new york 08540',
        bedrooms: 4,
        full_bathrooms: 2,
        partial_bathrooms: 5,
        home_area: '{"sqft": "785"}',
        lot_area: '{"sqft": "246"}',
        lot_dimensions: '{"sqft": "468"}',
        rooms: 1,
        garage: 1,
        tags: ['Price Cut'],
        year_built: 2009,
        overview: 'nice home',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
      {
        id: '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
        agent_id: 'f98ca513-ee05-4672-946e-f046c3ce521c',
        images: [
          'https://photos.zillowstatic.com/fp/2123a7af7a0afd50d062f04c1f3912e0-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/4b3ed02d6c4993338fdad647b9c99afb-uncropped_scaled_within_1536_1152.webp',
          'https://photos.zillowstatic.com/fp/0c2313dc8f7d89d558ea950e37c2c23f-uncropped_scaled_within_1536_1152.webp',
        ],
        price: 660000,
        country: 'US',
        lang: '50',
        lat: '8',
        city: 'new york',
        zip_code: '08540',
        street: '627 Princeton Kingston Rd',
        address: '627 Princeton Kingston Rd, Princeton, new york 08540',
        bedrooms: 1,
        full_bathrooms: 2,
        partial_bathrooms: 1,
        home_area: '{"sqft": "452"}',
        lot_area: '{"sqft": "785"}',
        lot_dimensions: '{"sqft": "437"}',
        rooms: 1,
        garage: 1,
        tags: ['New construction'],
        year_built: 2009,
        overview: 'nice home',
        offer_type: 'sell',
        created_at: Sequelize.fn('NOW'),
      },
    ]);

    await queryInterface.bulkInsert('listing_features', [
      {
        id: '93b95a23-af21-44f4-bf6c-0d0c829ac627',
        listing_id: 'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        feature_id: '64d16b91-febb-4306-8893-609d706a7678',
      },
      {
        id: 'd33e2dcf-6159-4d2a-adf9-05c67aada743',
        listing_id: 'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        feature_id: '73acdcdb-3109-4f4a-af2a-544395cd451b',
      },
      {
        id: '7154acfb-5ce6-446e-b512-3d4cc803106b',
        listing_id: 'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        feature_id: 'de9eaf35-79cc-4ddc-967e-faed298534ed',
      },
      {
        id: '403b6a78-54f1-4e0e-a14a-b8da8dfe1eb5',
        listing_id: 'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        feature_id: 'b9f5018f-396f-4cf7-9068-1c9d30bc25d3',
      },
      {
        id: '1b954fe7-9319-491d-be19-18cf6799348b',
        listing_id: 'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        feature_id: 'f3a9a947-5bf4-4a31-8280-6511fa714e95',
      },

      {
        id: '6ae83d21-c7d6-48c1-b871-17c7a6aa773e',
        listing_id: '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        feature_id: '6d7da40c-1fe9-4070-b190-997a8ba4c1ee',
      },
      {
        id: 'f3a2252a-8b3d-44ce-8ccb-ccd2aa9e2b1c',
        listing_id: '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        feature_id: 'baea13ce-c7f5-43c0-b9d7-659a3a716529',
      },
      {
        id: '4dc153e4-6fcc-4647-918e-ca3fa3c1089b',
        listing_id: '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        feature_id: 'f97b7869-81ae-4229-b222-6ad1a7d8f3af',
      },
      {
        id: '1fa09798-7e32-419e-a4c3-2e4d59e04681',
        listing_id: '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        feature_id: '295a3ff1-1336-412d-8a6c-834b6119cc6e',
      },
      {
        id: 'fe28376a-0b6e-4c64-8a30-88c30ff9a5c2',
        listing_id: '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        feature_id: 'fbb8463a-5b36-40f6-a3f2-90669f4b389a',
      },

      {
        id: 'b4f42d03-a80e-4f0a-ae0d-cf032138c14f',
        listing_id: '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
        feature_id: 'de9eaf35-79cc-4ddc-967e-faed298534ed',
      },
      {
        id: '6045f0b2-c1e9-4e1b-9b32-bded491db06b',
        listing_id: '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
        feature_id: '6d7da40c-1fe9-4070-b190-997a8ba4c1ee',
      },
      {
        id: '7f54fb78-e55e-425e-8727-3ead082c4b13',
        listing_id: '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
        feature_id: '64d16b91-febb-4306-8893-609d706a7678',
      },
      {
        id: 'fd6e49b2-5ef5-470f-b3b9-1f723a55c2f4',
        listing_id: '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
        feature_id: 'de9eaf35-79cc-4ddc-967e-faed298534ed',
      },
      {
        id: 'fcb2690f-39cb-466b-817e-cc46c153c948',
        listing_id: '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
        feature_id: 'f3a9a947-5bf4-4a31-8280-6511fa714e95',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('listings', {
      id: [
        'f1f579b2-aa08-4a59-a83d-13adfde1b802',
        '96d2e0c4-3a6d-460f-a5a9-0579cb9b890d',
        '6ccbd2c0-ea13-46a8-90d2-e79b3c51e7cc',
      ],
    });
    await queryInterface.bulkDelete('listing_features', {
      id: [
        '93b95a23-af21-44f4-bf6c-0d0c829ac627',
        'd33e2dcf-6159-4d2a-adf9-05c67aada743',
        '7154acfb-5ce6-446e-b512-3d4cc803106b',
        '403b6a78-54f1-4e0e-a14a-b8da8dfe1eb5',
        '1b954fe7-9319-491d-be19-18cf6799348b',
        '6ae83d21-c7d6-48c1-b871-17c7a6aa773e',
        'f3a2252a-8b3d-44ce-8ccb-ccd2aa9e2b1c',
        '4dc153e4-6fcc-4647-918e-ca3fa3c1089b',
        '1fa09798-7e32-419e-a4c3-2e4d59e04681',
        'fe28376a-0b6e-4c64-8a30-88c30ff9a5c2',
        'b4f42d03-a80e-4f0a-ae0d-cf032138c14f',
        '6045f0b2-c1e9-4e1b-9b32-bded491db06b',
        '7f54fb78-e55e-425e-8727-3ead082c4b13',
        'fd6e49b2-5ef5-470f-b3b9-1f723a55c2f4',
        'fcb2690f-39cb-466b-817e-cc46c153c948',
      ],
    });
  },
};
