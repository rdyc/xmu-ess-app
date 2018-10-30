import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
 ISummaryGetBillableRequest,
 ISummaryGetEffectivenessRequest,
 ISummaryGetProfitabilityRequest,
 ISummaryGetProgressRequest,
 ISummaryGetWinningRequest
} from '@summary/classes/queries';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ISummaryProgress } from '@summary/classes/response/progress';
import { ISummaryWinning } from '@summary/classes/response/winning';

export interface ISummaryState {
  summaryGetBillable: IQueryCollectionState<ISummaryGetBillableRequest, ISummaryBillable>;
  summaryGetEffectiveness: IQuerySingleState<ISummaryGetEffectivenessRequest, ISummaryEffectiveness>;
  summaryGetProfitability: IQuerySingleState<ISummaryGetProfitabilityRequest, ISummaryProfitability>;
  summaryGetProgress: IQueryCollectionState<ISummaryGetProgressRequest, ISummaryProgress>;
  summaryGetWinning: IQueryCollectionState<ISummaryGetWinningRequest, ISummaryWinning>;
}