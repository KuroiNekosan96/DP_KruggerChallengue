using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using WebApi_LoginKruggerChallenge.Custom;
using WebApi_LoginKruggerChallenge.Models.DTO;
using Microsoft.AspNetCore.Authorization;
using WebApi_KruggerChallenge.Models;
using WebApi_KruggerChallenge;

namespace WebApi_LoginKruggerChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class AccesoClienteController : ControllerBase
    {
        //private readonly KruggerDbContext _context = context;
        private readonly KruggerDbContext _kruggerDbContext;
        private readonly Utilidades _utilidades;

        public AccesoClienteController(KruggerDbContext kruggerDbContext, Utilidades utilidades)
        {
            _kruggerDbContext = kruggerDbContext;
            _utilidades = utilidades;

        }

        [HttpPost("/Registrar")]
        public async Task<IActionResult> Post([FromBody] CrearActualizarCliente model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<CrearActualizarCliente>
                {
                    IsSuccess = false,
                    Result = model,
                    Message = "Los campos no son correctos"
                });
            }


            var clienteNuevo = new Cliente
            {
                Ci = model.Ci,
                Nombres = model.Nombres,
                Apellidos = model.Apellidos,
                Email = model.Email,
                User_clie = model.User_clie,
                Password = _utilidades.encriptarSHA256(model.Password),
                Dom_long = model.Dom_long,
                Dom_lat = model.Dom_lat,
            };
            await _kruggerDbContext.Cliente.AddAsync(clienteNuevo);
            await _kruggerDbContext.SaveChangesAsync(); 

            return Ok(new Response<Cliente>
            {
                IsSuccess = true,
                Result = clienteNuevo,
                Message = "Cliente registrado correctamente"
            });
        }

        //Para hacer login
        [HttpPost]
        [Route("Login")]

        public async Task<IActionResult> Login(LoginDTO objeto)
        {

            var usuarioEncontrado = await _kruggerDbContext.Cliente
                                    .Where(u =>
                                        u.User_clie == objeto.User_clie &&
                                        u.Password == _utilidades.encriptarSHA256(objeto.Password)
                                    ).FirstOrDefaultAsync();

            if (usuarioEncontrado == null)
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = false, token = "" });
            else
                return StatusCode(StatusCodes.Status200OK, new { isSuccess = true, token = _utilidades.generarJWT(usuarioEncontrado) });

        }

        //Metodo de validar token
        [HttpGet]
        [Route("ValidarToken")] 

        public IActionResult ValidarToken([FromQuery] string token)
        {
            bool respuesta = _utilidades.validarToken(token);

            return StatusCode(StatusCodes.Status200OK, new { isSuccess = respuesta });

        }


    }
}

