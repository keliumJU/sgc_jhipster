import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

export interface IAnexos {
  id?: number;
  nomAnexo?: string;
  descripcion?: string;
  imgContentType?: string;
  img?: any;
  idPadre?: number;
  idDoc?: number;
  documentoSGC?: IDocumentoSGC;
}

export class Anexos implements IAnexos {
  constructor(
    public id?: number,
    public nomAnexo?: string,
    public descripcion?: string,
    public imgContentType?: string,
    public img?: any,
    public idPadre?: number,
    public idDoc?: number,
    public documentoSGC?: IDocumentoSGC
  ) {}
}
