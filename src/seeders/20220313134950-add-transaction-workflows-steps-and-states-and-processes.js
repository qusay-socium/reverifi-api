module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert(
      'transaction_workflow_steps',
      [
        {
          id: 'cf8201f3-35e6-44a1-8036-848039fe90b6',
          name: 'Add Involved Parties',
          step_number: 1,
        },
        {
          id: 'eefb521d-631b-47e3-abaf-179c8ef53cc0',
          name: 'Manage & Assign Tasks',
          step_number: 2,
        },
        {
          id: '9ebe1699-e836-48db-ad29-4c86300cbc5f',
          name: 'Upload Documents',
          step_number: 3,
        },
        {
          id: '212a5d81-a8cd-42db-a15b-8d57d9ce6b69',
          name: 'Finalize and Close Deal',
          step_number: 4,
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );

    await queryInterface.bulkInsert(
      'states',
      [
        {
          id: '1109d922-edef-47da-84eb-27f2ce913c23',
          name: 'default state',
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );

    await queryInterface.bulkInsert(
      'processes',
      [
        {
          id: '19c4fa20-8698-42a6-9c12-057b92ea20d7',
          name: 'Initial Contract',
        },
        {
          id: '4056bfbb-b5ad-4785-97fd-05f762d23bc2',
          name: 'Signed Initial Contract',
        },
        {
          id: 'b0ee22d9-db0a-4651-bd7b-fa64ecca9c64',
          name: 'Attorney Review Buyer Side',
        },
        {
          id: '58fb8439-f353-4869-887e-7dd1805427bd',
          name: 'Attorney Review Seller Side',
        },
        {
          id: 'f6172ef9-65af-46ab-88a0-d83310a1abfb',
          name: 'Attorney Approval Buyer Side',
        },
        {
          id: '8d4c6108-cdef-4889-9244-83074730a852',
          name: 'Attorney Approval Seller Side',
        },
        {
          id: 'fe7292ea-0934-45cb-bee0-d039bebe84a7',
          name: 'Inspection Date',
        },
        {
          id: '88799f6f-ef19-4237-b1ab-f4c05b98e284',
          name: 'Confirm Inspection Date',
        },
        {
          id: 'c60d659f-d32b-4cf2-b5d8-485b9638aaa6',
          name: 'Inspection Results',
        },
        {
          id: '4fd3b1ac-2cf2-46d6-b080-79573d968702',
          name: 'Suggest Appraisal Date',
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('transaction_workflow_steps', {
      id: [
        'cf8201f3-35e6-44a1-8036-848039fe90b6',
        'eefb521d-631b-47e3-abaf-179c8ef53cc0',
        '9ebe1699-e836-48db-ad29-4c86300cbc5f',
        '212a5d81-a8cd-42db-a15b-8d57d9ce6b69',
      ],
    });

    await queryInterface.bulkDelete('states', {
      id: ['1109d922-edef-47da-84eb-27f2ce913c23'],
    });

    await queryInterface.bulkDelete('processes', {
      id: [
        '19c4fa20-8698-42a6-9c12-057b92ea20d7',
        '4056bfbb-b5ad-4785-97fd-05f762d23bc2',
        'b0ee22d9-db0a-4651-bd7b-fa64ecca9c64',
        '58fb8439-f353-4869-887e-7dd1805427bd',
        'f6172ef9-65af-46ab-88a0-d83310a1abfb',
        '8d4c6108-cdef-4889-9244-83074730a852',
        'fe7292ea-0934-45cb-bee0-d039bebe84a7',
        '88799f6f-ef19-4237-b1ab-f4c05b98e284',
        'c60d659f-d32b-4cf2-b5d8-485b9638aaa6',
        '4fd3b1ac-2cf2-46d6-b080-79573d968702',
      ],
    });
  },
};
