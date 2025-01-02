using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using WebApi_KruggerChallenge.Models;

namespace WebApi_KruggerChallenge.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class SectorController : ControllerBase
    {
        private readonly KruggerDbContext _context;

        public SectorController(KruggerDbContext context)
        {
            _context = context;
        }

        // Listar sectores
        [HttpGet("ListarSectores")]
        public async Task<IActionResult> GetAll()
        {
            var sectores = await _context.Sector.ToListAsync();
            if (sectores.Any())
            {
                return Ok(new Response<IEnumerable<Sector>>
                {
                    IsSuccess = true,
                    Result = sectores,
                    Message = "Listado de Sectores"
                });
            }
            return Ok(new Response<IEnumerable<Sector>>
            {
                IsSuccess = false,
                Message = "No tiene registros",
                Result = new List<Sector>()
            });
        }

        // Registrar sector
        [HttpPost("RegistrarSectores")]
        public async Task<IActionResult> Post([FromBody] CrearActualizarSector model)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(new Response<CrearActualizarSector>
                {
                    IsSuccess = false,
                    Result = model,
                    Message = "Los campos no son correctos",
                    
                });
            }

            var sectorNuevo = new Sector
            {
                hora_inicio = model.hora_inicio,
                hora_fin = model.hora_fin,
                nombre_sector = model.nombre_sector,
                sec_long = model.sec_long,
                sec_lat = model.sec_lat,
            };
            await _context.Sector.AddAsync(sectorNuevo);
            await _context.SaveChangesAsync();

            return Ok(new Response<Sector>
            {
                IsSuccess = true,
                Result = sectorNuevo,
                Message = "Sector registrado correctamente"
            });
        }

        // Obtener sector por ID
        [HttpGet("{id}")]
        public async Task<IActionResult> GetById(Guid id)
        {
            if (id == Guid.Empty)
            {
                return BadRequest(new Response<Sector>
                {
                    IsSuccess = false,
                    Message = "Se necesita Id",
                    Result = null
                });
            }

            var sector = await GetSector(id);
            if (sector != null)
            {
                return Ok(new Response<Sector>
                {
                    IsSuccess = true,
                    Message = "Se encontró el sector",
                    Result = sector
                });
            }
            return NotFound(new Response<Sector>
            {
                IsSuccess = false,
                Message = "No se encontró",
                Result = null
            });
        }

        // Eliminar sector
        [HttpDelete("EliminarSector/{id}")]
        public async Task<IActionResult> Delete(string id)
        {
            Console.WriteLine($"ID recibido: {id}"); // Para depurar
            if (Guid.TryParse(id, out Guid guidId) && guidId != Guid.Empty)
            {
                var sector = await GetSector(guidId);
                if (sector != null)
                {
                    _context.Sector.Remove(sector);
                    await _context.SaveChangesAsync();

                    return Ok(new Response<Sector>
                    {
                        Result = sector,
                        IsSuccess = true,
                        Message = $"Se ha eliminado el sector {sector.nombre_sector}"
                    });
                }
                return NotFound(new Response<Sector>
                {
                    IsSuccess = false,
                    Message = "No se encontró el sector.",
                    Result = null
                });
            }
            return BadRequest(new Response<Sector>
            {
                IsSuccess = false,
                Message = "El id es incorrecto",
                Result = null
            });
        }


        // Actualizar sector
        [HttpPut("ActualizarSector/{id}")]
        public async Task<IActionResult> Put(Guid id, [FromBody] CrearActualizarSector model)
        {
            if (id == Guid.Empty)
            {
                return BadRequest(new Response<CrearActualizarSector>
                {
                    IsSuccess = false,
                    Message = "Se necesita Id",
                    Result = model
                });
            }

            if (ModelState.IsValid)
            {
                var sector = await GetSector(id);
                if (sector != null)
                {
                    sector.hora_inicio = model.hora_inicio;
                    sector.hora_fin = model.hora_fin;
                    sector.nombre_sector = model.nombre_sector;
                    sector.sec_long = model.sec_long;
                    sector.sec_lat = model.sec_lat;

                    _context.Sector.Update(sector);
                    await _context.SaveChangesAsync();
                }

                return Ok(new Response<CrearActualizarSector>
                {
                    IsSuccess = true,
                    Message = "Sector actualizado",
                    Result = model
                });
            }
            return BadRequest(new Response<CrearActualizarSector>
            {
                IsSuccess = false,
                Message = "Error al actualizar",
                Result = model
            });
        }

        // Método privado para obtener un sector por id
        private async Task<Sector> GetSector(Guid id)
        {
            return await _context.Sector.FirstOrDefaultAsync(x => x.Id_sector == id);
        }
    }
}
