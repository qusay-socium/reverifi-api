module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert(
      'rating_criteria',
      [
        {
          id: '787f04ab-eaac-4558-ac9e-c2e33a18a9ab',
          criteria: 'Responsiveness',
          type: 'user',
        },
        {
          id: '35a78478-dc7d-4ba7-a9b4-e88e8f49c768',
          criteria: 'Knowledgeable',
          type: 'user',
        },
        {
          id: 'f257dac4-bcac-4314-b7dc-c594fad7ea9a',
          criteria: 'Trustworthy',
          type: 'user',
        },
        {
          id: '1976dc24-b0a4-45a4-903e-65ec1f1b1701',
          criteria: 'Helpful',
          type: 'user',
        },
      ].map((item) => ({ ...item, created_at: Sequelize.fn('now') }))
    );
  },

  down: async (queryInterface, Sequelize) => {
    return queryInterface.bulkDelete('rating_criteria', {
      id: [
        '787f04ab-eaac-4558-ac9e-c2e33a18a9ab',
        '35a78478-dc7d-4ba7-a9b4-e88e8f49c768',
        'f257dac4-bcac-4314-b7dc-c594fad7ea9a',
        '1976dc24-b0a4-45a4-903e-65ec1f1b1701',
      ],
    });
  },
};
