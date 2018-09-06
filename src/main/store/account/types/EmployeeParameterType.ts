import { EmployeeFormType } from './EmployeeFormType';
import { CommandType } from '../../../constants/commandType';

export interface EmployeeQueryType {
  uid: string;
}

export interface EmployeeCommandType extends EmployeeQueryType {
  method: CommandType;
  data: EmployeeFormType;
}