import { IBaseChanges } from '@generic/interfaces';

export interface ILookupVersion {
  client: string;
  version: string;
  notes?: string;
  changes?: IBaseChanges;
}