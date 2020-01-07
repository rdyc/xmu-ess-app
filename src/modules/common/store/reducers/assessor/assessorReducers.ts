import { assessorGetAllReducer, assessorGetByIdReducer, assessorGetListReducer } from '@common/store/reducers/assessor';

const assessorReducers = {
  commonAssessorAll: assessorGetAllReducer,
  commonAssessorList: assessorGetListReducer,
  commonAssessorDetail: assessorGetByIdReducer
};

export default assessorReducers;