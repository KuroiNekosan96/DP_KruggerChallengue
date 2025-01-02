import { Cliente } from './cliente.interface';

export interface ClienteResponse {
  isSuccess: boolean;
  result: Cliente;
  message: string;
}