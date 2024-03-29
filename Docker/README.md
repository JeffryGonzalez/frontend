# Docker For Frontend

This is some information to help understand how the build of the docker image works, and how to build and run the frontend locally in Docker.

## The Files

```
~/Docker
    /Dockerfile
    /nginx.conf
    /README.md
~/.dockerignore
```

Other than the `.dockerignore` in the root, all the docker related stuff is in the `Docker` folder in the root of the project.

## The Dockerfile (`~/Docker/Dockerfile)

Dockerfiles by convention have the name `Dockerfile`. This is the "build" file for creating our docker image. It uses a multi-stage build, using two `FROM` statements. The first one uses a node alpine image. We build our frontend application in an image that has Nodejs installed, then then the "deliverable" image is an Nginx image that will work as the web server for our application.

The Dockerfile is annotated with comments to explain the process.

The multi-stage build thing is important here because:

- We neither need nor want nodejs in our production container. Angular does not need node to run. It just uses it to build (create our build artifacts). Those artifacts are in the `/dist`directory.

- we copy those into the folder that nginx stores its resources.

For a more thorough explanation of this, including the nginx configuration, see [Building Angular Apps for Docker](https://hypertheory.training/topics/angular/angular-docker)

## The Docker Ignore file (`~/.dockerignore`)

Make sure _at least_ the `node_modules` folder is in here - we don't want to copy the node modules folder in before we run `npm ci`.

## Testing the Docker Build and Running the Image Locally.

The build for this will happen in our Actions pipeline, but you can (and should) build locally and test it out from time to time.

Steps:

### Build the Container Image

I'm assuming you have Docker desktop (or whatever dockering thing you like to use) installed and running.

In the root folder where you cloned the frontend repository (the folder _above_ the `Docker` folder), run the following:

```shell
docker build -f ./Docker/Dockerfile -t frontend:v1 .
```

The `-f` flag tells Docker where to find the Dockerfile (it looks in the current directory by default). the `-t` is what you want to 'tag' the image as. This isn't too important, as you aren't publishing it, but remember what you tagged it as. The `.` (periodt) at the end is important. That's the elusive 'context' argument and is required.

> Note: fun fact. the `.` context argument is really designed to just humiliate people that forget it. A sort of warning saying "are you really sure you chose the right career field?

After it is built, you can run the following command and should see it in your list of images:

```shell
docker images
```

### Run the Image

To run the image, you will use the following command:

```shell
docker run -d -p 8080:80  frontend:v2
```

The command is `docker run`.

The `-d` flag means run it in "detatched" mode. That _used_ be called _daemon_ mode, but I think the idea of daemons running on your machine scared some sensitive souls. Basically, it means "Just start this in the background and give me my shell back". If you want to see what it does, run it again later and leave it off. WHO IS THE REAL DAEMON HERE? GIVE ME MY COMMAND PROMPT BACK YOU MONSTER!

The `-p 8080:80` is an argument that says "Ok, this thing thinks it is `EXPOSE`d on TCP Port 80. (Check the Dockerfile). That's cool, but I want it to appear on port 8080 on my machine (make it whatever you want. 1337 is always a good choice because of _1337ness_).

And then finally `frontend:v2` is the image you built above. If you got creative with the name, change it here.

Open your browsah of choice and go to `http://localhost:8080` (or whatever port you mapped it to) and see all the glory.

### Shutting it Down

After you are done checking it out, you can kill it. Either use the Docker VS Code Extension, or for a more 'Neo hacking the Matrix' vibe, run this:

```shell
docker ps
```

(`ps` is a linux command for seeing running processes.)

It will list out all your running docker containers. Since we didn't assign it a name when we started it, it gives you a autogenerated name. You'll need this name. If it is a good one, consider adopting it as your new hacker name.

My output looks something like this:

```shell
> docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS         PORTS                  NAMES
84021c6cefad   frontend:v2   "/docker-entrypoint.…"   6 seconds ago   Up 5 seconds   0.0.0.0:8080->80/tcp   friendly_yalow
```

Use the following command to stop it:

```shell
docker stop friendly_yalow
```

If you run the `docker ps` command again, it will show this:

```shell
> docker ps
CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS         PORTS                  NAMES
```

Indicating no _running_ containers.

But if you run this (notice the `-a` flag), you will see it is just "exited" (stopped).

```shell
docker ps -a
CONTAINER ID   IMAGE         COMMAND                  CREATED         STATUS                     PORTS     NAMES
84021c6cefad   frontend:v2   "/docker-entrypoint.…"   3 minutes ago   Exited (0) 9 seconds ago             friendly_yalow
```

You could start it again with

```shell
docker start friendly_yallow
```

And it will come back to life.

You can remove the container image with

```shell
docker rm friendly_yallo
```

> Note: You don't have to stop it to remove it. You are NEO! You can just remove it when you are done.

The container image is gone, but the "image" is still on your machine, using up hard drive space, all that. If you run `docker images` again, you will see it there.

If you want to remove that, too, run:

```shell

docker rmi frontend:v2
```

## Final Notes

If you want any clarification on this, or more details, or whatever, send an issue.
