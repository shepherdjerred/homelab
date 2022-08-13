#!/bin/bash
set -xeuov pipefail

docker run --rm -it -v $(pwd)/bootstrap.sh:/home/debian/bootstrap.sh debian:11.2 /home/debian/bootstrap.sh
