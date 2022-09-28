FROM node:16-alpine

ENV PORT=3000

RUN mkdir app
WORKDIR /app
COPY package.json /app/package.json
COPY yarn.lock /app/yarn.lock
COPY tsconfig.json /app/tsconfig.json
COPY index.ts /app/index.ts
COPY ./dist /app/dist

RUN DOCKER_ENV=1 yarn install --frozen-lockfile --production

WORKDIR /app/dist
EXPOSE 3000

CMD [ "node", "index.js" ]