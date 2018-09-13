import { IResponseSingle } from '../../../generic/interfaces/IResponseSingle';
import { IEmployeeMy } from './IEmployeeMy';

export interface IEmployeeMyState {
    readonly employee: IResponseSingle<IEmployeeMy> | undefined;
    readonly loading: boolean;
    readonly errors?: string;
}