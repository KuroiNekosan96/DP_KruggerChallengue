import { Cliente } from './cliente.interface';

export interface ClientesResponse {
  isSuccess: boolean;
  result: Cliente[];
  message: string;
}