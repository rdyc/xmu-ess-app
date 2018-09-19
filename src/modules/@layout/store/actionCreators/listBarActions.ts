import { action } from 'typesafe-actions';
import { ListBarAction as Action } from '@layout/types';
import { IBaseMetadata } from '@generic/interfaces';
import { SortDirection } from '@material-ui/core/TableCell';
import { IListBarCallback } from '@layout/interfaces';

export const setListBarMetadata = (metadata: IBaseMetadata) => action(Action.SET_METADATA, metadata);
export const setListBarReload = (isReload: boolean) => action(Action.SET_RELOAD, isReload);
export const setListBarOrder = (order: string) => action(Action.SET_ORDER, order);
export const setListBarDirection = (direction: SortDirection) => action(Action.SET_DIRECTION, direction);
export const setListBarPage = (page: number) => action(Action.SET_PAGE, page);
export const setListBarSize = (size: number) => action(Action.SET_SIZE, size);
export const setListBarCallbacks = (callbacks: IListBarCallback) => action(Action.ASSIGN_CALLBACKS, callbacks);