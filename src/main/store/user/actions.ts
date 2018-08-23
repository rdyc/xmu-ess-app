import { action } from 'typesafe-actions';
import { AppUser, AppUserActionTypes } from './types';

export const fetchRequest = () => action(AppUserActionTypes.FETCH_REQUEST);
export const fetchSuccess = (data: AppUser) => action(AppUserActionTypes.FETCH_SUCCESS, data);
export const fetchError = (message: string) => action(AppUserActionTypes.FETCH_ERROR, message);