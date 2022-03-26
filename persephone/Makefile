MAKEFLAGS+=--always-make --no-builtin-rules --no-builtin-variables --warn-undefined-variables

USER=debian
HOST=public.persephone.shepherdjerred.com
REMOTE=$(USER)@$(HOST)
REMOTE_DIRECTORY=/home/debian/servers/persephone

deploy:
	rsync --progress -a . $(REMOTE):$(REMOTE_DIRECTORY)

up:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose up -d --remove-orphans"

down:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose down"

restart: down up

lint:
	docker-compose config
