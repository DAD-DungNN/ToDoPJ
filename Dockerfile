FROM --platform=linux/amd64 node:16.17.1-alpine3.15

COPY yarn.lock .
COPY package.json .

RUN yarn config set network-timeout 600000 -g
RUN yarn

COPY ./ ./

RUN yarn build:admin
CMD yarn start:admin

EXPOSE 3001
