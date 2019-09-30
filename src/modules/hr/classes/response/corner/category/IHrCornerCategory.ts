import { IBaseChanges } from '@generic/interfaces';

export interface IHrCornerCategory {
  uid: string;
  name: string;
  description: string;
  slug: string;
  changes?: IBaseChanges;
}