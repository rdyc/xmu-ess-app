import { documentPresalesGetAllReducer, documentPresalesGetByIdReducer, documentPresalesGetListReducer } from '@common/store/reducers/documentPresales';

const documentPresalesReducers = {
  commonDocumentPresalesAll: documentPresalesGetAllReducer,
  commonDocumentPresalesList: documentPresalesGetListReducer,
  commonDocumentPresalesDetail: documentPresalesGetByIdReducer
};

export default documentPresalesReducers;