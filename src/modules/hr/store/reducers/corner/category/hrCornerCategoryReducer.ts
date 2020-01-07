import { hrCornerCategoryDeleteReducer } from './hrCornerCategoryDeleteReducer';
import { hrCornerCategoryGetAllReducer } from './hrCornerCategoryGetAllReducer';
import { hrCornerCategoryGetDetailReducer } from './hrCornerCategoryGetDetailReducer';
import { hrCornerCategoryGetListReducer } from './hrCornerCategoryGetListReducer';
import { hrCornerCategoryPostReducer } from './hrCornerCategoryPostReducer';
import { hrCornerCategoryPutReducer } from './hrCornerCategoryPutReducer';

export const hrCornerCategoryReducers = {
  hrCornerCategoryGetAll: hrCornerCategoryGetAllReducer,
  hrCornerCategoryGetList: hrCornerCategoryGetListReducer,
  hrCornerCategoryGetDetail: hrCornerCategoryGetDetailReducer,
  hrCornerCategoryPost: hrCornerCategoryPostReducer,
  hrCornerCategoryPut: hrCornerCategoryPutReducer,
  hrCornerCategoryDelete: hrCornerCategoryDeleteReducer,
};