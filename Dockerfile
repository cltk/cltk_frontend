FROM node:8.2.1

RUN mkdir /app
COPY . /app/.
WORKDIR /app
RUN rm -rf node_modules
RUN rm -rf client/node_modules
RUN yarn install

CMD ["yarn", "start"]
