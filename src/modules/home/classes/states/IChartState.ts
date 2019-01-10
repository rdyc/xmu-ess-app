import { IQueryCollectionState } from '@generic/interfaces';
import { IChartGetAllRequest } from '../queries';
import { IChart } from '../response';

export interface IChartState {
  chartGetAll: IQueryCollectionState<IChartGetAllRequest, IChart>;
}
