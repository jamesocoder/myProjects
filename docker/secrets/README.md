# Practice using Docker secrets

Many starter tutorials in Docker have no problem showing us how to inject environment variables into our Docker apps.  It's really easy to do.  They also have no problem showing us how to mount secrets.  Very few actually show us how to read those secrets once they're mounted.  This project was made so that I can practice doing so.

## How to run

1. Install Docker Desktop
2. Clone this repo and open its directory up in a terminal
3. Use `docker compose up` to start the project
    - The "secrets" will be printed to the terminal and the container will be running
    - You can inspect the running container in Docker Desktop
    - You can also run commands from the container's Exec tab
4. Use `docker compose down --rmi all` to stop and remove the project

## Lessons learned