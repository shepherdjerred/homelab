resource "cloudflare_zone" "sjer_red" {
  account_id = var.cloudflare_account_id
  zone       = "sjer.red"
}

resource "cloudflare_bot_management" "sjer_red" {
  zone_id            = cloudflare_zone.sjer_red.id
  ai_bots_protection = "block"
  crawler_protection = "enabled"
  fight_mode         = true
  enable_js          = true
}

# DNS records will be populated by cf-terraforming import.
# Placeholder records for email security:

resource "cloudflare_record" "sjer_red_spf" {
  zone_id = cloudflare_zone.sjer_red.id
  name    = "@"
  type    = "TXT"
  value   = "v=spf1 include:spf.messagingengine.com include:mail.sjer.red -all"
}

resource "cloudflare_record" "sjer_red_dmarc" {
  zone_id = cloudflare_zone.sjer_red.id
  name    = "_dmarc"
  type    = "TXT"
  value   = "v=DMARC1; p=none; rua=mailto:dmarc@sjer.red"
}
