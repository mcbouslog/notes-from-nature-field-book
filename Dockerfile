FROM node:8.11

RUN mkdir -p /usr/src
WORKDIR /usr/src/

COPY ./ .
RUN chown -R node:node .

USER node

RUN npm install

EXPOSE 3000

CMD ["npm", "start"]