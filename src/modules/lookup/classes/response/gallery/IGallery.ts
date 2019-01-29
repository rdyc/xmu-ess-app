import { IBaseChanges } from '@generic/interfaces';
import { IImagePath } from './IImagePath';

export interface IGallery {
  uid: string;
  fileName: string;
  name: string;
  size: string;
  type: string;
  path: IImagePath;
  changes: IBaseChanges;
}