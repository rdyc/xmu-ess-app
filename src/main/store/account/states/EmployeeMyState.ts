import { SingleResponseType } from '../../@base/SingleResponseType';
import { EmployeeMyType } from '../types/EmployeeMyType';

export interface EmployeeMyState {
    readonly employee: SingleResponseType<EmployeeMyType> | undefined;
    readonly loading: boolean;
    readonly errors?: string;
}