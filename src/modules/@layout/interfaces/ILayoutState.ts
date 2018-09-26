import { ILookupRoleMenuList } from '../../lookup/interfaces/ILookupRoleMenuList';
import { Anchor } from '../types/Anchor';
import { IAppUser } from './IAppUser';
import { IView } from '@layout/interfaces/IView';
import { IAlert } from '@layout/interfaces/IAlert';

export interface ILayoutState {
  readonly user: IAppUser | undefined;
  readonly view: IView | undefined;
  readonly anchor: Anchor;
  readonly isDrawerMenuVisible: boolean;
  readonly isDrawerActionVisible: boolean;
  readonly isDrawerTopVisible: boolean;
  readonly isDrawerBottomVisible: boolean;
  readonly isAccountExpanded: boolean;
  readonly isModeSearch: boolean;
  readonly isModeList: boolean;
  readonly isNavBackVisible: boolean;
  readonly isSearchVisible: boolean;
  readonly isLogoutDialogVisible: boolean;
  readonly isAlertDialogVisible: boolean;
  readonly isActionCentreVisible: boolean;
  readonly isMoreVisible: boolean;
  readonly menus: ILookupRoleMenuList[];
  readonly notifCount: number;
  readonly alerts: IAlert[] | [];
}