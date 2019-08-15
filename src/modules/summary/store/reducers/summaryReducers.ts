import {
  summaryGetBillableReducer,
  summaryGetEffectivenessReducer,
  summaryGetMappingReducer,
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
  summaryGetMapping: summaryGetMappingReducer
};

export default summaryReducers;