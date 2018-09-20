import { action } from 'typesafe-actions';
import { IBaseMetadata } from '@generic/interfaces';
import { IListBarCallback, IListBarMenuItem } from '@layout/interfaces';
import { SortDirection } from '@generic/types';

export const enum ListBarAction {
  SET_METADATA = '@@list-bar/SET_METADATA',
  SET_RELOAD = '@@list-bar/SET_RELOAD',
  SET_ORDER = '@@list-bar/SET_ORDER',
  SET_DIRECTION = '@@list-bar/SET_DIRECTION',
  SET_PAGE = '@@list-bar/SET_PAGE',
  SET_SIZE = '@@list-bar/SET_SIZE',
  ASSIGN_CALLBACKS = '@@list-bar/ASSIGN_CALLBACKS',
  CLEAR_CALLBACKS = '@@list-bar/CLEAR_CALLBACKS',
  ASSIGN_MENU_ITEMS = '@@list-bar/ASSIGN_MENU_ITEMS',
  CLEAR_MENU_ITEMS = '@@list-bar/CLEAR_MENU_ITEMS',
  MENU_SHOW = '@@list-bar/MENU_SHOW',
  MENU_HIDE = '@@list-bar/MENU_HIDE',
}

export const setListBarMetadata = (metadata: IBaseMetadata) => action(ListBarAction.SET_METADATA, metadata);
export const setListBarReload = (isReload: boolean) => action(ListBarAction.SET_RELOAD, isReload);
export const listBarOrderSet = (name: string) => action(ListBarAction.SET_ORDER, name);
export const setListBarPage = (page: number) => action(ListBarAction.SET_PAGE, page);

export const listBarDirectionSet = (direction: SortDirection) => action(ListBarAction.SET_DIRECTION, direction);
export const listBarSizeSet = (size: number) => action(ListBarAction.SET_SIZE, size);

export const listBarAssignCallbacks = (callbacks: IListBarCallback) => action(ListBarAction.ASSIGN_CALLBACKS, callbacks);
export const listBarClearCallbacks = () => action(ListBarAction.CLEAR_CALLBACKS);

export const listBarAssignMenuItems = (menuItems: IListBarMenuItem[]) => action(ListBarAction.ASSIGN_MENU_ITEMS, menuItems);
export const listBarClearMenuItems = () => action(ListBarAction.CLEAR_MENU_ITEMS);

export const listBarMenuShow = (anchorEl: string) => action(ListBarAction.MENU_SHOW, anchorEl);
export const listBarMenuHide = () => action(ListBarAction.MENU_HIDE);