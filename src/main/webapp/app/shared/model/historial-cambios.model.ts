import { Moment } from 'moment';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

export interface IHistorialCambios {
  id?: number;
  code?: number;
  actividad?: string;
  cambio?: string;
  fecha?: Moment;
  vVigente?: Moment;
  vObsoleta?: Moment;
  idDoc?: number;
  rutaContentType?: string;
  ruta?: any;
  documentoSGC?: IDocumentoSGC;
}

export class HistorialCambios implements IHistorialCambios {
  constructor(
    public id?: number,
    public code?: number,
    public actividad?: string,
    public cambio?: string,
    public fecha?: Moment,
    public vVigente?: Moment,
    public vObsoleta?: Moment,
    public idDoc?: number,
    public rutaContentType?: string,
    public ruta?: any,
    public documentoSGC?: IDocumentoSGC
  ) {}
}
