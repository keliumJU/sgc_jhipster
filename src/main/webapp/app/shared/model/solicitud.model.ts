import { Moment } from 'moment';
import { IProceso } from 'app/shared/model/proceso.model';
import { ITipoDoc } from 'app/shared/model/tipo-doc.model';
import { ITipoSolicitud } from 'app/shared/model/tipo-solicitud.model';
import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';

export interface ISolicitud {
  id?: number;
  code?: number;
  idProceso?: number;
  idTipoDoc?: number;
  idTipoSol?: number;
  fechaSol?: Moment;
  descripcion?: string;
  idDoc?: number;
  proceso?: IProceso;
  tipoDoc?: ITipoDoc;
  tipoSolicitud?: ITipoSolicitud;
  documentoSGC?: IDocumentoSGC;
}

export class Solicitud implements ISolicitud {
  constructor(
    public id?: number,
    public code?: number,
    public idProceso?: number,
    public idTipoDoc?: number,
    public idTipoSol?: number,
    public fechaSol?: Moment,
    public descripcion?: string,
    public idDoc?: number,
    public proceso?: IProceso,
    public tipoDoc?: ITipoDoc,
    public tipoSolicitud?: ITipoSolicitud,
    public documentoSGC?: IDocumentoSGC
  ) {}
}
