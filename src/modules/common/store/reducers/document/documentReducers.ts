import { documentGetAllReducer, documentGetByIdReducer, documentGetListReducer } from '@common/store/reducers/document';

const documentReducers = {
  commonDocumentAll: documentGetAllReducer,
  commonDocumentList: documentGetListReducer,
  commonDocumentDetail: documentGetByIdReducer
};

export default documentReducers;