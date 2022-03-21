module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('documents_names', {
      id: [
        '38bc2b62-62c8-4dd0-906c-fb2c8445b4ce',
        'c5569037-f275-4332-9159-1f5fe90dbf4c',
        '642ec271-26e3-44f3-b0fa-6a4be4cc9bf2',
        'c10be1d5-56f5-4101-88c7-2ab42d4b83b1',
      ],
    });

    await queryInterface.bulkInsert(
      'documents_names',
      [
        {
          id: 'f9ed3acb-d9e1-476e-9213-bc47d41ea608',
          name: 'Attorney general memo',
        },
        {
          id: '722d1231-b374-4738-aed3-d20ecf7fbeb7',
          name: 'Consumer information statement',
        },
        {
          id: 'd0d08efe-d883-4c76-9c16-d41ba48e18b5',
          name: 'Informed consent to dual agency seller',
        },
        {
          id: 'ada55b20-81be-4ed8-85a0-8be1a358f3e1',
          name: 'Lead based paint form',
        },
        {
          id: 'f780de0c-f7ac-44ab-8d11-52c699092f5c',
          name: 'NJ MLS 2-4Fam listing agreement',
        },
        {
          id: 'f899c5a4-4a1b-4828-9f2f-57fb4f06b5d8',
          name: 'NJ MLS Residential listing agreement',
        },
        {
          id: 'f735de97-4660-4ae6-935c-6de2dfc46259',
          name: 'Protect your family from lead paint',
        },
        {
          id: '0c725911-453b-4e31-86ea-b66543285543',
          name: "Seller's property disclosure",
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'documents_names',
      [
        {
          id: '38bc2b62-62c8-4dd0-906c-fb2c8445b4ce',
          name: 'Certificate of Occupancy',
        },
        {
          id: 'c5569037-f275-4332-9159-1f5fe90dbf4c',
          name: 'Consumer Information Statement',
        },
        {
          id: '642ec271-26e3-44f3-b0fa-6a4be4cc9bf2',
          name: 'Lead Based Paint Form',
        },
        {
          id: 'c10be1d5-56f5-4101-88c7-2ab42d4b83b1',
          name: 'NJ MLS Residential Listing Agreement',
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );

    await queryInterface.bulkDelete('documents_names', {
      id: [
        'f9ed3acb-d9e1-476e-9213-bc47d41ea608',
        '722d1231-b374-4738-aed3-d20ecf7fbeb7',
        'd0d08efe-d883-4c76-9c16-d41ba48e18b5',
        'ada55b20-81be-4ed8-85a0-8be1a358f3e1',
        'f780de0c-f7ac-44ab-8d11-52c699092f5c',
        'f899c5a4-4a1b-4828-9f2f-57fb4f06b5d8',
        'f735de97-4660-4ae6-935c-6de2dfc46259',
        '0c725911-453b-4e31-86ea-b66543285543',
      ],
    });
  },
};
