variable "location" {
  type    = string
  default = "northcentralus"
}

# Azure for Students limita a 3 IPs públicas por región: prod va en otra región.
variable "prod_location" {
  type    = string
  default = "chilecentral"
}

variable "admin_cidr" {
  description = "Tu IP pública /32. Ej.: -var admin_cidr=$(curl -4 -s ifconfig.me)/32"
  type        = string
}

variable "ssh_public_key_path" {
  type    = string
  default = "~/.ssh/id_ed25519.pub"
}
