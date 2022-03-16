# Zeus

## Bootstrap steps

1. Install CoreOS
2. `make deploy`
3. Setup Tailscale
   - `docker exec tailscale tailscale up`
4. Update IPv4 and IPv6 addresses in CDK, docker-compose, etc.
