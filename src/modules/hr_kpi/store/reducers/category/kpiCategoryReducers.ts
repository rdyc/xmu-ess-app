import {
  kpiCategoryGetAllReducer,
  kpiCategoryGetByIdReducer,
  kpiCategoryGetListReducer,
  kpiCategoryMeasurementPostReducer,
  kpiCategoryPostReducer,
  kpiCategoryPutReducer,
} from '@kpi/store/reducers/category';

const kpiCategoryReducers = {
  kpiCategoryGetAll: kpiCategoryGetAllReducer,
  kpiCategoryGetList: kpiCategoryGetListReducer,
  kpiCategoryGetById: kpiCategoryGetByIdReducer,
  kpiCategoryPost: kpiCategoryPostReducer,
  kpiCategoryMeasurementPost: kpiCategoryMeasurementPostReducer,
  kpiCategoryPut: kpiCategoryPutReducer,
};

export default kpiCategoryReducers;