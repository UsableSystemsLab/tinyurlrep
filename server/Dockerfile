FROM node:19.4.0-alpine3.17
WORKDIR /app
COPY . .
RUN npm install
EXPOSE 8080
CMD [ "node", "server.js" ]
