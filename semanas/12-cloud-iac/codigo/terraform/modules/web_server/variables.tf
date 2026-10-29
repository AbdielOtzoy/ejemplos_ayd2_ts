variable "environment" {
  description = "Nombre del ambiente: staging, prod..."
  type        = string
}

variable "location" {
  description = "Región de Azure (Azure for Students solo permite algunas)."
  type        = string
}

variable "instance_count" {
  description = "Cantidad de VMs web."
  type        = number
  default     = 1
}

variable "vm_size" {
  type    = string
  default = "Standard_B2ats_v2" # la B1s no tiene capacidad en northcentralus
}

variable "address_space" {
  description = "Rango de la red virtual; distinto por ambiente."
  type        = string
}

variable "admin_cidr" {
  description = "Única IP autorizada para SSH, en formato x.x.x.x/32."
  type        = string
}

variable "ssh_public_key" {
  type = string
}
