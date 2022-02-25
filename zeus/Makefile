MAKEFLAGS+=--always-make --no-builtin-rules --no-builtin-variables --warn-undefined-variables

USER=core
HOST=192.168.1.45
REMOTE=$(USER)@$(HOST)
REMOTE_DIRECTORY=/var/docker-compose/servers/zeus

PWD=$(shell pwd)
BOOTSTRAP=$(PWD)/bootstrap
ISO_FILE=coreos.iso
ISO_FILE_PATH=$(BOOTSTRAP)/$(ISO_FILE)
IGNITION_FILE=ignition.ign
ZEUS_IGNITION_FILE=$(PWD)/$(IGNITION_FILE)
BOOTSTRAP_IGNITION_FILE=$(BOOTSTRAP)/$(IGNITION_FILE)

deploy:
	rsync --progress -a . $(REMOTE):$(REMOTE_DIRECTORY)

start:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose up -d"

stop:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose down"

lint: build
	docker run --rm -i quay.io/coreos/ignition-validate:release - < $(ZEUS_IGNITION_FILE)
	docker run --rm -i quay.io/coreos/ignition-validate:release - < $(BOOTSTRAP_IGNITION_FILE)

build:
	butane --pretty --strict butane.bu > $(ZEUS_IGNITION_FILE)
	butane --pretty --strict bootstrap/butane.bu > $(BOOTSTRAP_IGNITION_FILE)

iso.build: build
	docker run --rm \
	-v $(ISO_FILE_PATH):/$(ISO_FILE) \
	-v $(BOOTSTRAP_IGNITION_FILE):/$(IGNITION_FILE) \
	quay.io/coreos/coreos-installer:release \
	iso ignition embed -i $(IGNITION_FILE) $(ISO_FILE) -f

clean:
	rm -rfv $(BOOTSTRAP_IGNITION_FILE)
	rm -rfv $(IGNITION_FILE)
