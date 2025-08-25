using Microsoft.EntityFrameworkCore;

namespace DBModel {
    public class BacklogAppModelContext : DbContext {

        public BacklogAppModelContext(DbContextOptions<BacklogAppModelContext>options) : base(options) {
            
        }

        DbSet<Models.User> Users { get; set; }
        DbSet<Models.Task> Tasks { get; set; }

    }
}
