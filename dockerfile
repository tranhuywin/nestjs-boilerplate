FROM node:18.16.0-alpine

WORKDIR /server/

COPY package.json yarn.lock /server/

RUN yarn install

COPY . /server

RUN yarn build

CMD ["yarn", "start"]
