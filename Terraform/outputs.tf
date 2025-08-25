output "function_app_url" {
    description = "URL pública de la Function App"
    value = "https://${azurerm_windows_function_app.func.default_hostname}"
}


output "sql_server_fqdn" {
    description = "FQDN del SQL Server"
    value = azurerm_mssql_server.sql.fully_qualified_domain_name
}


output "sql_admin_login" {
    description = "Usuario administrador de SQL"
    value = var.sql_admin_login
}


output "sql_admin_password" {
    description = "Password administrador de SQL (sensible)"
    value = var.sql_admin_login_pass
    sensitive = true
}


output "sql_connection_string" {
    description = "Connection String para la app (sensible)"
    value = local.sql_connection_string
    sensitive = true
}