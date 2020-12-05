FROM node:12.18.2

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 5000

CMD ["yarn", "start"]