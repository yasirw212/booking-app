FROM node:18-alpine

WORKDIR /booking-app-client

COPY package.json .

COPY . .

RUN npm install

ENTRYPOINT [ "npm", "run", "dev" ]