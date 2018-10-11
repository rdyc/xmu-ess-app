import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer } from '@common/store/reducers';
import activityReducers from '@common/store/reducers/activity/activityReducers';
import currencyReducers from '@common/store/reducers/currency/currencyReducers';
import projectReducers from '@common/store/reducers/project/projectReducers';

const commonReducers = {
  systemGetAll: systemGetAllReducer,
  systemGetList: systemGetListReducer,
  systemGetById: systemGetByIdReducer,
  ...activityReducers,
  ...currencyReducers,
  ...projectReducers,
};

export default commonReducers;