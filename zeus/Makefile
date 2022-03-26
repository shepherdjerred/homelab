MAKEFLAGS+=--always-make --no-builtin-rules --no-builtin-variables --warn-undefined-variables

USER=jerred
HOST=zeus
REMOTE=$(USER)@$(HOST)
REMOTE_DIRECTORY=/home/jerred/servers/zeus

deploy:
	rsync --progress -a . $(REMOTE):$(REMOTE_DIRECTORY)

up:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose up -d --remove-orphans"

down:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose down"

restart: up down
