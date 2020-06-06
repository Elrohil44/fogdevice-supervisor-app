#!/bin/bash

set -e

VERSION=`yarn -s echo-version`

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

if [ "$1" = "production" ]; then
    docker push elrohil/fogdevice-supervisor-app:production
else
    docker push elrohil/fogdevice-supervisor-app:latest
    docker push elrohil/fogdevice-supervisor-app:${VERSION}
fi

