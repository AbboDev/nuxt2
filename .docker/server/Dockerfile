# Dockerfile
FROM node:16.19-alpine3.16

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# create destination directory
RUN mkdir -p /app
WORKDIR /app

# copy the app, note .dockerignore
RUN npm install json-server -D

COPY server ./server

# EXPOSE 3030

CMD [ "npx", "json-server", "--port", "3030", "--watch", "./server/db.json", "--host", "0.0.0.0" ]
