# Start with a base image to do your build that is as close to what you are using locally as possible.
# I am using node 14.16, so I'm going to use that image here.
FROM node:14.16-alpine AS build
WORKDIR /dist/src/app


COPY package*.json ./
## We copy these into the 'build' image first (COPY creates an image layer). and then install the dependencies
## npm ci is the same as npm install, except it will follow strictly the dependencies in the package-lock.json. It's also a bit faster (largely because of that).
RUN npm ci
## Create another layer with COPY that includes all our stuff.  The idea is that your code/config is going to change at a higher rate than your dependencies.
## This will honor the .gitignore file
COPY . .
RUN npm run build

## This will be the "final (real)" image. I'm using nginx:latest -
FROM nginx:latest AS ngi
## This is the output from the build above
COPY --from=build /dist/src/app/dist/apps/frontend /usr/share/nginx/html
COPY /Docker/nginx.conf  /etc/nginx/conf.d/default.conf
# Exposing a port, here it means that inside the container
# the app will be using Port 80 while running
EXPOSE 80
