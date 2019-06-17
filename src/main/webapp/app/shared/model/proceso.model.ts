import { IMacroProceso } from 'app/shared/model/macro-proceso.model';

export interface IProceso {
  id?: number;
  code?: number;
  proceso?: string;
  idMacroProceso?: number;
  codDoc?: string;
  macroProceso?: IMacroProceso;
}

export class Proceso implements IProceso {
  constructor(
    public id?: number,
    public code?: number,
    public proceso?: string,
    public idMacroProceso?: number,
    public codDoc?: string,
    public macroProceso?: IMacroProceso
  ) {}
}
