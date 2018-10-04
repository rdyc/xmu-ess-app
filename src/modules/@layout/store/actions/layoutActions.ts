import { action } from 'typesafe-actions';

import { ILookupRoleMenuList } from '@lookup/classes';
import { IAppUser, IView } from '@layout/interfaces';
import { IAlert } from '@layout/interfaces/IAlert';
import { Anchor } from '@layout/types';

export const enum LayoutAction {
  ASSIGN_USER = '@@layout/ASSIGN_USER',
  ASSIGN_MENUS = '@@layout/ASSIGN_MENUS',

  ACCOUNT_EXPAND = '@@layout/ACCOUNT_EXPAND',
  ACCOUNT_COLAPSE = '@@layout/ACCOUNT_COLAPSE',
  
  ALERT_ADD = '@@layout/ALERT_ADD',
  ALERT_DISSMIS = '@@layout/ALERT_DISSMIS',
  
  CHANGE_ANCHOR = '@@layout/CHANGE_ANCHOR',
  CHANGE_NOTIF_COUNT = '@@layout/CHANGE_NOTIF_COUNT',
  CHANGE_VIEW = '@@layout/CHANGE_VIEW',
  
  DRAWER_MENU_SHOW = '@@layout/DRAWER_MENU_SHOW',
  DRAWER_MENU_HIDE = '@@layout/DRAWER_MENU_HIDE',
  DRAWER_ACTION_SHOW = '@@layout/DRAWER_ACTION_SHOW',
  DRAWER_ACTION_HIDE = '@@layout/DRAWER_ACTION_HIDE',
  DRAWER_TOP_SHOW = '@@layout/DRAWER_TOP_SHOW',
  DRAWER_TOP_HIDE = '@@layout/DRAWER_TOP_HIDE',
  DRAWER_BOTTOM_SHOW = '@@layout/DRAWER_BOTTOM_SHOW',
  DRAWER_BOTTOM_HIDE = '@@layout/DRAWER_BOTTOM_HIDE',

  NAV_BACK_SHOW = '@@layout/NAV_BACK_SHOW',
  NAV_BACK_HIDE = '@@layout/NAV_BACK_HIDE',
  ACTION_CENTRE_SHOW = '@@layout/ACTION_CENTRE_SHOW',
  ACTION_CENTRE_HIDE = '@@layout/ACTION_CENTRE_HIDE',
  MORE_SHOW = '@@layout/MORE_SHOW',
  MORE_HIDE = '@@layout/MORE_HIDE',
  SEARCH_SHOW = '@@layout/SEARCH_SHOW',
  SEARCH_HIDE = '@@layout/SEARCH_HIDE',
  ALERT_DIALOG_SHOW = '@@layout/ALERT_DIALOG_SHOW',
  ALERT_DIALOG_HIDE = '@@layout/ALERT_DIALOG_HIDE',
  LOGOUT_DIALOG_SHOW = '@@layout/LOGOUT_DIALOG_SHOW',
  LOGOUT_DIALOG_HIDE = '@@layout/LOGOUT_DIALOG_HIDE',

  MODE_SEARCH_ON = '@@layout/MODE_SEARCH_ON',
  MODE_SEARCH_OFF = '@@layout/MODE_SEARCH_OFF',
  MODE_LIST_ON = '@@layout/MODE_LIST_ON',
  MODE_LIST_OFF = '@@layout/MODE_LIST_OFF',
}

export const layoutAssignUser = (user: IAppUser) => action(LayoutAction.ASSIGN_USER, user);
export const layoutAssignMenus = (menus: ILookupRoleMenuList[]) => action(LayoutAction.ASSIGN_MENUS, menus);

export const layoutAccountExpand = () => action(LayoutAction.ACCOUNT_EXPAND);
export const layoutAccountColapse = () => action(LayoutAction.ACCOUNT_COLAPSE);

export const layoutAlertAdd = (alert: IAlert) => action(LayoutAction.ALERT_ADD, alert);
export const layoutAlertDismiss = () => action(LayoutAction.ALERT_DISSMIS);

export const layoutChangeAnchor = (anchor: Anchor) => action(LayoutAction.CHANGE_ANCHOR, anchor);
export const layoutChangeNotif = (count: number) => action(LayoutAction.CHANGE_NOTIF_COUNT, count);
export const layoutChangeView = (view: IView | null) => action(LayoutAction.CHANGE_VIEW, view);

export const layoutDrawerMenuShow = () => action(LayoutAction.DRAWER_MENU_SHOW);
export const layoutDrawerMenuHide = () => action(LayoutAction.DRAWER_MENU_HIDE);
export const layoutDrawerActionShow = () => action(LayoutAction.DRAWER_ACTION_SHOW);
export const layoutDrawerActionHide = () => action(LayoutAction.DRAWER_ACTION_HIDE);
export const layoutDrawerTopShow = () => action(LayoutAction.DRAWER_TOP_SHOW);
export const layoutDrawerTopHide = () => action(LayoutAction.DRAWER_TOP_HIDE);
export const layoutDrawerBottomShow = () => action(LayoutAction.DRAWER_BOTTOM_SHOW);
export const layoutDrawerBottomHide = () => action(LayoutAction.DRAWER_BOTTOM_HIDE);

export const layoutNavBackShow = () => action(LayoutAction.NAV_BACK_SHOW);
export const layoutNavBackHide = () => action(LayoutAction.NAV_BACK_HIDE);
export const layoutActionCentreShow = () => action(LayoutAction.ACTION_CENTRE_SHOW);
export const layoutActionCentreHide = () => action(LayoutAction.ACTION_CENTRE_HIDE);
export const layoutMoreShow = () => action(LayoutAction.MORE_SHOW);
export const layoutMoreHide = () => action(LayoutAction.MORE_HIDE);
export const layoutSearchShow = () => action(LayoutAction.SEARCH_SHOW);
export const layoutSearchHide = () => action(LayoutAction.SEARCH_HIDE);
export const layoutAlertDialogShow = () => action(LayoutAction.ALERT_DIALOG_SHOW);
export const layoutAlertDialogHide = () => action(LayoutAction.ALERT_DIALOG_HIDE);
export const layoutLogoutDialogShow = () => action(LayoutAction.LOGOUT_DIALOG_SHOW);
export const layoutLogoutDialogHide = () => action(LayoutAction.LOGOUT_DIALOG_HIDE);

export const layoutModeSearchOn = () => action(LayoutAction.MODE_SEARCH_ON);
export const layoutModeSearchOff = () => action(LayoutAction.MODE_SEARCH_OFF);
export const layoutModeListOn = () => action(LayoutAction.MODE_LIST_ON);
export const layoutModeListOff = () => action(LayoutAction.MODE_LIST_OFF);