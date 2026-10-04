FROM node:26-alpine AS build
WORKDIR /app
RUN npm install -g pnpm@12.9.1
COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN pnpm install --frozen-lockfile
COPY . .
RUN pnpm run build

FROM ghcr.io/static-web-server/static-web-server:2 AS sws

FROM gcr.io/distroless/static-debian13:nonroot
COPY --from=sws /static-web-server /static-web-server
COPY --from=build /app/dist /public
ENV SERVER_ROOT=/public SERVER_PORT=8080 SERVER_COMPRESSION=true SERVER_HEALTH=true
EXPOSE 8080
USER nonroot
ENTRYPOINT ["/static-web-server"]
