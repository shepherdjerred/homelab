# Zeus
## Bootstrap steps
1. Install CoreOS
2. Setup Tailscale
  * `docker exec tailscaled tailscale up --auth-key=$KEY`
3. Update IPv4 and IPv6 addresses in CDK, docker-compose, etc.
4. Copy credentials
  * AWS
  * Tailscale
