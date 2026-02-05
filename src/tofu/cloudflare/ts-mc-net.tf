resource "cloudflare_zone" "ts_mc_net" {
  account_id = var.cloudflare_account_id
  zone       = "ts-mc.net"
}

resource "cloudflare_bot_management" "ts_mc_net" {
  zone_id            = cloudflare_zone.ts_mc_net.id
  ai_bots_protection = "block"
  crawler_protection = "enabled"
  fight_mode         = true
  enable_js          = true
}

# DNS records will be populated by cf-terraforming import.
# Placeholder records for email security:

resource "cloudflare_record" "ts_mc_net_spf" {
  zone_id = cloudflare_zone.ts_mc_net.id
  name    = "@"
  type    = "TXT"
  value   = "v=spf1 -all"
}

resource "cloudflare_record" "ts_mc_net_dmarc" {
  zone_id = cloudflare_zone.ts_mc_net.id
  name    = "_dmarc"
  type    = "TXT"
  value   = "v=DMARC1; p=reject; rua=mailto:dmarc@ts-mc.net"
}
