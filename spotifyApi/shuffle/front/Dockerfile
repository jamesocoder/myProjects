# syntax=docker/dockerfile:1
# check=error=true
#######################################################
# The parser directives above cause the Docker build process to fail when encountering a warning, rather
# than ignoring them as it does by default.  To disable them, move this comment block above them
# (directives are ignored if placed after anything other than another directive).
# Source: https://docs.docker.com/reference/dockerfile/#check
#######################################################

# builder
# Solely for housing the tools necessary to build the project
# alpine is a barebones version of linux suitable for deployments that would appreciate a smaller image size
# It comes with the alternative to npm, yarn, already installed
# Source:
#  - https://github.com/nodejs/docker-node?tab=readme-ov-file#nodealpine
#  - https://github.com/nodejs/docker-node/blob/main/docs/BestPractices.md
FROM node:alpine AS builder
WORKDIR /src
COPY package.json .
RUN yarn install
COPY . .
# Type check with tsc, then build with vite (as defined in package.json.scripts)
#RUN yarn tsc && yarn build
RUN yarn build

# front
# Houses only the result of the build and the package needed to host it
FROM node:alpine AS front
RUN yarn global add http-server
WORKDIR /front
COPY --from=builder /src/build .
CMD ["http-server"]