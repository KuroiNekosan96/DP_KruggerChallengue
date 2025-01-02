import { Cliente } from './cliente.interface';

export interface CrearResponse {
  isSuccess: boolean;
  result: Cliente;
  message: string;
}