import { IDocumentoSGC } from 'app/shared/model/documento-sgc.model';
import { IUser } from 'app/core/user/user.model';

export interface IDocRevision {
  id?: number;
  code?: number;
  idUser?: string;
  idDoc?: number;
  comentario1?: string;
  comentario2?: string;
  documentoSGC?: IDocumentoSGC;
  user?: IUser;
}

export class DocRevision implements IDocRevision {
  constructor(
    public id?: number,
    public code?: number,
    public idUser?: string,
    public idDoc?: number,
    public comentario1?: string,
    public comentario2?: string,
    public documentoSGC?: IDocumentoSGC,
    public user?: IUser
  ) {}
}
