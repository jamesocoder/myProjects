# syntax=docker/dockerfile:1
# check=error=true

FROM node:alpine AS dev-stage
WORKDIR /app
COPY vite.json .
RUN mv vite.json package.json && \
    yarn install --no-lockfile && \
    rm package.json && \
    chmod -R 777 ./node_modules
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
WORKDIR /app
# Cause leaner production behaviors from the build tools
ENV NODE_ENV=production
RUN yarn build
# For some reason "vite preview" requires even more dependency file
# permissions than the ones given when installing Vite in the dev-stage.
# The following RUN command gives blanket permissions to cover whatever
# this extra dependency is but greatly slows down the build process.
#RUN chmod -R 777 ./node_modules

# Final stage prepares a global installation of http-server, then
# copies only the minimized app files from the build stage to a
# clean image for a lean final deployment image.
FROM node:alpine AS server
WORKDIR /app
RUN yarn global add http-server
COPY --from=builder /app/dist .