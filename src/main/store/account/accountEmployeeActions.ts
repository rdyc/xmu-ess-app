import { action } from 'typesafe-actions';
import { AccountEmployeeMyType } from './types/AccountEmployeeMyType';
import { AccountEmployeeAction } from './actions/AccountEmployeeAction';

export const accountEmployeeFetchRequest = () => action(AccountEmployeeAction.FETCH_REQUEST);
// tslint:disable-next-line:max-line-length
export const accountEmployeeFetchSuccess = (data: AccountEmployeeMyType) => action(AccountEmployeeAction.FETCH_SUCCESS, data);
export const accountEmployeeFetchError = (message: string) => action(AccountEmployeeAction.FETCH_ERROR, message);