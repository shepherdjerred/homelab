deploy:
	rsync --progress -a . core@192.168.1.45:/var/docker-compose/servers/zeus

lint: build
	docker run --rm -i quay.io/coreos/ignition-validate:release - < ignition.ign
	docker run --rm -i quay.io/coreos/ignition-validate:release - < bootstrap/ignition.ign

build:
	butane --pretty --strict butane.bu > ignition.ign
	butane --pretty --strict bootstrap/butane.bu > bootstrap/ignition.ign

PWD=$(shell pwd)
BOOTSTRAP=$(PWD)/bootstrap
ISO_FILE=coreos.iso
IGNITION_FILE=ignition.ign
iso.build: build
	docker run --rm \
	-v $(BOOTSTRAP)/$(ISO_FILE):/$(ISO_FILE) \
	-v $(BOOTSTRAP)/$(IGNITION_FILE):/$(IGNITION_FILE) \
	quay.io/coreos/coreos-installer:release \
	iso ignition embed -i $(IGNITION_FILE) $(ISO_FILE) -f

clean:
	rm -rfv bootstrap/ignition.ign
	rm -rfv ignition.ign
