#!/bin/bash

set -e

VERSION=`yarn -s echo-version`

docker build \
  --build-arg="REACT_APP_API_URL=http://localhost:5001" \
  -t elrohil/fogdevice-supervisor-app:latest \
  -t elrohil/fogdevice-supervisor-app:${VERSION} ./
