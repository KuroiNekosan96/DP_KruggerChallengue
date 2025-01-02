using System.ComponentModel.DataAnnotations;

namespace WebApi_KruggerChallenge.Models
{
    public class Cliente
    {
        //Entidad - Tabla Db
        [Key]
        public Guid Id_clie { get; set; }

        public string Ci { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Email { get; set; }

        public string User_clie { get; set; }

        public string Password { get; set; }

        public double Dom_long { get; set; }

        public double Dom_lat { get; set; }

    }

    public class CrearActualizarCliente
    {
        //Update
       [Required(ErrorMessage ="El campo {0} debe tener 10 dígitos")]
       [MinLength(10,ErrorMessage ="ingresó mal")]
        public string Ci { get; set; }

        public string Nombres { get; set; }

        public string Apellidos { get; set; }

        public string Email { get; set; }

        public string User_clie { get; set; }

        public string Password { get; set; }

        public double Dom_long { get; set; }

        public double Dom_lat { get; set; }
    }
}
