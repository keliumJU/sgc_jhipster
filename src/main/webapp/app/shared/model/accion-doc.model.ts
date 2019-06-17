export interface IAccionDoc {
  id?: number;
  accion?: string;
}

export class AccionDoc implements IAccionDoc {
  constructor(public id?: number, public accion?: string) {}
}
