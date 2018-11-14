import { IListBarField } from '@layout/interfaces';
import { IAppBarMenu } from '@layout/interfaces/IAppBarState';
import { action } from 'typesafe-actions';

export const enum AppBarAction {
  ASSIGN_MENUS = '@@app-bar/ASSIGN_MENUS',
  ASSIGN_MENU_CALLBACK = '@@app-bar/ASSIGN_MENU_CALLBACK',
  ASSIGN_FIELDS = '@@app-bar/ASSIGN_FIELDS',
  ASSIGN_SEARCH_CALLBACK = '@@app-bar/ASSIGN_SEARCH_CALLBACK',
  DISPOSE = '@@app-bar/DISPOSE'
}

export const appBarAssignMenus = (items: IAppBarMenu[]) => action(AppBarAction.ASSIGN_MENUS, items);
export const appBarAssignMenuCallback = (callback: (menu: IAppBarMenu) => void) => action(AppBarAction.ASSIGN_MENU_CALLBACK, callback);
export const appBarAssignFields = (fields: IListBarField[]) => action(AppBarAction.ASSIGN_FIELDS, fields);
export const appBarAssignSearchCallback = (callback: (find: string, field?: IListBarField | undefined) => void) => action(AppBarAction.ASSIGN_SEARCH_CALLBACK, callback);
export const appBarDispose = () => action(AppBarAction.DISPOSE);