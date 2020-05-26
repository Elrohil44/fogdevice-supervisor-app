#!/bin/bash

set -e

VERSION=`yarn -s echo-version`

echo "$DOCKER_PASSWORD" | docker login -u "$DOCKER_USERNAME" --password-stdin

docker push elrohil/fogdevice-supervisor-app:latest
docker push elrohil/fogdevice-supervisor-app:${VERSION}
