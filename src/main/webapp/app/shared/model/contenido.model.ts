import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

export interface IContenido {
  id?: number;
  actividad?: string;
  descripcion?: string;
  responsable?: string;
  registro?: string;
  idDoc?: number;
  documentoSGC?: IDocumentoSGC;
}

export class Contenido implements IContenido {
  constructor(
    public id?: number,
    public actividad?: string,
    public descripcion?: string,
    public responsable?: string,
    public registro?: string,
    public idDoc?: number,
    public documentoSGC?: IDocumentoSGC
  ) {}
}
