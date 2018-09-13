import { IEmployeeCommand } from './IEmployeeCommand';
import { IResponseSingle } from '../../../generic/interfaces/IResponseSingle';
import { IEmployee } from './IEmployee';
import { Command } from '../../../generic/types';

export interface IEmployeeProfileCommandState {
  readonly parameter: IEmployeeCommand | undefined;
  readonly method: Command | undefined;
  readonly response: IResponseSingle<IEmployee> | undefined;
  readonly loading: boolean;
  readonly errors?: string | undefined;
}