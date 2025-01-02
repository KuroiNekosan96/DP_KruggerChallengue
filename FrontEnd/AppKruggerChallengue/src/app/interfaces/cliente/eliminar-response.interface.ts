import { Cliente } from './cliente.interface';

export interface EliminarResponse {
  isSuccess: boolean;
  result: Cliente;
  message: string;
}