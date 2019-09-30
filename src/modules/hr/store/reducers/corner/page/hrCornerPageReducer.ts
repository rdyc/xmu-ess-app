import { hrCornerPageDeleteReducer } from './hrCornerPageDeleteReducer';
import { hrCornerPageGetAllReducer } from './hrCornerPageGetAllReducer';
import { hrCornerPageGetDetailReducer } from './hrCornerPageGetDetailReducer';
import { hrCornerPagePostReducer } from './hrCornerPagePostReducer';
import { hrCornerPagePutReducer } from './hrCornerPagePutReducer';

export const hrCornerPageReducers = {
  hrCornerPageGetAll: hrCornerPageGetAllReducer,
  hrCornerPageGetDetail: hrCornerPageGetDetailReducer,
  hrCornerPagePost: hrCornerPagePostReducer,
  hrCornerPagePut: hrCornerPagePutReducer,
  hrCornerPageDelete: hrCornerPageDeleteReducer,
};