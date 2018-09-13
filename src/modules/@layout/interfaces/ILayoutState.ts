import { ILookupRoleMenuList } from '../../lookup/interfaces/ILookupRoleMenuList';
import { Anchor } from '../types/Anchor';
import { IAppUser } from './IAppUser';
import { ICurrentPage } from './ICurrentPage';
import { ISnackbarAlert } from './ISnackbarAlert';

export interface ILayoutState {
  readonly anchor: Anchor;
  readonly menuDrawer: boolean;
  readonly additionalDrawer: boolean;
  readonly accountShow: boolean;
  readonly topDrawer: boolean;
  readonly bottomDrawer: boolean;
  readonly menuItems: ILookupRoleMenuList[];
  readonly active: ICurrentPage;
  readonly user: IAppUser | null;
  readonly notification: number;
  readonly logoutDialog: boolean;
  readonly alertSnackbar: ISnackbarAlert;
}