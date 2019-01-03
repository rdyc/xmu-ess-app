import {
  familyGetAllReducer,
  familyGetByIdReducer,
  familyGetListReducer
} from '@common/store/reducers/family';

const familyReducers = {
  commonFamilyAll: familyGetAllReducer,
  commonFamilyList: familyGetListReducer,
  commonFamilyDetail: familyGetByIdReducer
};

export default familyReducers;
