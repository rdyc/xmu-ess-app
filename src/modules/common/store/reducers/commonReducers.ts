import activityReducers from '@common/store/reducers/activity/activityReducers';
import currencyReducers from '@common/store/reducers/currency/currencyReducers';
import documentReducers from '@common/store/reducers/document/documentReducers';
import documentPresalesReducers from '@common/store/reducers/documentPresales/documentPresalesReducers';
<<<<<<< HEAD
import leaveReducers from '@common/store/reducers/leave/leaveReducers';
import projectReducers from '@common/store/reducers/project/projectReducers';
=======
>>>>>>> develop
import siteReducers from '@common/store/reducers/site/siteReducers';

import { commonProjectReducers } from './project';

const commonReducers = {
  ...activityReducers,
  ...currencyReducers,
  ...documentReducers,
  ...documentPresalesReducers,
<<<<<<< HEAD
  ...leaveReducers,
  ...projectReducers,
=======
  ...commonProjectReducers,
>>>>>>> develop
  ...siteReducers,
};

export default commonReducers;