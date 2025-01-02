using Microsoft.EntityFrameworkCore;
using WebApi_KruggerChallenge.Models;

namespace WebApi_KruggerChallenge
{
    public class KruggerDbContext: DbContext
    {

        public KruggerDbContext(DbContextOptions<KruggerDbContext>op):base(op)
        {
            
        }

        public DbSet<Cliente> Cliente { get; set; }

        public DbSet<Sector> Sector { get; set; }

        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            base.OnModelCreating(modelBuilder);

            // Configuración explícita para que EF Core use 'time' en lugar de 'interval'
            modelBuilder.Entity<Sector>()
                .Property(s => s.hora_inicio)
                .HasColumnType("time");

            modelBuilder.Entity<Sector>()
                .Property(s => s.hora_fin)
                .HasColumnType("time");
        }


    }
}
