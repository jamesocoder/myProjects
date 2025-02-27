# Practice using Docker and Vite together

There aren't many tutorials out there explaining how Docker and Vite interact with each other when it comes to passing environment variables throughout the build and deployment process.

Vite doesn't seem to play well with this project's chosen environment (Node version, Docker base image, etc.) out of the box.  It can build just fine from within a container, but using any other command results in an error because Vite is restricted from accessing various packages in node_modules.

## Branch Goals

- [x] Add compose watch demonstration
- [ ] Add secrets file access from the container

## How to run

1. Install Docker
2. Clone repo and open its directory up in a terminal
3. Use a launch command:
    - To run in development mode with Watch and HMR functionality, use either:
        - `docker compose --profile dev up --watch`
        - `docker compose up development --watch`
    - To serve a build version of the project using [http-server](https://github.com/http-party/http-server), use either:
        - `docker compose --profile prod up -d`
        - `docker compose up production`
    - To use Vite locally without involving Docker, first use `yarn install` then either:
        - `yarn dev`
        - `yarn build` then `yarn preview` 
4. Navigate to `localhost:8080` in a browser to see the page served by the container
5. In the browser's developer console, you'll see an Object output showing what environment variables Vite has injected into the app
6. Stop and clean out the project's files with `docker compose <profile or service> down --rmi all`

## Vite troubles and their fixes

`yarn dev` and `yarn preview` only work with a specific host value, `0.0.0.0`, in our chosen container environment (`node:alpine`).  It does not work with `localhost` as its value.  It could be because of the way recent versions of Node resolve domain names (see [vite.config server.host documentation](https://vite.dev/config/server-options.html#server-host)).

The port values of either the host or the container can seemingly be changed to any non-reserved port at will.  They don't have to match, but I match them in this project for convenience.

I've solved the issue of Vite not having enough permissions to launch itself in the container by changing the file permissions of it and all of its dependencies. (See the [Dockerfile](./Dockerfile)'s first `COPY` and `RUN` statements in its `dev-stage`).

## Selectively running services from a Docker compose.yaml file

Specifically named services can be run with a `docker compose <service-name>` command.

This project demonstrates how to define "profile" tags to operate a select group of services according to the given profile.

## Understanding how environment variables are injected

Docker is capable of injecting variable values at either build time or run time and when using Vite, it matters when it does so.  Vite hard-codes any `import.meta.env...` references we have in our code using the values we provide at *build* time.

With Docker, we can only supply build-time values from within Dockerfiles.  We can get away with storing our values in a compose.yaml file if we [call for ARGs in our Dockerfile](./Dockerfile) and [provide them within a compose service's `build` element](./compose.yaml).

Run-time environment variables don't seem to be accessible by Node apps, so a compose service's environment attribute is useless for this context.  This is different behavior from [docker/secrets's](../secrets/) demo, notably because it uses a Node *script* instead of an app.

## Multi-stage builds in Dockerfiles

This project also demos how we can create lean Docker images by separating a Node app's build tools from its final server image (showcased in the [Dockerfile](./Dockerfile)).  The only files the final server image needs are found in the `./dist` folder and a global installation of `http-server`.