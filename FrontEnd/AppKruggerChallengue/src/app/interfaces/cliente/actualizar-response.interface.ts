import { CrearActualizar } from './crearactualizar.interface';

export interface ActualizarResponse {
  isSuccess: boolean;
  result: CrearActualizar;
  message: string;
}