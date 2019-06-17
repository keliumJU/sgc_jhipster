export interface IEstadoDoc {
  id?: number;
  estado?: string;
}

export class EstadoDoc implements IEstadoDoc {
  constructor(public id?: number, public estado?: string) {}
}
