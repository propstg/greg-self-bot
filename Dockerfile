FROM node:10

ENV TOKEN INVALID

WORKDIR /usr/src/app

COPY . .

RUN npm install

CMD ["node", "main.js"]
