FROM node:12.18.2

WORKDIR /usr/src/app

RUN npm install -g --unsafe-perm serverless@2.8.0

COPY . .

RUN yarn install

EXPOSE 4000

CMD ["yarn", "start"]