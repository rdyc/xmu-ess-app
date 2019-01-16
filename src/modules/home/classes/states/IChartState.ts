import { IQuerySingleState } from '@generic/interfaces';
import { IChartGetDetailRequest } from '../queries';
import { IChart } from '../response';

export interface IChartState {
  chartGetDetail: IQuerySingleState<IChartGetDetailRequest, IChart>;
}
