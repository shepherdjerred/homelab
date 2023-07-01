#!/usr/bin/env python
import json
from yaml import safe_load


def lint(file):
    stream = open(file, "r")
    yaml_object = safe_load(stream)
    services = yaml_object["services"]
    volumes = yaml_object["volumes"]

    errors = {
    }
    errors["services"] = {}

    for service_name, service in services.items():
        service_errors = []
        expected_keys = [
            "container_name",
            "image",
            "env_file",
            "restart",
        ]
        for expected_key in expected_keys:
            if expected_key not in service:
                service_errors.append(f"key `{expected_key}` not found")
        if "image" in service and ":" not in service["image"]:
            service_errors.append(f"no tag for image {service['image']}")
        if service["container_name"] != service_name:
            service_errors.append(
                f"key {service_name} does not match container_name {service['container_name']}")
        expected_vars_file = "vars.env"
        if "env_file" not in service or expected_vars_file not in service["env_file"]:
            service_errors.append(f"{service_name} not using {expected_vars_file} in env_file")
        if "volumes" in service:
            for volume in service["volumes"]:
                if len(volume.split(":")) < 3:
                    service_errors.append(f"flags not set for volume {volume}")
                else:
                    flags = volume.split(":")[2]
                    if "ro" not in flags and "rw" not in flags:
                        service_errors.append(
                            f"read/write flag not set for volume {volume}")
                    if volume[0] == "." or volume[0] == "/":
                        if "z" not in flags and "Z" not in flags:
                            service_errors.append(
                                f"selinux flag not set for bind mount volume {volume}")
        allowed_privileged = [
            "tailscale"
        ]
        if "privileged" in service and service_name not in allowed_privileged:
            service_errors.append("unexpected usage of privileged")
        allowed_host_networking = [
            "homeassistant"
        ]
        if "network_mode" in service and service_name not in allowed_host_networking:
            service_errors.append("unexpected usage of host networking")
        if len(service_errors) > 0:
            errors["services"][service_name] = service_errors

    volumerize_volumes = services["volumerize"]["volumes"]
    volumerize_volumes = [volume_name.split(":")[0]
                          for volume_name in volumerize_volumes]
    volumes_not_backed_up = [volume_name for volume_name in volumes.keys(
    ) if volume_name not in volumerize_volumes]

    backup_exceptions = [
        "letsencrypt-certs",
        "rtorrent-temp"
    ]

    volume_errors = [
        f"volume {volume} not backed up" for volume in volumes_not_backed_up if volume not in backup_exceptions]
    if len(volume_errors) > 0:
        errors["volumes"] = volume_errors

    return errors


errors = lint("compose.yml")

print(json.dumps(errors, indent=2))

if len(errors) > 0:
    exit(1)
