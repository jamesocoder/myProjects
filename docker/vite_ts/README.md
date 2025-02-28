# Practice using Docker and Vite together

There aren't many tutorials out there explaining how Docker and Vite interact with each other when it comes to passing environment variables throughout the build and deployment process.

Vite doesn't seem to play well with this project's chosen environment (Node version, Docker base image, etc.) out of the box.  It can build just fine from within a container, but using any other command results in an error because Vite is restricted from accessing various packages in node_modules.

## Branch Goals

- [x] Add compose watch demonstration
- [ ] Add secrets file access from the container
    - This does not seem possible.  Browser clients aren't allowed to read any files that aren't directly served to them, so Node's `fs` library is only for backend applications, not browser applications.  A secret file mounted to a container by Docker can't be read by any code executed by a browser.
    - Next possible step forward is to create a backend container, mount the secrets there instead, serve it to the frontend container, then display it on the frontend.

## Backend WIP

I've successfully created the backend, hosted it on a container, and polled it for a response.  The frontend is not yet coded to ping the backend though.  We have to do it manually for now. 

A major plugin for this project, [vite-plugin-node](https://github.com/axe-me/vite-plugin-node), hasn't been able to keep up with the latest web dev tooling updates.  It is flagged by tsc's type checking.  Vite 6 is mostly backwards compatible so we can still use it to build the project without issue if we skip tsc type checking.

![size comparison](./imgs/001.jpg)

Comparing image sizes in the above image, we can see that the base image, node:alpine, is very slim.  The production image of the frontend is only ~10mb larger.  The backend's production image is almost half a gb larger than the base image.  We only save ~50mb between the backend's development and production builds.

### How to test current backend container

**First**, build and start the container with either:
- `docker compose up dev-back -d`
    - Note that although the container's Vite instance will say it's listening on port 8080, you'll still need to send requests to the host's port 8081.
    - You can alter the backend's source code and Vite and Docker will dynamically rebuild and re-host the changes when using this command.
- `docker compose up prd-back -d`
    - This will host a build project using Node instead of Vite
    - The image size difference isn't very large because we still need to include run-time dependencies in the final image
    - Since the backend is so bloated, this may be a case for some developer's preference for golang or rust

**Then**, using something like `curl` in a shell or like Powershell, respectively:

```bash
curl \
  --url http://localhost:8081/secret \
  --request POST \
  --header 'Content-Type: application/json' \
  --data '{"name": "SECRET"}'
```

```powershell
$headers=@{}
$headers.Add("Content-Type", "application/json")
$response = Invoke-WebRequest `
    -Uri 'http://localhost:8081/secret' `
    -Method POST `
    -Headers $headers `
    -Body '{"name": "SECRET"}'
$response.Content
```

This will print "secretValue" to the terminal, which the backend reads from the secrets file mounted by Docker compose.  Note that the Powershell commands will create variables that will persist in the instance, `$headers` and `$response`.

## How to run

1. Install Docker
2. Clone repo and open its directory up in a terminal
3. Use a launch command:
    - To run in development mode with Watch and HMR functionality, use either:
        - `docker compose --profile dev up --watch`
        - `docker compose up dev-front --watch`
    - To serve a build version of the project using [http-server](https://github.com/http-party/http-server), use either:
        - `docker compose --profile prd up -d`
        - `docker compose up prd-front`
    - To use Vite locally without involving Docker, first use `yarn install` then either:
        - `yarn dev`
        - `yarn build` then `yarn preview` 
4. Navigate to `localhost:8080` in a browser to see the page served by the container
5. In the browser's developer console, you'll see an Object output showing what environment variables Vite has injected into the app
6. Stop and clean out the project's files with `docker compose <profile or service> down --rmi all`

## Vite troubles and their fixes

`yarn dev` and `yarn preview` only work with a specific host value, `0.0.0.0`, in our chosen container environment (`node:alpine`).  It does not work with `localhost` as its value.  It could be because of the way recent versions of Node resolve domain names (see [vite.config server.host documentation](https://vite.dev/config/server-options.html#server-host)).

The port values of either the host or the container can seemingly be changed to any non-reserved port at will.  They don't have to match, but I match them in this project for convenience.

I've solved the issue of Vite not having enough permissions to launch itself in the container by changing the file permissions of it and all of its dependencies. (See the [Dockerfile](./front/Dockerfile)'s first `COPY` and `RUN` statements in its `dev-stage`).

## Selectively running services from a Docker compose.yaml file

Specifically named services can be run with a `docker compose <service-name>` command.

This project demonstrates how to define "profile" tags to operate a select group of services according to the given profile.

## Understanding how environment variables are injected

Docker is capable of injecting variable values at either build time or run time and when using Vite, it matters when it does so.  Vite hard-codes any `import.meta.env...` references we have in our code using the values we provide at *build* time.

With Docker, we can only supply build-time values from within Dockerfiles.  We can get away with storing our values in a compose.yaml file if we [call for ARGs in our Dockerfile](./front/Dockerfile) and [provide them within a compose service's `build` element](./compose.yaml).

Run-time environment variables don't seem to be accessible by Node apps, so a compose service's environment attribute is useless for this context.  This is different behavior from [docker/secrets's](../secrets/) demo, notably because it uses a Node *script* instead of an app.

## Multi-stage builds in Dockerfiles

This project also demos how we can create lean Docker images by separating a Node app's build tools from its final server image (showcased in the [Dockerfile](./front/Dockerfile)).  The only files the final server image needs are found in the `./dist` folder and a global installation of `http-server`.