import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { IPeriodDeleteRequest } from '../queries/period/IPeriodDeleteRequest';
import { IPeriodGetAllRequest } from '../queries/period/IPeriodGetAllRequest';
import { IPeriodGetByIdRequest } from '../queries/period/IPeriodGetByIdRequest';
import { IPeriodPostRequest } from '../queries/period/IPeriodPostRequest';
import { IPeriodPutRequest } from '../queries/period/IPeriodPutRequest';
import { IPeriod } from '../response';

export interface IHRNotifState {
  // period
  periodGetAll: IQueryCollectionState<IPeriodGetAllRequest, IPeriod>;
  periodGetById: IQuerySingleState<IPeriodGetByIdRequest, IPeriod>;
  periodPost: IQuerySingleState<IPeriodPostRequest, IPeriod>;
  periodPut: IQuerySingleState<IPeriodPutRequest, IPeriod>;
  periodDelete: IQuerySingleState<IPeriodDeleteRequest, boolean>;
}