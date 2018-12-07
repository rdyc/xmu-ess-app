import { IBaseChanges } from '@generic/interfaces';
import { IMenu } from '../menu/IMenu';

export interface IRoleMenu {
  roleUid: string;
  menuUid: string;
  menu: IMenu | null;
  isAccess: boolean;
  changes: IBaseChanges | null;
}