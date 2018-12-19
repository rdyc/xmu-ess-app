import {
  genderGetAllReducer,
  genderGetByIdReducer,
  genderGetListReducer
} from '@common/store/reducers/gender';

const genderReducers = {
  commonGenderAll: genderGetAllReducer,
  commonGenderList: genderGetListReducer,
  commonGenderDetail: genderGetByIdReducer
};

export default genderReducers;
