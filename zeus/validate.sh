#!/bin/bash
docker run --rm -i quay.io/coreos/ignition-validate:release - < ignition.ign
docker run --rm -i quay.io/coreos/ignition-validate:release - < bootstrap/ignition.ign
