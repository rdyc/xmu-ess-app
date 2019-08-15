import { markdownCategoryGetAllReducer } from './category/markdownCategoryGetAllReducer';
import { markdownCategoryGetByIdReducer } from './category/markdownCategoryGetByIdReducer';
import { markdownCategoryGetListReducer } from './category/markdownCategoryGetListReducer';
import { markdownCategoryPostReducer } from './category/markdownCategoryPostReducer';
import { markdownCategoryPutReducer } from './category/markdownCategoryPutReducer';
import { markdownGetAllReducer } from './markdownGetAllReducer';
import { markdownGetByIdReducer } from './markdownGetByIdReducer';
import { markdownPostReducer } from './markdownPostReducer';
import { markdownPutReducer } from './markdownPutReducer';

const markdownReducers = {
  markdownGetAll: markdownGetAllReducer,
  markdownGetById: markdownGetByIdReducer,
  markdownPost: markdownPostReducer,
  markdownPut: markdownPutReducer,
  markdownCategoryGetAll: markdownCategoryGetAllReducer,
  markdownCategoryGetList : markdownCategoryGetListReducer,
  markdownCategoryGetById : markdownCategoryGetByIdReducer,
  markdownCategoryPost : markdownCategoryPostReducer,
  markdownCategoryPut : markdownCategoryPutReducer
};

export default markdownReducers;