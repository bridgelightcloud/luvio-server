FROM node:lts-alpine
EXPOSE 80
ENV PORT=80
COPY .npmrc /root/
WORKDIR /app
ADD package.json /app/
RUN npm --quiet install
COPY . /app
CMD [ "server.js" ]