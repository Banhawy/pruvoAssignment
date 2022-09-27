FROM node:14-alpine

RUN npm i -g @nestjs/cli

RUN mkdir -p /usr/local/bin
WORKDIR /usr/local/bin/ConversionRateService/
EXPOSE 4000

CMD [ "yarn", "run", "start:dev" ]