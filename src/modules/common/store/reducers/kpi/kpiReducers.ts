import {
  kpiGetAllReducer,
  kpiGetByIdReducer,
  kpiGetListReducer
} from '@common/store/reducers/kpi';

const kpiReducers = {
  commonKpiAll: kpiGetAllReducer,
  commonKpiList: kpiGetListReducer,
  commonKpiDetail: kpiGetByIdReducer
};

export default kpiReducers;
