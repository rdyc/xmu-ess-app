import { SingleResponseType } from '../../@base/SingleResponseType';
import { EmployeeProfileType } from '../types/EmployeeProfileType';
import { EmployeeQueryType, EmployeeCommandType } from '../types/EmployeeParameterType';
import { CommandType } from '../../../constants/commandType';

export interface EmployeeProfileQueryState {
    readonly parameter: EmployeeQueryType | undefined;
    readonly response: SingleResponseType<EmployeeProfileType> | undefined;
    readonly loading: boolean;
    readonly errors?: string | undefined;
}

export interface EmployeeProfileCommandState {
    readonly parameter: EmployeeCommandType | undefined;
    readonly method: CommandType | undefined;
    readonly response: SingleResponseType<EmployeeProfileType> | undefined;
    readonly loading: boolean;
    readonly errors?: string | undefined;
}