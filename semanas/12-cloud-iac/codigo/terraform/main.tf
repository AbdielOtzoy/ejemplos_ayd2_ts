# El mismo módulo, dos ambientes. Compárese con 00-sin-modulos/main.tf.

module "staging" {
  source         = "./modules/web_server"
  environment    = "staging"
  location       = var.location
  instance_count = 1
  address_space  = "10.10.0.0/16"
  admin_cidr     = var.admin_cidr
  ssh_public_key = file(pathexpand(var.ssh_public_key_path))
}

module "prod" {
  source         = "./modules/web_server"
  environment    = "prod"
  location       = var.prod_location
  instance_count = 2
  address_space  = "10.20.0.0/16"
  admin_cidr     = var.admin_cidr
  ssh_public_key = file(pathexpand(var.ssh_public_key_path))
}

# Puente Terraform -> Ansible: los outputs se convierten en el inventario.
resource "local_file" "inventory" {
  filename = "${path.module}/../ansible/inventory.ini"
  content = templatefile("${path.module}/inventory.tftpl", {
    staging = module.staging.public_ips
    prod    = module.prod.public_ips
  })
}

output "staging_ips" { value = module.staging.public_ips }
output "prod_ips" { value = module.prod.public_ips }
