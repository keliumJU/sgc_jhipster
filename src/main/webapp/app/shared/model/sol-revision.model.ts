import { IUser } from 'app/core/user/user.model';
import { ISolicitud } from 'app/shared/model/solicitud.model';

export interface ISolRevision {
  id?: number;
  code?: number;
  idUser?: number;
  idSol?: number;
  estado?: boolean;
  user?: IUser;
  solicitud?: ISolicitud;
}

export class SolRevision implements ISolRevision {
  constructor(
    public id?: number,
    public code?: number,
    public idUser?: number,
    public idSol?: number,
    public estado?: boolean,
    public user?: IUser,
    public solicitud?: ISolicitud
  ) {
    this.estado = this.estado || false;
  }
}
