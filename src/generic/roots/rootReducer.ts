import accountReducers from '@account/store/reducers/accountReducers';
import commonReducers from '@common/store/reducers/commonReducers';
import expenseReducers from '@expense/store/reducers/expenseReducers';
import financeReducers from '@finance/store/reducers/financeReducers';
import { IAppState } from '@generic/interfaces';
import { appBarReducer, layoutReducer, listBarReducer, notificationReducer } from '@layout/store/reducers';
import { userReducer } from '@layout/store/reducers/userReducer';
import { leaveReducers } from '@leave/store/reducers/leaveReducers';
import lookupReducers from '@lookup/store/reducers/lookupReducers';
import mileageReducers from '@mileage/store/reducers/mileageReducers';
import { projectReducers } from '@project/store/reducers/projectReducers';
import purchaseReducers from '@purchase/store/reducers/purchaseReducers';
import summaryReducers from '@summary/store/reducers/summaryReducers';
import { timesheetReducers } from '@timesheet/store/reducers/timesheetReducers';
import travelReducers from '@travel/store/reducers/travelReducer';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

export const rootReducer = combineReducers<IAppState>({
  user: userReducer,
  layout: layoutReducer,
  oidc: oidcReducer,
  notification: notificationReducer,
  form: reduxFormReducer,
  appBar: appBarReducer,
  navBottom: listBarReducer,
  
  /* modules */
  ...commonReducers,
  ...lookupReducers,
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
});