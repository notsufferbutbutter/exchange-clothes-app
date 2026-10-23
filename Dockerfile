FROM node:22-alpine AS build

WORKDIR /app

RUN npm install --global pnpm@10.20.0

COPY package.json pnpm-lock.yaml ./
RUN pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

FROM nginx:alpine

ENV PORT=8080

COPY --from=build /app/dist/analog/public /usr/share/nginx/html

COPY default.conf.template /etc/nginx/templates/default.conf.template

EXPOSE 8080
