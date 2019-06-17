import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

export interface IFormatos {
  id?: number;
  nomFormato?: string;
  rutaFormatoContentType?: string;
  rutaFormato?: any;
  idDoc?: number;
  documentoSGC?: IDocumentoSGC;
}

export class Formatos implements IFormatos {
  constructor(
    public id?: number,
    public nomFormato?: string,
    public rutaFormatoContentType?: string,
    public rutaFormato?: any,
    public idDoc?: number,
    public documentoSGC?: IDocumentoSGC
  ) {}
}
