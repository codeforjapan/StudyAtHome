FROM node:12.22.6-alpine

ENV HOST 0.0.0.0

RUN mkdir -p /app
COPY . /app
WORKDIR /app

ARG ENV
ARG APIKEY
ARG AUTHDOMAIN
ARG DATABASEURL
ARG PROJECTID
ARG STORAGEBUCKET
ARG MESSAGINGSENDERID
ARG APPID
ARG MEASUREMENTID

ENV APIKEY $APIKEY
ENV AUTHDOMAIN $AUTHDOMAIN
ENV DATABASEURL $DATABASEURL
ENV PROJECTID $PROJECTID
ENV STORAGEBUCKET $STORAGEBUCKET
ENV MESSAGINGSENDERID $MESSAGINGSENDERID
ENV APPID $APPID
ENV MEASUREMENTID $MEASUREMENTID
ENV ENV $ENV
ENV HOST 0.0.0.0
ENV PORT 3000

RUN yarn && yarn build

EXPOSE 3000

CMD ["yarn", "start"]
