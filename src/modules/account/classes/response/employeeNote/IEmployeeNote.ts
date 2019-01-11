import { IBaseChanges } from '@generic/interfaces';

export interface IEmployeeNote {
  id: number;
  text: string;
  changes?: IBaseChanges;  
}