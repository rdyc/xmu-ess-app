import { IBaseMetadata } from '@generic/interfaces';
import { SortDirection } from '@generic/types';
import { IListBarCallback, IListBarField } from '@layout/interfaces';
import { action } from 'typesafe-actions';

export const enum ListBarAction {
  ASSIGN_METADATA = '@@list-bar/ASSIGN_METADATA',
  ASSIGN_CALLBACKS = '@@list-bar/ASSIGN_CALLBACKS',
  ASSIGN_FIELDS = '@@list-bar/ASSIGN_FIELDS',
  CHANGE_DIRECTION = '@@list-bar/CHANGE_DIRECTION',
  CHANGE_ORDER = '@@list-bar/CHANGE_ORDER',
  CHANGE_SIZE = '@@list-bar/CHANGE_SIZE',
  DISPOSE = '@@list-bar/DISPOSE',
  LOADING = '@@list-bar/LOADING',
  MENU_HIDE = '@@list-bar/MENU_HIDE',
  MENU_SHOW = '@@list-bar/MENU_SHOW',
}

export const listBarMetadata = (metadata: IBaseMetadata) => action(ListBarAction.ASSIGN_METADATA, metadata);
export const listBarAssignCallbacks = (callbacks: IListBarCallback) => action(ListBarAction.ASSIGN_CALLBACKS, callbacks);
export const listBarAssignFields = (fields: IListBarField[]) => action(ListBarAction.ASSIGN_FIELDS, fields);
export const listBarChangeOrder = (name: string) => action(ListBarAction.CHANGE_ORDER, name);
export const listBarChangeDirection = (direction: SortDirection) => action(ListBarAction.CHANGE_DIRECTION, direction);
export const listBarChangeSize = (size: number) => action(ListBarAction.CHANGE_SIZE, size);
export const listBarDispose = () => action(ListBarAction.DISPOSE);
export const listBarLoading = (isLoading: boolean) => action(ListBarAction.LOADING, isLoading);
export const listBarMenuShow = (anchorEl: string) => action(ListBarAction.MENU_SHOW, anchorEl);
export const listBarMenuHide = () => action(ListBarAction.MENU_HIDE);