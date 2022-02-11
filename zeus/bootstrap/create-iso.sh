#!/bin/bash
ISO_FILE=coreos.iso
IGNITION_FILE=ignition.ign

butane --pretty --strict butane.bu > "$IGNITION_FILE"

docker run --rm \
  -v "$(pwd)"/"$ISO_FILE":/"$ISO_FILE" \
  -v "$(pwd)"/"$IGNITION_FILE":/"$IGNITION_FILE" \
  quay.io/coreos/coreos-installer:release \
  iso ignition embed -i "$IGNITION_FILE" "$ISO_FILE"
