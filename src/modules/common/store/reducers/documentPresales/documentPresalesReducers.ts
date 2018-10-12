import { documentPresalesGetAllReducer, documentPresalesGetByIdReducer, documentPresalesGetListReducer } from '@common/store/reducers/documentPresales';

const documentPresalesReducers = {
  commonDocumentPresalesGetAll: documentPresalesGetAllReducer,
  commonDocumentPresalesGetList: documentPresalesGetListReducer,
  commonDocumentPresalesGetById: documentPresalesGetByIdReducer
};

export default documentPresalesReducers;