# Dockerfile
FROM node:16.19-alpine3.16

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
COPY package*.json ./
RUN npm install

COPY . .
RUN npm run build

EXPOSE $PORT

ENV PROXY_API=$PROXY_API

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$PORT

CMD [ "npm", "start" ]
