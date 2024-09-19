FROM node:18-alpine

WORKDIR /booking-app-client

COPY package.json .

COPY . .

RUN npm install

EXPOSE 8080

ENTRYPOINT [ "npm", "run", "dev" ]