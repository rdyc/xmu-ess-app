import { systemGetAllReducer, systemGetByIdReducer, systemGetListReducer } from '@common/store/reducers';
import activityReducers from '@common/store/reducers/activity/activityReducers';
import currencyReducers from '@common/store/reducers/currency/currencyReducers';
import documentReducers from '@common/store/reducers/document/documentReducers';
import documentPresalesReducers from '@common/store/reducers/documentPresales/documentPresalesReducers';
import projectReducers from '@common/store/reducers/project/projectReducers';
import siteReducers from '@common/store/reducers/site/siteReducers';

const commonReducers = {
  systemGetAll: systemGetAllReducer,
  systemGetList: systemGetListReducer,
  systemGetById: systemGetByIdReducer,
  ...activityReducers,
  ...currencyReducers,
  ...documentReducers,
  ...documentPresalesReducers,
  ...projectReducers,
  ...siteReducers,
};

export default commonReducers;