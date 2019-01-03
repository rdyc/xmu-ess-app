import {
  levelGetAllReducer,
  levelGetByIdReducer,
  levelGetListReducer
} from '@common/store/reducers/level';

const levelReducers = {
  commonLevelAll: levelGetAllReducer,
  commonLevelList: levelGetListReducer,
  commonLevelDetail: levelGetByIdReducer
};

export default levelReducers;
