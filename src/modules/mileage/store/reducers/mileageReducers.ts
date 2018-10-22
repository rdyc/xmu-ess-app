import {
  mileageApprovalGetAllReducer,
  mileageApprovalGetByIdReducer,
  mileageApprovalPostReducer,
  mileageRequestGetAllReducer,
  mileageRequestGetByIdReducer,
  mileageRequestPostReducer
} from '@mileage/store/reducers';

const mileageReducers = {
  mileageApprovalGetAll: mileageApprovalGetAllReducer,
  mileageApprovalGetById: mileageApprovalGetByIdReducer,
  mileageApprovalPost: mileageApprovalPostReducer,

  mileageRequestGetAll: mileageRequestGetAllReducer,
  mileageRequestGetById: mileageRequestGetByIdReducer,
  mileageRequestPost: mileageRequestPostReducer,
};

export default mileageReducers;
