import { IBaseChanges } from '@generic/interfaces';
import { ICompany, IPosition } from '@lookup/classes/response';
import { IKPITemplateItem } from './IKPITemplateItem';

export interface IKPITemplateDetail {
  uid: string;
  companyUid: string;
  company?: ICompany | null;
  positionUid: string;
  position?: IPosition | null;
  name: string;
  note?: string;
  items?: IKPITemplateItem[] | null;
  changes: IBaseChanges | null;
}