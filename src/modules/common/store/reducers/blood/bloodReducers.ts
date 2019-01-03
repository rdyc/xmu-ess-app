import {
  bloodGetAllReducer,
  bloodGetByIdReducer,
  bloodGetListReducer
} from '@common/store/reducers/blood';

const bloodReducers = {
  commonBloodAll: bloodGetAllReducer,
  commonBloodList: bloodGetListReducer,
  commonBloodDetail: bloodGetByIdReducer
};

export default bloodReducers;
