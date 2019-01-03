import {
  certificationGetAllReducer,
  certificationGetByIdReducer,
  certificationGetListReducer
} from '@common/store/reducers/certification';

const certificationReducers = {
  commonCertificationAll: certificationGetAllReducer,
  commonCertificationList: certificationGetListReducer,
  commonCertificationDetail: certificationGetByIdReducer
};

export default certificationReducers;
