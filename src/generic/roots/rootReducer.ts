import { employeeMyReducer } from '@account/store/reducers';
import accountReducers from '@account/store/reducers/accountReducers';
import commonReducers from '@common/store/reducers/commonReducers';
import expenseReducers from '@expense/store/reducers/expenseReducers';
import { IAppState } from '@generic/interfaces';
import { appBarReducer, layoutReducer, listBarReducer, notificationReducer } from '@layout/store/reducers';
import lookupReducers from '@lookup/store/reducers/lookupReducers';
import projectReducers from '@project/store/reducers/projectReducers';
import { combineReducers } from 'redux';
import { reducer as reduxFormReducer } from 'redux-form';
import { reducer as oidcReducer } from 'redux-oidc';

export const rootReducer = combineReducers<IAppState>({
  layout: layoutReducer,
  oidc: oidcReducer,
  account: employeeMyReducer,
  notification: notificationReducer,
  form: reduxFormReducer,
  appBar: appBarReducer,
  listBar: listBarReducer,

  /* modules */
  ...commonReducers,
  ...lookupReducers,
  ...accountReducers,
  ...projectReducers,
  ...expenseReducers
});