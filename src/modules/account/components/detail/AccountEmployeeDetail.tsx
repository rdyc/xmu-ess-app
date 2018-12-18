import { IEmployeeDetail } from '@account/classes/response';
import { AccountEmployeeUserAction } from '@account/classes/types';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
import { accountMessage } from '@account/locales/messages/accountMessage';
import AppMenu from '@constants/AppMenu';
import { SingleConfig, SingleHandler, SinglePage, SingleState } from '@layout/components/pages/singlePage/SinglePage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose } from 'recompose';
import { AccountEmployeeBank } from './AccountEmployeeBank';
import { AccountEmployeeContact } from './AccountEmployeeContact';
import { AccountEmployeeInformation } from './AccountEmployeeInformation';

const config: SingleConfig<IEmployeeDetail, AccountEmployeeDetailProps> = {
  // page info
  page: (props: AccountEmployeeDetailProps) => ({
    uid: AppMenu.Account,
    parentUid: AppMenu.Lookup,
    title: props.intl.formatMessage(accountMessage.employee.page.detailTitle),
    description: props.intl.formatMessage(accountMessage.employee.page.detailSubHeader),
  }),

  // parent url
  parentUrl: (props: AccountEmployeeDetailProps) => '/lookup/employee/list',
  
  // action centre
  showActionCentre: true,

  // more
  hasMore: true,
  moreOptions: (props: AccountEmployeeDetailProps, state: SingleState, callback: SingleHandler): IAppBarMenu[] => ([
    {
      id: AccountEmployeeUserAction.Refresh,
      name: props.intl.formatMessage(layoutMessage.action.refresh),
      enabled: true,
      visible: true,
      onClick: () => callback.handleForceReload()
    }
  ]),

  // events
  onDataLoad: (props: AccountEmployeeDetailProps, callback: SingleHandler, forceReload?: boolean | false) => {
    const { user } = props.userState;
    const { isLoading, request, response } = props.accountEmployeeState.detail;
    const { loadDetailRequest } = props.accountEmployeeDispatch;

    // when user is set and not loading and has projectUid in route params
    if (user && !isLoading && props.match.params.employeeUid) {
      // when projectUid was changed or response are empty or force to reload
      if ((request && request.employeeUid !== props.match.params.employeeUid) || !response || forceReload) {
        loadDetailRequest({
          employeeUid: props.match.params.employeeUid
        });
      } else {
        // just take data from previous response
        callback.handleResponse(response);
      }
    }
  },
  onUpdated: (states: AccountEmployeeDetailProps, callback: SingleHandler) => {
    const { isLoading, response } = states.accountEmployeeState.detail;
    
    callback.handleLoading(isLoading);
    callback.handleResponse(response);
  },

  // primary
  primaryComponent: (data: IEmployeeDetail, props: AccountEmployeeDetailProps) => (
    <AccountEmployeeInformation data={data} />
  ),

  // secondary (multiple components are allowed)
  secondaryComponents: (data: IEmployeeDetail, props: AccountEmployeeDetailProps) => ([
    <AccountEmployeeContact data={data}/>,
    <AccountEmployeeBank data={data}/> 
  ])
};

interface OwnRouteParams {
  employeeUid: string;
}

type AccountEmployeeDetailProps
  = WithUser
  & WithAccountEmployee
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps;

const accountEmployeeDetail: React.SFC<AccountEmployeeDetailProps> = props => (
  <SinglePage
    config={config}
    connectedProps={props}
  />
);

export const AccountEmployeeDetail = compose(
  withRouter,
  withUser,
  withAccountEmployee,
  injectIntl
)(accountEmployeeDetail);