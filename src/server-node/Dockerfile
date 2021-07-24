FROM node:16

RUN mkdir -p /app
WORKDIR /app

# add the local node set of bins to the path
ENV PATH /app/node_modules/.bin/:$PATH

COPY package.json ./
COPY package-lock.json ./

RUN npm install

COPY . ./

RUN npm run typeorm schema:sync

CMD ["npm", "run", "start"]
