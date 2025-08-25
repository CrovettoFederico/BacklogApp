terraform { 
  cloud { 
    
    organization = "AppBacklog" 

    workspaces { 
      name = "Minimalist_Backlog" 
    } 
  } 
}