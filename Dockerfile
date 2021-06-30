FROM node:14.16.1

COPY . .

RUN npm install

CMD [ "npm", "start" ]

