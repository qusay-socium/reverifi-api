#!/usr/bin/env bash

set -ev

BIN_ROOT=$(dirname $0)

$BIN_ROOT/wait-for-it.sh -s -t 15 $DB_HOST:$DB_PORT

node ./src/migrate.js up
npx sequelize-cli db:seed:all --debug

if [ "$NODE_ENV" = "development" ]; then
    npm run start-dev
else
    npm start
fi
