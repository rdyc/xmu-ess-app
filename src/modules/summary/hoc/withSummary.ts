import { IAppState, IQueryCollectionState, IQuerySingleState } from '@generic/interfaces';
import {
  ISummaryGetBillableRequest,
  ISummaryGetEffectivenessRequest,
  ISummaryGetProfitabilityRequest,
  ISummaryGetProgressRequest,
  ISummaryGetWinningRequest,
} from '@summary/classes/queries';
import { ISummaryBillable } from '@summary/classes/response/billable';
import { ISummaryEffectiveness } from '@summary/classes/response/effectiveness';
import { ISummaryProfitability } from '@summary/classes/response/profitability';
import { ISummaryProgress } from '@summary/classes/response/progress';
import { ISummaryWinning } from '@summary/classes/response/winning';
import {
  summaryGetBillableDispose,
  summaryGetBillableRequest,
  summaryGetEffectivenessDispose,
  summaryGetEffectivenessRequest,
  summaryGetProfitabilityDispose,
  summaryGetProfitabilityRequest,
  summaryGetProgressDispose,
  summaryGetProgressRequest,
  summaryGetWinningDispose,
  summaryGetWinningRequest
} from '@summary/store/actions';
import { connect } from 'react-redux';
import { Dispatch } from 'redux';

interface PropsFromState {
  summaryState: {
    billable: IQueryCollectionState<ISummaryGetBillableRequest, ISummaryBillable>;
    effectiveness: IQueryCollectionState<ISummaryGetEffectivenessRequest, ISummaryEffectiveness>;
    profitability: IQuerySingleState<ISummaryGetProfitabilityRequest, ISummaryProfitability>;
    progress: IQuerySingleState<ISummaryGetProgressRequest, ISummaryProgress>;
    winning: IQueryCollectionState<ISummaryGetWinningRequest, ISummaryWinning>;
  };
}

interface PropsFromDispatch {
  summaryDispatch: {
    // query
    loadBillableRequest: typeof summaryGetBillableRequest;
    loadBillableDispose: typeof summaryGetBillableDispose;
    loadEffectivenessRequest: typeof summaryGetEffectivenessRequest;
    loadEffectivenessDispose: typeof summaryGetEffectivenessDispose;
    loadProfitabilityRequest: typeof summaryGetProfitabilityRequest;
    loadProfitabilityDispose: typeof summaryGetProfitabilityDispose;
    loadProgressRequest: typeof summaryGetProgressRequest;
    loadProgressDispose: typeof summaryGetProgressDispose;
    loadWinningRequest: typeof summaryGetWinningRequest;
    loadWinningDispose: typeof summaryGetWinningDispose;
  };
}

export interface WithSummaryRequest extends PropsFromState, PropsFromDispatch {}

const mapStateToProps = ({ summaryGetBillable, summaryGetEffectiveness, summaryGetProfitability, summaryGetProgress, summaryGetWinning }: IAppState) => ({
  summaryState: {
    billable: summaryGetBillable,
    effectiveness: summaryGetEffectiveness,
    profitability: summaryGetProfitability,
    progress: summaryGetProgress,
    winning: summaryGetWinning
  }
});

const mapDispatchToProps = (dispatch: Dispatch) => ({
  summaryDispatch: {
    // query
    loadBillableRequest: (request: ISummaryGetBillableRequest) => dispatch(summaryGetBillableRequest(request)),
    loadBillableDispose: () => dispatch(summaryGetBillableDispose()),
    loadEffectivenessRequest: (request: ISummaryGetEffectivenessRequest) => dispatch(summaryGetEffectivenessRequest(request)),
    loadEffectivenessDispose: () => dispatch(summaryGetEffectivenessDispose()),
    loadProfitabilityRequest: (request: ISummaryGetProfitabilityRequest) => dispatch(summaryGetProfitabilityRequest(request)),
    loadProfitabilityDispose: () => dispatch(summaryGetProfitabilityDispose()),
    loadProgressRequest: (request: ISummaryGetProgressRequest) => dispatch(summaryGetProgressRequest(request)),
    loadProgressDispose: () => dispatch(summaryGetProgressDispose()),
    loadWinningRequest: (request: ISummaryGetWinningRequest) => dispatch(summaryGetWinningRequest(request)),
    loadWinningDispose: () => dispatch(summaryGetWinningDispose()),
  }
});

export const withSummaryRequest = (component: React.ComponentType) =>
  connect(mapStateToProps, mapDispatchToProps)(component);