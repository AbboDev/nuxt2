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
# RUN npm run build

COPY src ./src
COPY test ./test
COPY types ./types

COPY .babelrc ./
COPY .editorconfig ./
COPY .eslintrc.js ./
COPY .prettierignore ./
COPY .prettierrc ./
COPY jest.config.js ./
COPY nuxt.config.js ./
COPY stylelint.config.js ./
COPY tsconfig.json ./

EXPOSE $PORT

ENV PROXY_API=$PROXY_API

ENV NUXT_HOST=0.0.0.0
ENV NUXT_PORT=$PORT

CMD [ "npm", "run", "dev" ]
