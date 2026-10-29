# SOLO PARA MOSTRAR EL PROBLEMA. No ejecutar apply aquí.
# Staging y prod son el mismo bloque copiado: un cambio en uno se olvida en el otro.

resource "azurerm_resource_group" "staging" {
  name     = "rg-ads2-staging"
  location = "northcentralus"
}

resource "azurerm_virtual_network" "staging" {
  name                = "vnet-staging"
  address_space       = ["10.10.0.0/16"]
  location            = azurerm_resource_group.staging.location
  resource_group_name = azurerm_resource_group.staging.name
}

resource "azurerm_subnet" "staging" {
  name                 = "snet-web"
  resource_group_name  = azurerm_resource_group.staging.name
  virtual_network_name = azurerm_virtual_network.staging.name
  address_prefixes     = ["10.10.1.0/24"]
}

resource "azurerm_network_security_group" "staging" {
  name                = "nsg-staging"
  location            = azurerm_resource_group.staging.location
  resource_group_name = azurerm_resource_group.staging.name

  security_rule {
    name                       = "http"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  security_rule {
    name                       = "ssh"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "190.148.161.50/32"
    destination_address_prefix = "*"
  }
}

# ... public IP, NIC, asociación NSG y VM de staging (otras ~50 líneas) ...

resource "azurerm_resource_group" "prod" {
  name     = "rg-ads2-prod"
  location = "northcentralus"
}

resource "azurerm_virtual_network" "prod" {
  name                = "vnet-prod"
  address_space       = ["10.20.0.0/16"]
  location            = azurerm_resource_group.prod.location
  resource_group_name = azurerm_resource_group.prod.name
}

resource "azurerm_subnet" "prod" {
  name                 = "snet-web"
  resource_group_name  = azurerm_resource_group.prod.name
  virtual_network_name = azurerm_virtual_network.prod.name
  address_prefixes     = ["10.20.1.0/24"]
}

resource "azurerm_network_security_group" "prod" {
  name                = "nsg-prod"
  location            = azurerm_resource_group.prod.location
  resource_group_name = azurerm_resource_group.prod.name

  security_rule {
    name                       = "http"
    priority                   = 100
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "80"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }

  # Error típico de copiar y pegar: en prod SSH quedó abierto a todo Internet.
  security_rule {
    name                       = "ssh"
    priority                   = 110
    direction                  = "Inbound"
    access                     = "Allow"
    protocol                   = "Tcp"
    source_port_range          = "*"
    destination_port_range     = "22"
    source_address_prefix      = "*"
    destination_address_prefix = "*"
  }
}

# ... y otra vez public IP, NIC, asociación NSG y VM, ahora para prod ...
