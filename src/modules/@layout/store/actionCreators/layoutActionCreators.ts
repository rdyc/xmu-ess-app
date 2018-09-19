import { action } from 'typesafe-actions';

import { ILookupRoleMenuList } from '../../../lookup/interfaces/ILookupRoleMenuList';
import { IAppUser, ICurrentPage } from '../../interfaces';
import { ISnackbarAlert } from '../../interfaces/ISnackbarAlert';
import { Anchor, LayoutAction as Action } from '../../types';

export const setAnchor = (anchor: Anchor) => action(Action.SET_ANCHOR, anchor);
export const setMenuDrawer = (open: boolean) => action(Action.SET_MENU_DRAWER, open);
export const setAdditionalDrawer = (open: boolean) => action(Action.SET_ADDITIONAL_DRAWER, open);
export const setAccountShow = (open: boolean) => action(Action.SET_ACCOUNT_SHOW, open);

export const searchModeOn = () => action(Action.SEARCH_MODE_ON);
export const searchModeOff = () => action(Action.SEARCH_MODE_OFF);

export const listModeOn = () => action(Action.LIST_MODE_ON);
export const listModeOff = () => action(Action.LIST_MODE_OFF);

export const setTopDrawer = (open: boolean) => action(Action.SET_TOP_DRAWER, open);
export const setBottomDrawer = (open: boolean) => action(Action.SET_ANCHOR, open);
export const setMenuItems = (items: ILookupRoleMenuList[]) => action(Action.SET_MENU_ITEMS, items);
export const setCurrentPage = (active: ICurrentPage | null) => action(Action.SET_ACTIVE, active);
export const setUser = (user: IAppUser) => action(Action.SET_USER, user);
export const setNotification = (count: number) => action(Action.SET_NOTIFICATION, count);
export const setLogoutDialog = (open: boolean) => action(Action.SET_LOGOUT_DIALOG, open);
export const setAlertSnackbar = (data: ISnackbarAlert) => action(Action.SET_ALERT_SNACKBAR, data);
export const setNavBack = (enabled: boolean) => action(Action.SET_NAV_BACK, enabled);