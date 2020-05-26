#!/bin/bash

set -e

VERSION=`yarn -s echo-version`

docker build -t elrohil/fogdevice-supervisor-app:latest -t elrohil/fogdevice-supervisor-app:${VERSION} ./
