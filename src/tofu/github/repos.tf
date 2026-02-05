resource "github_repository" "homelab" {
  name                   = "homelab"
  description            = "Homelab infrastructure and configuration"
  visibility             = "public"
  has_issues             = true
  has_projects           = false
  has_wiki               = false
  delete_branch_on_merge = true
  allow_squash_merge     = true
  allow_merge_commit     = false
  allow_rebase_merge     = false
}
