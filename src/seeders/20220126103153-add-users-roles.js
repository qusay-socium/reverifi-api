'use strict';

module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('user_roles', [
      {
        user_id: '1e3a76be-47a8-459c-8ed4-83a745d5336f',
        role_id: '695d7d66-135d-437b-b0d8-7fe37e831136',
      },

      {
        user_id: '96088d97-7ee7-4868-a490-d96c1fdd26ee',
        role_id: '695d7d66-135d-437b-b0d8-7fe37e831136',
      },
      {
        user_id: '447df28e-9935-4eda-9c6e-93544d5dc56c',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '447df28e-9935-4eda-9c6e-93544d5dc56c',
        role_id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
      },
      {
        user_id: '9d8012fd-960c-42a5-8276-8ebbb8a9d3e7',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '9d8012fd-960c-42a5-8276-8ebbb8a9d3e7',
        role_id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
      },
      {
        user_id: '5b8a89f6-9f66-48da-865c-d8a20098fa67',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '5b8a89f6-9f66-48da-865c-d8a20098fa67',
        role_id: '695d7d66-135d-437b-b0d8-7fe37e831136',
      },
      {
        user_id: '3822822f-f910-41fd-8821-5754f2a1d150',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '3822822f-f910-41fd-8821-5754f2a1d150',
        role_id: '695d7d66-135d-437b-b0d8-7fe37e831136',
      },
      {
        user_id: 'a976deae-5e2a-47a2-931d-fdcad47252cc',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: 'a976deae-5e2a-47a2-931d-fdcad47252cc',
        role_id: '695d7d66-135d-437b-b0d8-7fe37e831136',
      },
      {
        user_id: 'f221a35e-df27-49b4-b717-69c26defc700',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: 'f221a35e-df27-49b4-b717-69c26defc700',
        role_id: '695d7d66-135d-437b-b0d8-7fe37e831136',
      },
      {
        user_id: '86384563-4a56-48b5-b6c1-bc1be2261fe8',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '86384563-4a56-48b5-b6c1-bc1be2261fe8',
        role_id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
      },
      {
        user_id: 'f98ca513-ee05-4672-946e-f046c3ce521c',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: 'f98ca513-ee05-4672-946e-f046c3ce521c',
        role_id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
      },
      {
        user_id: '525542fa-a1bc-466b-873f-caf9d24cca48',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '525542fa-a1bc-466b-873f-caf9d24cca48',
        role_id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
      },
      {
        user_id: '806b78db-4d9e-4dcd-b2ce-533eb41fef81',
        role_id: 'a9712cfd-f4db-4df0-ad88-06198e4c49d2',
      },
      {
        user_id: '806b78db-4d9e-4dcd-b2ce-533eb41fef81',
        role_id: 'a784ef06-781a-4ea2-9323-eb77a543293a',
      },
    ]);
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('user_roles', null, {});
  },
};
