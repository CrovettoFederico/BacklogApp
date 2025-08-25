# ---------- Resource Group ----------
resource "azurerm_resource_group" "rg" {
    name = "rg-${var.namePrefix}"
    location = var.location
    tags = var.tags
}

# ---------- Storage Account (Functions) ----------
resource "azurerm_storage_account" "sa" {
    name = "sabacklogappprod"
    resource_group_name = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
    account_tier = "Standard"
    account_replication_type = "LRS"
    min_tls_version = "TLS1_2"
    allow_nested_items_to_be_public = false
    tags = var.tags
}

# ---------- Application Insights ----------
    resource "azurerm_application_insights" "ai" {
    name = "ai-${var.namePrefix}"
    location = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
    application_type = "web"
    tags = var.tags
}

# ---------- Service Plan (Functions Consumption Y1) ----------
    resource "azurerm_service_plan" "plan" {
    name = "plan-${var.namePrefix}"
    location = azurerm_resource_group.rg.location
    resource_group_name = azurerm_resource_group.rg.name
    os_type = "Windows"
    sku_name = "Y1" # Consumption
    tags = var.tags
}

# ---------- Azure SQL Server ----------
resource "azurerm_mssql_server" "sql" {
    name = "sql-${var.namePrefix}"
    resource_group_name = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
    version = "12.0"
    administrator_login = var.sql_admin_login
    administrator_login_password = var.sql_admin_login_pass
    minimum_tls_version = "1.2"
    public_network_access_enabled = true
    tags = var.tags
}

# Permitir Azure services (0.0.0.0)
    resource "azurerm_mssql_firewall_rule" "allow_azure" {
    count = var.allow_azure_services ? 1 : 0
    name = "AllowAzureServices"
    server_id = azurerm_mssql_server.sql.id
    start_ip_address = "0.0.0.0"
    end_ip_address = "0.0.0.0"
}

# ---------- Azure SQL Database (Serverless) ----------
resource "azurerm_mssql_database" "db" {
    name = "${var.project_name}_${var.environment}"
    server_id = azurerm_mssql_server.sql.id
    sku_name = "GP_S_Gen5_1" # General Purpose, Serverless, Gen5, 1 vCore
    max_size_gb = 32 # Acorde a la oferta free
    min_capacity = 0.5 # vCores mínimos (serverless)
    auto_pause_delay_in_minutes = 60 # Pausa tras 60 min inactiva
    zone_redundant = false
    tags = var.tags
}

# ---------- Function App (Windows, v4) ----------
locals {
    sql_connection_string = format(
        "Server=tcp:%s,1433;Initial Catalog=%s;Persist Security Info=False;User ID=%s;Password=%s;MultipleActiveResultSets=False;Encrypt=True;TrustServerCertificate=False;Connection Timeout=30;",
        azurerm_mssql_server.sql.fully_qualified_domain_name,
        azurerm_mssql_database.db.name,
        var.sql_admin_login,
        var.sql_admin_login_pass
    )
}


resource "azurerm_windows_function_app" "func" {
    name = "func-${var.namePrefix}"
    resource_group_name = azurerm_resource_group.rg.name
    location = azurerm_resource_group.rg.location
    service_plan_id = azurerm_service_plan.plan.id
    storage_account_name = azurerm_storage_account.sa.name
    storage_account_access_key = azurerm_storage_account.sa.primary_access_key
    functions_extension_version = "~4"


    identity {
        type = "SystemAssigned"
    }


    site_config {
        ftps_state = "Disabled"


        application_insights_connection_string = azurerm_application_insights.ai.connection_string
        application_insights_key = azurerm_application_insights.ai.instrumentation_key

        application_stack {
            node_version = "~22"
        }


        cors {
            allowed_origins = var.cors_allowed_origins
        }
    }


    app_settings = {
        WEBSITE_RUN_FROM_PACKAGE = "1"
        AzureWebJobsFeatureFlags = "EnableWorkerIndexing"
        APPLICATIONINSIGHTS_CONNECTION_STRING = azurerm_application_insights.ai.connection_string
    }


    connection_string {
        name = "SqlConnection"
        type = "SQLAzure"
        value = local.sql_connection_string
    }


    tags = var.tags
}

