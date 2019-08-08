import { IBaseChanges } from '@generic/interfaces';

export interface IMarkdownCategory {
  uid: string;
  name: string;
  description?: string;
  isActive: boolean;
  changes?: IBaseChanges;
}