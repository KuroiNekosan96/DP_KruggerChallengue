using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Identity.UI.Services;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections;
using WebApi_KruggerChallenge.Models;

namespace WebApi_KruggerChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ClienteController(KruggerDbContext context) : ControllerBase
    {

        private readonly KruggerDbContext _context= context;

        //Listar clientes
        [HttpGet("/Listar")]
        public async Task<IActionResult> GetAll()
        {
            var clientes = await _context.Cliente.ToListAsync();
            if (clientes.Any())
            {
                return Ok(new Response<IEnumerable<Cliente>>
                {
                    IsSuccess = true,
                    Result = clientes,
                    Message = "Listado de Clientes"
                });
            }
            return Ok(new Response<IEnumerable<Cliente>>
            {
                IsSuccess = false,
                Message = "No tiene registros",
                Result = []
            });
        }


        //registrar clientes
        [HttpPost("/Registrar")]
        public async Task<IActionResult> Post([FromBody] CrearActualizarCliente model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<CrearActualizarCliente>
                {
                    IsSuccess= false,
                    Result= model,
                    Message="Los campos no son correctos"
                });
            }


            var clienteNuevo = new Cliente
            {
                Ci = model.Ci,
                Nombres = model.Nombres,
                Apellidos = model.Apellidos,
                Email = model.Email,
                User_clie = model.User_clie,
                Password = model.Password,
                Dom_long = model.Dom_long,
                Dom_lat = model.Dom_lat,
            };
            await _context.Cliente.AddAsync(clienteNuevo);
            await _context.SaveChangesAsync();

            return Ok(new Response<Cliente>
            {
                IsSuccess= true,
                Result = clienteNuevo,
                Message="Cliente registrado correctamente"
            });
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest(new Response<Cliente>
                {
                    IsSuccess = false,
                    Message = "Se necesita Id",
                    Result = null
                });
            }

            var cliente = await GetCliente(id);
            if (cliente != null)
            {
                return Ok(new Response<Cliente>
                {
                    IsSuccess= true,
                    Message="Se encontro al cliente",
                    Result = cliente
                });
            }
            return NotFound(new Response<Cliente>
            {
                IsSuccess=false,
                Message="No se encontro",
                Result=null
            });
        }

        //Eliminar al cliente
        [HttpDelete("Eliminar/{id}")]
        public async Task<IActionResult> Delete(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest(new Response<Cliente>
                {
                    IsSuccess = false,
                    Message = "El id es incorrecto",
                    Result = null
                });
            }
            var cliente=await GetCliente(id);
            if (cliente != null)
            {
                _context.Cliente.Remove(cliente);
                await _context.SaveChangesAsync();

                return Ok(new Response<Cliente>
                {
                    Result = cliente,
                    IsSuccess=true,
                    Message=$"Se ha eliminado al estudiante {cliente.Nombres} {cliente.Apellidos}"
                });


            }
            return NotFound(new Response<Cliente>
            {
                IsSuccess = false,
                Message = "No hay coincidencia",
                Result = cliente
            });
        }



        //actualizar clientes
        [HttpPut("Actualizar/{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] CrearActualizarCliente model)
        {
            if (id==Guid.Empty)
            {
                return BadRequest(new Response<CrearActualizarCliente>
                {
                    IsSuccess = false,
                    Message = "Se necesita Id",
                    Result = model
                });
            }
            if (ModelState.IsValid)
            {

                var cliente = await GetCliente(id);
                if(cliente != null)
                {
                    cliente.Ci=model.Ci;
                    cliente.Nombres=model.Nombres;
                    cliente.Apellidos=model.Apellidos;
                    cliente.Email=model.Email;
                    cliente.User_clie=model.User_clie;
                    cliente.Password=model.Password;
                    cliente.Dom_long = model.Dom_long;
                    cliente.Dom_lat=model.Dom_lat;

                    _context.Cliente.Update(cliente);
                    await _context.SaveChangesAsync();

                }

                return Ok(new Response<CrearActualizarCliente>
                {
                    IsSuccess= true,
                    Message =" Cliente Actualizado",
                    Result = model
                });


            }
            return BadRequest(new Response<CrearActualizarCliente>
            {
                IsSuccess=false,
                Message="Error al Actualizar",
                Result= model
            });
        }

        private async Task<Cliente> GetCliente(Guid id)
        {
            var cliente = await _context.Cliente.FirstOrDefaultAsync(x => x.Id_clie == id);
            return cliente;
        }


    }
}
