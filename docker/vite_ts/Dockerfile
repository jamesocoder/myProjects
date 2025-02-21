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
FROM node:alpine AS builder
WORKDIR /app
COPY package.json .
RUN yarn install
COPY . .
# Cause leaner production behaviors from the build tools
ENV NODE_ENV=production
# Inject build-time environment variable values given as arguments
ARG VITE_HOST
ENV VITE_HOST=${VITE_HOST}
ARG VITE_PORT
ENV VITE_PORT=${VITE_PORT}
RUN yarn build

# Final stage prepares a global installation of http-server, then
# copies only the minimized app files from the build stage to a
# clean image for a lean final deployment image.
FROM node:alpine AS server
WORKDIR /app
RUN yarn global add http-server
COPY --from=builder /app/dist .