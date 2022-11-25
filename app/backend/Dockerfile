FROM node:18.3.0-alpine3.14

WORKDIR /backend

COPY package*.json ./

COPY yarn.lock ./

RUN yarn

COPY . .

CMD ["yarn", "start"]
