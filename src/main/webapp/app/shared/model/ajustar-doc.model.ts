import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { IUser } from 'app/core/user/user.model';
import { ICargo } from 'app/shared/model/cargo.model';
import { IAccionDoc } from 'app/shared/model/accion-doc.model';

export interface IAjustarDoc {
  id?: number;
  code?: number;
  idUser?: string;
  idCargo?: number;
  idAccion?: number;
  idDoc?: number;
  documentoSGC?: IDocumentoSGC;
  user?: IUser;
  cargo?: ICargo;
  accionDoc?: IAccionDoc;
}

export class AjustarDoc implements IAjustarDoc {
  constructor(
    public id?: number,
    public code?: number,
    public idUser?: string,
    public idCargo?: number,
    public idAccion?: number,
    public idDoc?: number,
    public documentoSGC?: IDocumentoSGC,
    public user?: IUser,
    public cargo?: ICargo,
    public accionDoc?: IAccionDoc
  ) {}
}
