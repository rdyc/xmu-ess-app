import { IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import { 
 ISummaryBillableRequest,
 ISummaryEffectivenessRequest,
 ISummaryProfitabilityRequest,
 ISummaryProgressRequest,
 ISummaryWinningRequest
} from '@summary/classes/queries';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ISummaryProgress } from '@summary/classes/response/progress';
import { ISummaryWinning } from '@summary/classes/response/winning';

export interface ISummaryState {
  summaryBillable: IQueryCollectionState<ISummaryBillableRequest, ISummaryBillable>;
  summaryEffectiveness: IQuerySingleState<ISummaryEffectivenessRequest, ISummaryEffectiveness>;
  summaryProfitability: IQuerySingleState<ISummaryProfitabilityRequest, ISummaryProfitability>;
  summaryProgress: IQueryCollectionState<ISummaryProgressRequest, ISummaryProgress>;
  summaryWinning: IQueryCollectionState<ISummaryWinningRequest, ISummaryWinning>;
}