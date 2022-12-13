FROM node:alpine
COPY . /register-positive-server
WORKDIR /register-positive-server
CMD npm run start:register
EXPOSE 3004
