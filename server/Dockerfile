FROM node:18-alpine

WORKDIR /booking-app-server

COPY  package.json .

COPY . .

RUN "npm install"

EXPOSE 7000

ENTRYPOINT [ "npm", "run", "dev" ]