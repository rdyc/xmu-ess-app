import { SingleResponseType } from '../../@base/SingleResponseType';
import { AccountEmployeeMyType } from '../types/AccountEmployeeMyType';

export interface AccountEmployeeMyState {
    readonly employee: SingleResponseType<AccountEmployeeMyType> | undefined;
    readonly loading: boolean;
    readonly errors?: string;
}