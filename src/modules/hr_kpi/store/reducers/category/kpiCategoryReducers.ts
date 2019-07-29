import {
  kpiCategoryGetAllReducer,
  kpiCategoryGetByIdReducer,
  kpiCategoryGetListReducer,
  kpiCategoryPostReducer,
  kpiCategoryPutReducer
} from '@kpi/store/reducers/category';

const kpiCategoryReducers = {
  kpiCategoryGetAll: kpiCategoryGetAllReducer,
  kpiCategoryGetList: kpiCategoryGetListReducer,
  kpiCategoryGetById: kpiCategoryGetByIdReducer,
  kpiCategoryPost: kpiCategoryPostReducer,
  kpiCategoryPut: kpiCategoryPutReducer,
};

export default kpiCategoryReducers;