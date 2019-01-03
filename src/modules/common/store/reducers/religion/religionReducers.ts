import {
  religionGetAllReducer,
  religionGetByIdReducer,
  religionGetListReducer
} from '@common/store/reducers/religion';

const religionReducers = {
  commonReligionAll: religionGetAllReducer,
  commonReligionList: religionGetListReducer,
  commonReligionDetail: religionGetByIdReducer
};

export default religionReducers;
