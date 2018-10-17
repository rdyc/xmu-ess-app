import activityReducers from '@common/store/reducers/activity/activityReducers';
import currencyReducers from '@common/store/reducers/currency/currencyReducers';
import documentReducers from '@common/store/reducers/document/documentReducers';
import documentPresalesReducers from '@common/store/reducers/documentPresales/documentPresalesReducers';
import siteReducers from '@common/store/reducers/site/siteReducers';

import { commonProjectReducers } from './project';

const commonReducers = {
  ...activityReducers,
  ...currencyReducers,
  ...documentReducers,
  ...documentPresalesReducers,
  ...commonProjectReducers,
  ...siteReducers,
};

export default commonReducers;