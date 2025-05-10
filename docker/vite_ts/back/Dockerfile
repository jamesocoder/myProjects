# syntax=docker/dockerfile:1
# check=error=true

FROM node:alpine AS dev-stage
USER node
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
# Inject build-time environment variable values given as arguments
# These values will persist in all child stages
ARG VITE_HOST
ENV VITE_HOST=${VITE_HOST}
ARG VITE_PORT
ENV VITE_PORT=${VITE_PORT}
ARG VITE_FRONTEND
ENV VITE_FRONTEND=${VITE_FRONTEND}

FROM dev-stage AS builder
USER node
WORKDIR /app
# Cause leaner production behaviors from the build tools
ENV NODE_ENV=production
RUN yarn build

FROM node:alpine AS server
USER node
WORKDIR /app
COPY --from=builder /app/dist /app/package.json /app/
RUN yarn install --production=true

FROM server AS server-hc
USER node
# Add program needed for healthchecks
RUN apk add curl
WORKDIR /app