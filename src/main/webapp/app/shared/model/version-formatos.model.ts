export interface IVersionFormatos {
  id?: number;
  code?: number;
  idFormato?: number;
  rutaFormatoContentType?: string;
  rutaFormato?: any;
  nomFormato?: string;
}

export class VersionFormatos implements IVersionFormatos {
  constructor(
    public id?: number,
    public code?: number,
    public idFormato?: number,
    public rutaFormatoContentType?: string,
    public rutaFormato?: any,
    public nomFormato?: string
  ) {}
}
