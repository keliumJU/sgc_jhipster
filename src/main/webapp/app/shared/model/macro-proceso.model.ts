export interface IMacroProceso {
  id?: number;
  code?: number;
  macroProceso?: string;
}

export class MacroProceso implements IMacroProceso {
  constructor(public id?: number, public code?: number, public macroProceso?: string) {}
}
