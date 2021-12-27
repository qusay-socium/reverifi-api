FROM node:14.3.0-alpine

ENV NODE_PATH=./src

RUN apk add -U bash

COPY package-lock.json package.json /app/

WORKDIR /app
COPY . /app/

RUN npm ci

EXPOSE 3000

CMD ["bin/boot.sh"]
