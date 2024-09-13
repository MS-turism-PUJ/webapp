FROM node:20.11.1-alpine3.18 as build

WORKDIR /usr/local/app

COPY ./package.json .
COPY ./package-lock.json .

RUN npm install

COPY . .

RUN npm run build --prod

FROM nginx:mainline-alpine3.18-perl

COPY --from=build /usr/local/app/dist/webapp/browser /usr/share/nginx/html

COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
