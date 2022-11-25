FROM node:18.3.0-alpine3.14

WORKDIR /backend

COPY package*.json ./

RUN yarn install

COPY . .

CMD ["yarn", "start"]
