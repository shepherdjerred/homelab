resource "cloudflare_zone" "discord_plays_pokemon_com" {
  account_id = var.cloudflare_account_id
  zone       = "discord-plays-pokemon.com"
}

resource "cloudflare_bot_management" "discord_plays_pokemon_com" {
  zone_id            = cloudflare_zone.discord_plays_pokemon_com.id
  ai_bots_protection = "block"
  crawler_protection = "enabled"
  fight_mode         = true
  enable_js          = true
}

# DNS records will be populated by cf-terraforming import.
# Placeholder records for email security:

resource "cloudflare_record" "discord_plays_pokemon_com_spf" {
  zone_id = cloudflare_zone.discord_plays_pokemon_com.id
  name    = "@"
  type    = "TXT"
  value   = "v=spf1 -all"
}

resource "cloudflare_record" "discord_plays_pokemon_com_dmarc" {
  zone_id = cloudflare_zone.discord_plays_pokemon_com.id
  name    = "_dmarc"
  type    = "TXT"
  value   = "v=DMARC1; p=reject; rua=mailto:dmarc@discord-plays-pokemon.com"
}
