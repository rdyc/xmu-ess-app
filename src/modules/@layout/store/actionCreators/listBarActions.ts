import { action } from 'typesafe-actions';
import { ListBarAction as Action } from '@layout/types';
import { IBaseMetadata } from '@generic/interfaces';

export const setListBarMetadata = (metadata: IBaseMetadata) => action(Action.SET_METADATA, metadata);
export const setReload = (isReload: boolean) => action(Action.SET_RELOAD, isReload);