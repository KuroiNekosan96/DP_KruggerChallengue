import { Sector } from "./sector.interface";

export interface SectoresResponse {
    isSuccess: boolean;
      result: Sector[];
      message: string;
}
