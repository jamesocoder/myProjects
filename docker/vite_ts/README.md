# Practice using Docker and Vite together

There aren't many tutorials out there explaining how Docker and Vite interact with each other when it comes to passing environment variables throughout the build and deployment process.

Vite doesn't seem to play well with Docker containers.  It can build just fine from within a container, but using any other command results in an error because Vite is restricted from accessing the vite.config.ts file.

This means we can't use `vite` for Hot Module Replacement (HMR) when trying to develop with a container; we'd have to look into using Docker compose's watch feature instead.

We also can't use `vite preview` to serve built projects either.  We have to rely on [http-server](https://github.com/http-party/http-server) instead.

## Branch Goals

- Add compose watch demonstration
- Add secrets file access from the container

## How to run

1. Install Docker
2. Clone repo and open its directory up in a terminal
3. Use `docker compose --profile prod up -d`
4. Navigate to `localhost:8080` in a browser to see the page served by the container
5. In the browser's developer console, you'll see an Object output showing what environment variables Vite has injected into the app
6. Stop and clean out the project's files with `docker compose --profile prod down --rmi all`

## Troubles with Vite and next steps

`yarn dev` still does not work in our chosen linux container.

I've solved the issue of Vite not having enough permissions to launch itself in the container by changing the file permissions of it and all of its dependencies. (See the [Dockerfile](./Dockerfile)'s first `COPY` and `RUN` statements in its `dev-stage`).

Now, the issue is Vite is not serving up anything.  Docker compose's `watch` function is working for `--profile vite-dev`, syncing source file changes to the container, but Vite's HMR is not working and serving.

A working `compose watch` demonstration was created during the development of this commit, but it involved the entire Dockerfile build -- not just the `dev-stage`.  Compose watch was capable of syncing source file changes and triggering a rebuild of the project for the server stage to serve.  While functional, this was missing the point of having Vite in the first place: quick HMR without needing to rebuild the entire project after every change.

Docker's demo getting-started-todo-app uses the bulkier `node:20` image as its base.  It might be worth trying Vite with this image instead.  `node:alpine` might be missing some key linux component or have some setting configured wrong.

## Selectively running services from a Docker compose.yaml file

Individual services can be run with a `docker compose <service-name>` command.

This project demonstrates how to define "profile" tags to operate a select group of services according to the given profile.

## Understanding how environment variables are injected

Docker is capable of injecting variable values at either build time or run time and when using Vite, it matters when it does so.  Vite hard-codes any `import.meta.env...` references we have in our code using the values we provide at *build* time.

With Docker, we can only supply build-time values from within Dockerfiles.  We can get away with storing our values in a compose.yaml file if we [call for ARGs in our Dockerfile](./Dockerfile) and [provide them within a compose service's `build` element](./compose.yaml).

Run-time environment variables don't seem to be accessible by Node apps at all, so a compose service's environment element is useless for this context.  This is different behavior from [docker/secrets's](../secrets/) demo, notably because it uses a Node *script* instead of an app.

## Multi-stage builds in Dockerfiles

This project also demos how we can create lean Docker images by separating a Node app's build tools from its final server image (showcased in the [Dockerfile](./Dockerfile)).  The only files the final server image needs are found in the `./dist` folder and a global installation of `http-server`.