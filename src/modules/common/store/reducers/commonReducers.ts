import activityReducers from '@common/store/reducers/activity/activityReducers';
import currencyReducers from '@common/store/reducers/currency/currencyReducers';
import destinationReducers from '@common/store/reducers/destination/destinationReducers';
import documentReducers from '@common/store/reducers/document/documentReducers';
import documentPresalesReducers from '@common/store/reducers/documentPresales/documentPresalesReducers';
import expenseReducers from '@common/store/reducers/expense/expenseReducers';
import leaveReducers from '@common/store/reducers/leave/leaveReducers';
import siteReducers from '@common/store/reducers/site/siteReducers';
import { commonProjectReducers } from './project';
import purposeReducers from './purpose/purposeReducers';
import statusReducers from './status/statusReducers';
import transportationReducers from './transportation/transportationReducers';

const commonReducers = {
  ...activityReducers,
  ...currencyReducers,
  ...documentReducers,
  ...documentPresalesReducers,
  ...commonProjectReducers,
  ...siteReducers,
  ...expenseReducers,
  ...leaveReducers,
  ...statusReducers,
  ...destinationReducers,
  ...purposeReducers,
  ...transportationReducers,
};

export default commonReducers;