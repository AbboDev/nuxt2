# Dockerfile
FROM node:16.19-alpine3.16

# create destination directory
RUN mkdir -p /var/www/nuxt-app
WORKDIR /var/www/nuxt-app

# update and install dependency
RUN apk update && apk upgrade
RUN apk add git

# copy the app, note .dockerignore
COPY . /var/www/nuxt-app/
RUN cat ./package.json
RUN npm install
# RUN npm run build

# EXPOSE 3000

# ENV NUXT_HOST=0.0.0.0
# ENV NUXT_PORT=3000

CMD [ "npm", "run dev" ]
