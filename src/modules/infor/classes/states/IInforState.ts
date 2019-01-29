import { IQuerySingleState } from '@generic/interfaces';

import { IInforPostRequest } from '../queries';
import { IInforResult } from '../response';

export interface IInforState {
  // upload
  inforFilePost: IQuerySingleState<IInforPostRequest, IInforResult>;
}