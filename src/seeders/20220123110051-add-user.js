'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('users', [
      {
        id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        name: 'ibrahim',
        email: 'iba@iba.com',
        password: '841f1fa7ca66b28772d5b2f6ec4e882fd28130c87ca33b43b1d23e69942bfe5e',
        is_verified: true,
        phone: '079555555',
        created_at: Sequelize.fn('NOW'),
      },
    ]);

    await queryInterface.bulkInsert('user_infos', [
      {
        id: '3438eef6-ab5d-4893-97b1-4426ac872aad',
        user_id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63',
        city: 'amman',
        country: 'JO',
        zip_code: '12536',
        address: 'street 2, building 26',
        languages: ['ar', 'en'],
        service_areas: ['NY', 'NJ'],
        socials: JSON.stringify({ facebook: 'iba@facebook.com', youtube: 'iba@youtube.com' }),
        about_me: 'my name is ibrahim',
        image: 'https://cdn.pixabay.com/photo/2014/07/09/10/04/man-388104_960_720.jpg',
        created_at: Sequelize.fn('NOW'),
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('users', { id: '5acf8623-b8f3-4b09-9269-d38fdca1bd63' });
    await queryInterface.bulkDelete('user_infos', {
      id: '3438eef6-ab5d-4893-97b1-4426ac872aad',
    });
  },
};
