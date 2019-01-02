import {
  employmentGetAllReducer,
  employmentGetByIdReducer,
  employmentGetListReducer
} from '@common/store/reducers/employment';

const employmentReducers = {
  commonEmploymentAll: employmentGetAllReducer,
  commonEmploymentList: employmentGetListReducer,
  commonEmploymentDetail: employmentGetByIdReducer
};

export default employmentReducers;
