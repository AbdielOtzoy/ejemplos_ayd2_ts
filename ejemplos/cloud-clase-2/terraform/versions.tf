terraform {
  required_version = ">= 1.6"
  required_providers {
    azurerm = { source = "hashicorp/azurerm", version = "~> 4.0" }
    local   = { source = "hashicorp/local", version = "~> 2.5" }
  }
}

# Usa la sesión de `az login`; la suscripción se toma de ARM_SUBSCRIPTION_ID o de `az account show`.
provider "azurerm" {
  features {}
}
