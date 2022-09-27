FROM node:14-alpine

RUN yarn global add nodemon

COPY package.json /usr/local/bin/service/
COPY yarn.lock /usr/local/bin/service/
WORKDIR /usr/local/bin/service/
RUN DOCKER_ENV=1 yarn install --frozen-lockfile --production
COPY dist /usr/local/bin/service/dist/
WORKDIR /usr/local/bin/service/dist
EXPOSE 3000

CMD [ "nodemon", "-L", "index.js" ]