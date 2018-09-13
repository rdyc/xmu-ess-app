import { IEmployeeCommandData } from './IEmployeeCommandData';
import { IEmployeeQuery } from './IEmployeeQuery';
import { Command } from '../../../generic/types';

export interface IEmployeeCommand extends IEmployeeQuery {
  method: Command;
  data: IEmployeeCommandData;
}