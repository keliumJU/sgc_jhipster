import { IEstadoDoc } from 'app/shared/model/estado-doc.model';
import { IProceso } from 'app/shared/model/proceso.model';
import { ITipoDoc } from 'app/shared/model/tipo-doc.model';

export interface IDocumentoSGC {
  id?: number;
  codigo?: number;
  idProceso?: number;
  idTipoDoc?: number;
  nomDoc?: string;
  rutaContentType?: string;
  ruta?: any;
  idEstado?: number;
  version?: number;
  estadoDoc?: IEstadoDoc;
  proceso?: IProceso;
  tipoDoc?: ITipoDoc;
}

export class DocumentoSGC implements IDocumentoSGC {
  constructor(
    public id?: number,
    public codigo?: number,
    public idProceso?: number,
    public idTipoDoc?: number,
    public nomDoc?: string,
    public rutaContentType?: string,
    public ruta?: any,
    public idEstado?: number,
    public version?: number,
    public estadoDoc?: IEstadoDoc,
    public proceso?: IProceso,
    public tipoDoc?: ITipoDoc
  ) {}
}
