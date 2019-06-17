export interface ITipoSolicitud {
  id?: number;
  code?: number;
  tipoSol?: string;
}

export class TipoSolicitud implements ITipoSolicitud {
  constructor(public id?: number, public code?: number, public tipoSol?: string) {}
}
