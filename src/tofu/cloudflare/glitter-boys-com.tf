resource "cloudflare_zone" "glitter_boys_com" {
  account_id = var.cloudflare_account_id
  zone       = "glitter-boys.com"
}

resource "cloudflare_bot_management" "glitter_boys_com" {
  zone_id            = cloudflare_zone.glitter_boys_com.id
  ai_bots_protection = "block"
  crawler_protection = "enabled"
  fight_mode         = true
  enable_js          = true
}

# DNS records will be populated by cf-terraforming import.
# Placeholder records for email security:

resource "cloudflare_record" "glitter_boys_com_spf" {
  zone_id = cloudflare_zone.glitter_boys_com.id
  name    = "@"
  type    = "TXT"
  value   = "v=spf1 -all"
}

resource "cloudflare_record" "glitter_boys_com_dmarc" {
  zone_id = cloudflare_zone.glitter_boys_com.id
  name    = "_dmarc"
  type    = "TXT"
  value   = "v=DMARC1; p=reject; rua=mailto:dmarc@glitter-boys.com"
}
