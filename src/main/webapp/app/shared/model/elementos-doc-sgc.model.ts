import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { IElementos } from 'app/shared/model/elementos.model';

export interface IElementosDocSGC {
  id?: number;
  idElemento?: number;
  idDoc?: number;
  valor?: string;
  documentoDocSGC?: IDocumentoSGC;
  elementos?: IElementos;
}

export class ElementosDocSGC implements IElementosDocSGC {
  constructor(
    public id?: number,
    public idElemento?: number,
    public idDoc?: number,
    public valor?: string,
    public documentoDocSGC?: IDocumentoSGC,
    public elementos?: IElementos
  ) {}
}
