import { IQuerySingleState } from '@generic/interfaces';
import { IEmployeeFinalGetDetailRequest } from '../queries';
import { IEmployeeFinalDetail } from '../response';

export interface IMyProfileState {
  employeeFinalGetDetail: IQuerySingleState<IEmployeeFinalGetDetailRequest, IEmployeeFinalDetail>;
}
