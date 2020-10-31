FROM node:12.18.2

WORKDIR /usr/src/app

COPY . .

RUN yarn install

EXPOSE 3333

CMD ["yarn", "start"]