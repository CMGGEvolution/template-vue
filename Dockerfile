FROM node:lts-alpine

# installe un simple serveur http pour servir un contenu statique
RUN npm install -g http-server

# make the 'app' folder the current working directory
WORKDIR /app

# copy 'package.json' to install dependencies
COPY package*.json ./
# install dependencies
RUN npm ci
# copy files and folders to the current working directory (i.e. 'app' folder)
COPY . .
# build app for production with minification


RUN npm run generate

RUN npm run build
EXPOSE 8080
ENTRYPOINT http-server dist