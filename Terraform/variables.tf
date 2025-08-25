variable "ARM_CLIENT_ID" {}
variable "ARM_CLIENT_SECRET" {}
variable "ARM_SUBSCRIPTION_ID" {}
variable "ARM_TENANT_ID" {}

variable "project_name" {
    description = "Nombre corto del proyecto (usado en nombres de recursos)."
    type = string
    default = "backlog"
}


variable "environment" {
    description = "Entorno (dev|test|prod)."
    type = string
    default = "prod"
}


variable "location" {
    description = "Región de Azure para los recursos."
    type = string
    default = "brazilsouth"
}


variable "sql_admin_login" {
    description = "Usuario administrador de SQL Server (solo SQL Auth)."
    type = string
    default = "sqladminuser"
}

variable "sql_admin_login_pass" {
    description = "Usuario administrador de SQL Server (solo SQL Auth)."
    type = string
    default = "(5q14m1nu53R)"
}

variable "allow_azure_services" {
    description = "Permitir acceso desde Azure services al SQL Server (0.0.0.0)."
    type = bool
    default = true
}


variable "cors_allowed_origins" {
    description = "Orígenes permitidos para CORS en la Function App."
    type = list(string)
    default = ["*"]
}


variable "tags" {
description = "Tags a aplicar a todos los recursos."
type = map(string)
default = {
        Project = "BacklogApp"
        Environment = "prod"
        IaC = "Terraform"
    }
}

variable "namePrefix"{
    type = string
    default = "backlogapp-prod"
}