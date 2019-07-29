import { IBaseChanges } from '@generic/interfaces';
import { ICompany, IPosition } from '@lookup/classes/response';
import { IHRTemplateItem } from './IHRTemplateItem';

export interface IHRTemplateDetail {
  uid: string;
  companyUid: string;
  company?: ICompany | null;
  positionUid: string;
  position?: IPosition | null;
  items?: IHRTemplateItem[] | null;
  changes: IBaseChanges | null;
}