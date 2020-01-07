import { hrCornerBlogGetAllByCategoryReducer } from './hrCornerBlogGetAllByCategoryReducer';
import { hrCornerBlogGetAllReducer } from './hrCornerBlogGetAllReducer';
import { hrCornerBlogGetDetailReducer } from './hrCornerBlogGetDetailReducer';
import { hrCornerBlogGetLatestByCategoryReducer } from './hrCornerBlogGetLatestByCategoryReducer';

export const hrCornerBlogReducers = {
  hrCornerBlogGetAll: hrCornerBlogGetAllReducer,
  hrCornerBlogGetAllByCategory: hrCornerBlogGetAllByCategoryReducer,
  hrCornerBlogGetLatestByCategory: hrCornerBlogGetLatestByCategoryReducer,
  hrCornerBlogGetDetail: hrCornerBlogGetDetailReducer
};