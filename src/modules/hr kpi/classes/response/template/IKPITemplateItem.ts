import { ICommonSystem } from '@common/classes';
import { IBaseChanges } from '@generic/interfaces';
import { IKPIMeasurement } from '../measurement';

export interface IKPITemplateItem {
  uid: string;
  templateUid: string;
  categoryType: string;
  category?: ICommonSystem | null;
  measurementUid: string;
  measurement?: IKPIMeasurement | null;
  target: string;
  weight: number;
  changes: IBaseChanges | null;
}