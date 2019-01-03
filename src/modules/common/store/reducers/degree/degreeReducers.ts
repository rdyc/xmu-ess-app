import {
  degreeGetAllReducer,
  degreeGetByIdReducer,
  degreeGetListReducer
} from '@common/store/reducers/degree';

const degreeReducers = {
  commonDegreeAll: degreeGetAllReducer,
  commonDegreeList: degreeGetListReducer,
  commonDegreeDetail: degreeGetByIdReducer
};

export default degreeReducers;
