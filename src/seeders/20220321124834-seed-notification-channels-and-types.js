'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    const transaction = await queryInterface.sequelize.transaction();

    try {
      await queryInterface.bulkInsert(
        'notification_types',
        [
          {
            id: '697b1d3c-bd37-4cc1-a94e-c86bee94e090',
            description: 'Registration',
          },
          {
            id: 'ec90417e-9928-42f1-b359-24639f07e74c',
            description: 'New Review',
          },
        ].map((item) => ({ ...item, created_at: Sequelize.fn('now') })),
        { transaction }
      );

      await queryInterface.bulkInsert(
        'channels',
        [
          {
            id: '9aa9555a-9719-4208-8e1d-066ced935d6a',
            name: 'Email',
            is_active: true,
          },
          {
            id: '2b5961e3-8912-4177-ba28-d5f754e23b74',
            name: 'Sms',
            is_active: true,
          },
          {
            id: '7363a06c-10a0-4fa1-a7c0-b8f459b6d751',
            name: 'Push',
            is_active: true,
          },
        ].map((item) => ({ ...item, created_at: Sequelize.fn('now') })),
        { transaction }
      );

      await queryInterface.bulkInsert(
        'notification_channels',
        [
          {
            id: 'bb028ac7-38fb-4b2e-8a26-4bd27151875f',
            notification_type_id: '697b1d3c-bd37-4cc1-a94e-c86bee94e090',
            channel_id: '9aa9555a-9719-4208-8e1d-066ced935d6a',
            content: JSON.stringify({ user_id: { model: 'User', fields: ['name', 'email'] } }),
            view: 'email/registration.ejs',
            title: 'email/registration-title.ejs',
          },
          {
            id: 'cfb34095-34ac-4563-baf5-71a1171a21c9',
            notification_type_id: '697b1d3c-bd37-4cc1-a94e-c86bee94e090',
            channel_id: '2b5961e3-8912-4177-ba28-d5f754e23b74',
            content: JSON.stringify({ user_id: { model: 'User', fields: ['name'] } }),
            view: 'email/registration.ejs',
            title: null,
          },
          {
            id: 'b43ca283-7cc8-4f9a-a393-f376944acfc2',
            notification_type_id: '697b1d3c-bd37-4cc1-a94e-c86bee94e090',
            channel_id: '7363a06c-10a0-4fa1-a7c0-b8f459b6d751',
            content: null,
            view: 'Welcome to Reverifi, check latest updates in the home page',
            title: 'Welcome',
          },

          {
            id: '0408d6fb-c9ef-47d2-90fd-c4893f7dcadc',
            notification_type_id: 'ec90417e-9928-42f1-b359-24639f07e74c',
            channel_id: '9aa9555a-9719-4208-8e1d-066ced935d6a',
            content: JSON.stringify({
              user_id: { model: 'User', fields: ['name'] },
              criteria_id: { model: 'RatingCriteria', fields: { criteria: 'criteriaName' } },
            }),
            view: 'email/new-review.ejs',
            title: 'New Reverifi review received',
          },
          {
            id: '4c9a7799-c562-44ff-9d77-12c3ac931241',
            notification_type_id: 'ec90417e-9928-42f1-b359-24639f07e74c',
            channel_id: '2b5961e3-8912-4177-ba28-d5f754e23b74',
            content: JSON.stringify({ user_id: { model: 'User', fields: ['name'] } }),
            view: 'sms/new-review.ejs',
            title: null,
          },
          {
            id: '31a1fe1d-5d77-421a-9e21-07fcb907eea0',
            notification_type_id: 'ec90417e-9928-42f1-b359-24639f07e74c',
            channel_id: '7363a06c-10a0-4fa1-a7c0-b8f459b6d751',
            content: JSON.stringify({
              user_id: { model: 'User', fields: ['name'] },
              criteria_id: { model: 'RatingCriteria', fields: { criteria: 'criteriaName' } },
            }),
            view: 'push/new-review.ejs',
            title: 'New are review from <%= locals.name %>',
          },
        ],
        { transaction }
      );
      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw error;
    }
  },

  async down(queryInterface, Sequelize) {
    await queryInterface.bulkDelete('notification_channels', {
      id: [
        'bb028ac7-38fb-4b2e-8a26-4bd27151875f',
        'cfb34095-34ac-4563-baf5-71a1171a21c9',
        'b43ca283-7cc8-4f9a-a393-f376944acfc2',
        '0408d6fb-c9ef-47d2-90fd-c4893f7dcadc',
        '4c9a7799-c562-44ff-9d77-12c3ac931241',
        '31a1fe1d-5d77-421a-9e21-07fcb907eea0',
      ],
    });

    await queryInterface.bulkDelete('channels', {
      id: [
        '9aa9555a-9719-4208-8e1d-066ced935d6a',
        '2b5961e3-8912-4177-ba28-d5f754e23b74',
        '7363a06c-10a0-4fa1-a7c0-b8f459b6d751',
      ],
    });
    await queryInterface.bulkDelete('notification_types', {
      id: ['697b1d3c-bd37-4cc1-a94e-c86bee94e090', 'ec90417e-9928-42f1-b359-24639f07e74c'],
    });
  },
};
