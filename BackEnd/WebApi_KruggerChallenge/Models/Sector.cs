using System.ComponentModel.DataAnnotations;
using System.Reflection.Metadata;

namespace WebApi_KruggerChallenge.Models
{
    public class Sector
    {
        [Key]
        public Guid Id_sector { get; set; }

        public TimeSpan hora_inicio { get; set; }

        public TimeSpan hora_fin {  get; set; }

        public string nombre_sector { get; set; }

        public double sec_long { get; set; }

        public double sec_lat { get; set; }
    }

    public class CrearActualizarSector
    {
        //Update
        public TimeSpan hora_inicio { get; set; }

        public TimeSpan hora_fin { get; set; }

        public string nombre_sector { get; set; }

        public double sec_long { get; set; }

        public double sec_lat { get; set; }

    }
}
