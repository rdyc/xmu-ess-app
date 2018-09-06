import { SingleResponseType } from '../../@base/SingleResponseType';
import { EmployeeProfileType } from '../types/EmployeeProfileType';
import { EmployeeParameterType } from '../types/EmployeeParameterType';

export interface EmployeeProfileState {
    readonly parameter: EmployeeParameterType | undefined;
    readonly response: SingleResponseType<EmployeeProfileType> | undefined;
    readonly loading: boolean;
    readonly errors?: string;
}