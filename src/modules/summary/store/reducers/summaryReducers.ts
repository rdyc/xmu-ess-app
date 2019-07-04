import {
  summaryGetBillableReducer,
  summaryGetEffectivenessReducer,
  summaryGetProfitabilityReducer,
  summaryGetProgressReducer,
  summaryGetWinningReducer
} from '@summary/store/reducers';

const summaryReducers = {
  summaryGetBillable: summaryGetBillableReducer,
  summaryGetEffectiveness: summaryGetEffectivenessReducer,
  summaryGetProfitability: summaryGetProfitabilityReducer,
  summaryGetProgress: summaryGetProgressReducer,
  summaryGetWinning: summaryGetWinningReducer,
};

export default summaryReducers;