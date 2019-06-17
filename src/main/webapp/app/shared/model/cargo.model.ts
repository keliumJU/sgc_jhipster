export interface ICargo {
  id?: number;
  cargo?: string;
  correoInst?: string;
}

export class Cargo implements ICargo {
  constructor(public id?: number, public cargo?: string, public correoInst?: string) {}
}
