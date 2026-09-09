FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

RUN cd client && npm install && npm run build

WORKDIR /app/server

EXPOSE 5000

CMD ["npm", "start"]
