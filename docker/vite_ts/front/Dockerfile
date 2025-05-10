# syntax=docker/dockerfile:1
# check=error=true
#######################################################
# The parser directives above cause the Docker build process to fail when
# encountering a warning, rather than ignoring them as it does by default.
# To disable them, move this comment block above them (directives are
# ignored if placed after anything other than another directive).
# Source: https://docs.docker.com/reference/dockerfile/#check
#######################################################

# alpine is a barebones version of linux suitable for deployments that would
# appreciate a smaller image size.  It comes with the alternative to npm, yarn,
# already installed
# Source:
#  - https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine
#  - https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
FROM node:alpine AS dev-stage
# Node's image maintainers advise using this pre-made user instead of the
# default root user for security
USER node
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
#RUN apk add curl # Uncomment to enable curl requests from frontend dev container
# Inject build-time environment variable values given as arguments
# These values will persist in all child stages
ARG VITE_HOST
ENV VITE_HOST=${VITE_HOST}
ARG VITE_PORT
ENV VITE_PORT=${VITE_PORT}
ARG VITE_BACKEND
ENV VITE_BACKEND=${VITE_BACKEND}

FROM dev-stage AS builder
USER node
WORKDIR /app
# Cause leaner production behaviors from the build tools
ENV NODE_ENV=production
RUN yarn build

# Final stage prepares a global installation of http-server, then
# copies only the minimized app files from the build stage to a
# clean image for a lean final deployment image.
FROM node:alpine AS server
RUN yarn global add http-server
USER node
WORKDIR /app
COPY --from=builder /app/dist .