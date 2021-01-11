# instagramania

Link live [instagramania](https://instagramania-c6447.web.app/)



TODO: verify that the following info is correct:

 - Python:  3.8
 - DB:      MySQL or sqlite
 - Node:    12
 - React:   16.8+

## Setting up development

### Installing Docker and Docker Compose

Refer to original [Docker documentation](https://docs.docker.com/engine/installation/) for installing Docker.

After installing Docker you need to install [Docker Compose](https://docs.docker.com/compose/install/) to run
 multi-container Docker applications (such as ours). The `curl` method is preferred for installation.

To run Docker commands without `sudo`, you also need to
[create a Docker group and add your user to it](https://docs.docker.com/engine/installation/linux/ubuntulinux/#/create-a-docker-group).

## Running development server (Backend)

Both docker and docker-compose are used to run this project, so the run command is quite straightforward.

    docker-compose up

This builds, (re)creates and starts containers for Django and MYSQL. Refer to `docker-compose.yml` for
more insight. Django app is running on `3000` port. 

## Running development server (Backend)

Just use npm start and the Front-end server wull be running on `8000` port.


