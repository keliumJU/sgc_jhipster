export interface ITipoDoc {
  id?: number;
  code?: number;
  tipoDoc?: string;
  codTip?: string;
}

export class TipoDoc implements ITipoDoc {
  constructor(public id?: number, public code?: number, public tipoDoc?: string, public codTip?: string) {}
}
