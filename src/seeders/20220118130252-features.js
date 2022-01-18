module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'features',
      [
        {
          id: 'd4fa0e2f-4ab8-4673-84a1-911eb73abbbb',
          name: 'Air Conditioning',
        },
        {
          id: '64d16b91-febb-4306-8893-609d706a7678',
          name: 'Dryer',
        },
        {
          id: '73acdcdb-3109-4f4a-af2a-544395cd451b',
          name: 'Swimming Pool',
        },
        {
          id: 'de9eaf35-79cc-4ddc-967e-faed298534ed',
          name: 'Dining Room',
        },
        {
          id: 'b9f5018f-396f-4cf7-9068-1c9d30bc25d3',
          name: 'Central Heating',
        },
        {
          id: 'f3a9a947-5bf4-4a31-8280-6511fa714e95',
          name: 'Sauna',
        },
        {
          id: '6d7da40c-1fe9-4070-b190-997a8ba4c1ee',
          name: 'GYM',
        },
        {
          id: 'baea13ce-c7f5-43c0-b9d7-659a3a716529',
          name: 'WIFI',
        },
        {
          id: 'f97b7869-81ae-4229-b222-6ad1a7d8f3af',
          name: 'TV Cable',
        },
        {
          id: '295a3ff1-1336-412d-8a6c-834b6119cc6e',
          name: 'Cleaning Service',
        },
        {
          id: 'fbb8463a-5b36-40f6-a3f2-90669f4b389a',
          name: 'Parking',
        },
      ],
      {}
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('features', {
      id: [
        'd4fa0e2f-4ab8-4673-84a1-911eb73abbbb',
        '64d16b91-febb-4306-8893-609d706a7678',
        '73acdcdb-3109-4f4a-af2a-544395cd451b',
        'de9eaf35-79cc-4ddc-967e-faed298534ed',
        'b9f5018f-396f-4cf7-9068-1c9d30bc25d3',
        'f3a9a947-5bf4-4a31-8280-6511fa714e95',
        '6d7da40c-1fe9-4070-b190-997a8ba4c1ee',
        'baea13ce-c7f5-43c0-b9d7-659a3a716529',
        'f97b7869-81ae-4229-b222-6ad1a7d8f3af',
        '295a3ff1-1336-412d-8a6c-834b6119cc6e',
        'fbb8463a-5b36-40f6-a3f2-90669f4b389a',
      ],
    });
  },
};
