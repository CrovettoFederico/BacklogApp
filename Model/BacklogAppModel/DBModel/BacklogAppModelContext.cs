using DBModel.Models;
using Microsoft.EntityFrameworkCore;

namespace DBModel {
    public class BacklogAppModelContext : DbContext {

        public BacklogAppModelContext(DbContextOptions<BacklogAppModelContext>options) : base(options) {
            
        }

        DbSet<Models.User> Users { get; set; }
        DbSet<Models.Task> Tasks { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            base.OnModelCreating(modelBuilder);

            modelBuilder.Entity<User>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd(); // 👈 asegura que sea IDENTITY
            });

            modelBuilder.Entity<Models.Task>(entity =>
            {
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id)
                      .ValueGeneratedOnAdd(); // idem
            });
        }
    }
}
