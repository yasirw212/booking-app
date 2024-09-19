FROM node:18-alpine

WORKDIR /booking-app-client

COPY package.json .

COPY . .

RUN npm install

EXPOSE 8080

<<<<<<< auth
ENTRYPOINT [ "npm", "run", "dev" ]
=======
ENTRYPOINT ["npm", "run", "dev"]
>>>>>>> main
