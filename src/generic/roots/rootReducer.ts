import accountReducers from '@account/store/reducers/accountReducers';
import commonReducers from '@common/store/reducers/commonReducers';
import expenseReducers from '@expense/store/reducers/expenseReducers';
import financeReducers from '@finance/store/reducers/financeReducers';
import { IAppState } from '@generic/interfaces';
import { homeReducers } from '@home/store/reducers/homeReducers';
import { kpiReducers } from '@kpi/store/reducers/kpiReducers';
import { appBarReducer, layoutReducer, listBarReducer, notificationReducer, pageReducer } from '@layout/store/reducers';
import { userReducer } from '@layout/store/reducers/userReducer';
import { leaveReducers } from '@leave/store/reducers/leaveReducers';
import lookupReducers from '@lookup/store/reducers/lookupReducers';
import mileageReducers from '@mileage/store/reducers/mileageReducers';
import organizationReducers from '@organization/store/reducers/organizationReducers';
import { projectReducers } from '@project/store/reducers/projectReducers';
import purchaseReducers from '@purchase/store/reducers/purchaseReducers';
import summaryReducers from '@summary/store/reducers/summaryReducers';
import { timesheetReducers } from '@timesheet/store/reducers/timesheetReducers';
import travelReducers from '@travel/store/reducers/travelReducer';
import { inforReducers } from 'modules/infor/store/reducers/inforReducers';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

export const rootReducer = combineReducers<IAppState>({
  oidc: oidcReducer,
  user: userReducer,
  layout: layoutReducer,
  view: pageReducer,
  notification: notificationReducer,
  form: reduxFormReducer,
  appBar: appBarReducer,
  navBottom: listBarReducer,
  
  /* modules */
  ...commonReducers,
  ...lookupReducers,
  ...organizationReducers,
  ...accountReducers,
  ...projectReducers,
  ...leaveReducers,
  ...timesheetReducers,
  ...financeReducers,
  ...expenseReducers,
  ...purchaseReducers,
  ...mileageReducers,
  ...travelReducers,
  ...summaryReducers,
  ...organizationReducers,
  ...homeReducers,
  ...inforReducers,
  ...kpiReducers
});