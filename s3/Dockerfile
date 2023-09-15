FROM node:14
WORKDIR /usr/src/app
COPY package.json yarn.lock ./
RUN npm install
RUN yarn install
COPY . .
EXPOSE 8083
CMD ["node", "app.js"]