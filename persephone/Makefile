MAKEFLAGS+=--always-make --no-builtin-rules --no-builtin-variables --warn-undefined-variables

USER=debian
HOST=public.persephone.shepherdjerred.com
REMOTE=$(USER)@$(HOST)
REMOTE_DIRECTORY=/var/docker-compose/servers/persephone

deploy:
	rsync --progress -a . $(REMOTE):$(REMOTE_DIRECTORY)

start:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose up -d"

stop:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose down"

restart: stop start

lint:
	docker-compose config
