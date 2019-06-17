export interface IElementos {
  id?: number;
  elemento?: string;
  descripcion?: string;
}

export class Elementos implements IElementos {
  constructor(public id?: number, public elemento?: string, public descripcion?: string) {}
}
