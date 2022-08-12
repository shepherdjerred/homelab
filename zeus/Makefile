MAKEFLAGS+=--always-make --no-builtin-rules --no-builtin-variables --warn-undefined-variables

USER=jerred
HOST=zeus-public
REMOTE=$(USER)@$(HOST)
REMOTE_DIRECTORY=/home/$(USER)/servers/zeus

deploy: sync pull down up;

sync:
	rsync --progress -a . $(REMOTE):$(REMOTE_DIRECTORY)

reload:
	ssh $(REMOTE) \
	docker exec -w /etc/caddy caddy_public caddy reload
	docker exec -w /etc/caddy caddy_tailscale caddy reload

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
	"cd $(REMOTE_DIRECTORY) && docker-compose restart nginx_tailscale && docker-compose restart nginx_public"
