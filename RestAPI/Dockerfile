FROM node:16.15.1

RUN mkdir src
WORKDIR /src
COPY package.json /src/package.json
COPY ./dist /src/dist
RUN yarn install

EXPOSE 3000

CMD [ "node", "/src/dist/index.js" ]