#!/bin/bash

set -e

VERSION=`yarn -s echo-version`

TAG=latest
API_URL=http://localhost:5001

if [ "$1" = "production" ]; then
    TAG=production
    API_URL=http://52.233.249.15:5001
fi

docker build \
  --build-arg="REACT_APP_API_URL=${API_URL}" \
  -t elrohil/fogdevice-supervisor-app:${TAG} \
  -t elrohil/fogdevice-supervisor-app:${VERSION} ./
