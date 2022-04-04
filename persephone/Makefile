MAKEFLAGS+=--always-make --no-builtin-rules --no-builtin-variables --warn-undefined-variables

USER=debian
HOST=persephone
REMOTE=$(USER)@$(HOST)
REMOTE_DIRECTORY=/home/${USER}/servers/persephone

deploy: sync pull restart;

sync:
	rsync --progress -a . $(REMOTE):$(REMOTE_DIRECTORY)

up:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose up -d --remove-orphans"

down:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose down"

restart:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose restart"

pull:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose pull"

restart-nginx:
	ssh $(REMOTE) \
	"cd $(REMOTE_DIRECTORY) && docker-compose restart nginx_tailscale"
