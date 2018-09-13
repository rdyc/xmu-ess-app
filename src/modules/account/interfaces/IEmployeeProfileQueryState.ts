import { IResponseSingle } from '../../../generic/interfaces/IResponseSingle';
import { IEmployee } from './IEmployee';
import { IEmployeeQuery } from './IEmployeeQuery';

export interface IEmployeeProfileQueryState {
    readonly parameter: IEmployeeQuery | undefined;
    readonly response: IResponseSingle<IEmployee> | undefined;
    readonly loading: boolean;
    readonly errors?: string | undefined;
}