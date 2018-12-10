import { gradeGetAllReducer, gradeGetByIdReducer, gradeGetListReducer } from '@common/store/reducers/grade';

const gradeReducers = {
  commonGradeAll: gradeGetAllReducer,
  commonGradeList: gradeGetListReducer,
  commonGradeDetail: gradeGetByIdReducer
};

export default gradeReducers;