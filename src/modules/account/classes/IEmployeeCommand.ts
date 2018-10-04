import { Command } from '../../../generic/types';
import { IEmployeeCommandData } from './IEmployeeCommandData';
import { IEmployeeQuery } from './IEmployeeQuery';

export interface IEmployeeCommand extends IEmployeeQuery {
  method: Command;
  data: IEmployeeCommandData;
}