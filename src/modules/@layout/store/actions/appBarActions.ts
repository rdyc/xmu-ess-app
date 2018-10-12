import { IAppBarMenu } from '@layout/interfaces/IAppBarState';
import { action } from 'typesafe-actions';

export const enum AppBarAction {
  ASSIGN_CALLBACK = '@@app-bar/ASSIGN_CALLBACK',
  ASSIGN_MENUS = '@@app-bar/ASSIGN_MENUS',
  DISPOSE = '@@app-bar/DISPOSE',
  MENU_HIDE = '@@app-bar/MENU_HIDE',
  MENU_SHOW = '@@app-bar/MENU_SHOW',
}

export const appBarAssignCallback = (callback: (menu: IAppBarMenu) => void) => action(AppBarAction.ASSIGN_CALLBACK, callback);
export const appBarAssignMenus = (items: IAppBarMenu[]) => action(AppBarAction.ASSIGN_MENUS, items);
export const appBarMenuShow = () => action(AppBarAction.MENU_SHOW);
export const appBarMenuHide = () => action(AppBarAction.MENU_HIDE);
export const appBarDispose = () => action(AppBarAction.DISPOSE);