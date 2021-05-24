FROM node

WORKDIR /backend-test

COPY package*.json .

RUN npm install

COPY . .

EXPOSE 3001

# CMD [ "npm", "start" ]

CMD /wait-for-it.sh db:3306 -- npm start

