import { hrCornerBlogGetAllByCategoryReducer } from './hrCornerBlogGetAllByCategoryReducer';
import { hrCornerBlogGetAllReducer } from './hrCornerBlogGetAllReducer';
import { hrCornerBlogGetDetailReducer } from './hrCornerBlogGetDetailReducer';

export const hrCornerBlogReducers = {
  hrCornerBlogGetAll: hrCornerBlogGetAllReducer,
  hrCornerBlogGetAllByCategory: hrCornerBlogGetAllByCategoryReducer,
  hrCornerBlogGetDetail: hrCornerBlogGetDetailReducer
};