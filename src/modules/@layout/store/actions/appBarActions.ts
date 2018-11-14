import { IListBarField } from '@layout/interfaces';
import { IAppBarMenu } from '@layout/interfaces/IAppBarState';
import { action } from 'typesafe-actions';

export const enum AppBarAction {
  ASSIGN_MENUS = '@@app-bar/ASSIGN_MENUS',
  ASSIGN_MENU_CALLBACK = '@@app-bar/ASSIGN_MENU_CALLBACK',
  ASSIGN_FIELDS = '@@app-bar/ASSIGN_FIELDS',
  ASSIGN_SEARCH_CALLBACK = '@@app-bar/ASSIGN_SEARCH_CALLBACK',
  ASSIGN_SELECTION_CLEAR_CALLBACK = '@@app-bar/ASSIGN_SELECTION_CLEAR_CALLBACK',
  ASSIGN_SELECTION_PROCESS_CALLBACK = '@@app-bar/ASSIGN_SELECTION_PROCESS_CALLBACK',
  SELECTION_ADD_REMOVE = '@@app-bar/SELECTION_ADD_REMOVE',
  SELECTION_CLEAR = '@@app-bar/SELECTION_CLEAR',
  DISPOSE = '@@app-bar/DISPOSE'
}

export const appBarAssignMenus = (items: IAppBarMenu[]) => action(AppBarAction.ASSIGN_MENUS, items);
export const appBarAssignMenuCallback = (callback: (menu: IAppBarMenu) => void) => action(AppBarAction.ASSIGN_MENU_CALLBACK, callback);
export const appBarAssignFields = (fields: IListBarField[]) => action(AppBarAction.ASSIGN_FIELDS, fields);
export const appBarAssignSearchCallback = (callback: (find: string, field?: IListBarField | undefined) => void) => action(AppBarAction.ASSIGN_SEARCH_CALLBACK, callback);
export const appBarSelectionAddRemove = (value: string) => action(AppBarAction.SELECTION_ADD_REMOVE, value);
export const appBarSelectionClear = () => action(AppBarAction.SELECTION_CLEAR);
export const appBarAssignSelectionClearCallback = (callback: () => void) => action(AppBarAction.ASSIGN_SELECTION_CLEAR_CALLBACK, callback);
export const appBarAssignSelectionProcessCallback = (callback: (values: string[]) => void) => action(AppBarAction.ASSIGN_SELECTION_PROCESS_CALLBACK, callback);
export const appBarDispose = () => action(AppBarAction.DISPOSE);