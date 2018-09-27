import { IEmployee } from '@account/interfaces/response';
import { IResponseSingle } from '@generic/interfaces';

import { IEmployeeQuery } from './IEmployeeQuery';

export interface IEmployeeProfileQueryState {
    readonly parameter: IEmployeeQuery | undefined;
    readonly response: IResponseSingle<IEmployee> | undefined;
    readonly loading: boolean;
    readonly errors?: string | undefined;
}