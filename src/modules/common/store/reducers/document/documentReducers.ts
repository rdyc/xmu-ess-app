import { documentGetAllReducer, documentGetByIdReducer, documentGetListReducer } from '@common/store/reducers/document';

const documentReducers = {
  commonDocumentGetAll: documentGetAllReducer,
  commonDocumentGetList: documentGetListReducer,
  commonDocumentGetById: documentGetByIdReducer
};

export default documentReducers;