# node 무난한 lts버전에서 시작
# alpine은 경량 리눅스 os라고 함
# see https://hub.docker.com/_/node
FROM node:lts-alpine

WORKDIR /frontend
COPY . /frontend

ARG API_URL
ENV REACT_APP_HOST_IP_ADDRESS $API_URL

RUN npm install && npm run build