output "public_ips" {
  description = "IPs públicas de las VMs; Ansible las usa como inventario."
  value       = azurerm_public_ip.web[*].ip_address
}
