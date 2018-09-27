import { IEmployee } from '@account/interfaces/response';
import { IResponseSingle } from '@generic/interfaces';
import { Command } from '@generic/types';

import { IEmployeeCommand } from './IEmployeeCommand';

export interface IEmployeeProfileCommandState {
  readonly parameter: IEmployeeCommand | undefined;
  readonly method: Command | undefined;
  readonly response: IResponseSingle<IEmployee> | undefined;
  readonly loading: boolean;
  readonly errors?: string | undefined;
}