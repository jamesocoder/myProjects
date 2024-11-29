# Practice using Docker compose secrets

Many starter tutorials in Docker have no problem showing us how to inject environment variables into our Docker apps.  It's really easy to do.  They also have no problem showing us how to mount secrets.  Very few actually show us how to read those secrets once they're mounted.  This project was made so that I can practice doing so.

## How to run

1. Install Docker Desktop
2. Clone this repo and open its directory up in a terminal
3. Use `docker compose watch` to start the project
    - The "secrets" will be printed to the terminal and the container will be running
    - You can inspect the running container in Docker Desktop
    - You can also run commands from the container's Exec tab
    - Changes to [demo.js](./demo.js) will be synced to the container thanks to compose watch
4. Use `docker compose down --rmi all` to stop and remove the project's components

## Lessons learned

* `compose.yaml.services.service.build.dockerfile_inline: | ...` can completely replace a simple Dockerfile.
    - Could merit more investigation to see how far it can be taken.  Does it support multi-stage builds?
    - Entirely removing Dockerfiles from a project may antithetical to Docker's philosophy since we are moving the basis of a unit (a container) out of itself and into a central compose file.
* Secrets are placed in `root/run/secrets/`, not `WORKDIR/run/secrets/`
    - This means that when running a program out of a non-root working directory, secrets need to be accessed by navigating to the root directory first by default: `../run/secrets/`
    - Access to secrets can be made easier by changing where the service targets them: `compose.yaml.services.service.secrets.target: "WORKDIR/secrets/secret"`
* The Dockerfile command `COPY . .` does not ignore Docker's files by default.
    - It should be safe to ignore Dockerfile, compose.yaml, and .dockerignore since a container does not need these to run.
    - Secret source files should not be copied over either
* You can view the results of each build step in the terminal by using `docker compose build --progress=plain --no-cache`
    - You'll be able to see the speed of each step and also the output of the 4th layer's command (`RUN ls`)
    - This adapts [this stackoverflow answer](https://stackoverflow.com/a/64805337/13084818) to compose by combining flags from the [base compose command](https://docs.docker.com/reference/cli/docker/compose/) and [compose's build command](https://docs.docker.com/reference/cli/docker/compose/build/)