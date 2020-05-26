FROM node:12-alpine AS BUILDER
ARG REACT_APP_API_URL
WORKDIR /app
COPY package.json yarn.lock ./
RUN yarn install --frozen-lockfile
COPY . ./
RUN yarn run build && mkdir -p /var/www && mv build /var/www/app

FROM nginx:alpine
COPY --from=BUILDER /var/www /var/www
COPY ./nginx.conf /etc/nginx/nginx.conf
