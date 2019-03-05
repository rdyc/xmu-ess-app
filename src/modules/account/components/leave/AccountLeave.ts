import { AccountLeaveView } from '@account/components/leave/AccountLeaveView';
import { WithAccountEmployeeLeave, withAccountEmployeeLeave } from '@account/hoc/withAccountEmployeeLeave';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withStateHandlers,
} from 'recompose';

interface IOwnState {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnRouteParams {
  year: string;
}

interface IOwnOption {
  employeeUid: string | undefined;
}

export type AccountLeaveDetailProps
  = WithAccountEmployeeLeave
  & WithUser
  & WithLayout
  & RouteComponentProps<IOwnRouteParams> 
  & InjectedIntlProps
  & IOwnState
  & IOwnOption
  & IOwnStateUpdaters;

const createProps: mapper<AccountLeaveDetailProps, IOwnState> = (props: AccountLeaveDetailProps): IOwnState => ({ 
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  });

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateUpdaters> = {
    stateUpdate: (prevState: IOwnState) => (newState: any) => ({
      ...prevState,
      ...newState
    }),
  };

const lifecycles: ReactLifeCycleFunctions<AccountLeaveDetailProps, IOwnState> = {
    componentDidMount() {
      const { 
        layoutDispatch 
      } = this.props;
  
      const { user } = this.props.userState;
      const { loadDetailRequest } = this.props.accountEmployeeLeaveDispatch;
  
      layoutDispatch.navBackShow();
      layoutDispatch.moreShow();
      
      const yearNow = (new Date()).getFullYear();

      if (user) {
        loadDetailRequest({
          year: yearNow,
          companyUid: user.company.uid,
          employeeUid: this.props.employeeUid || user.uid,
        });
      }
    },

    componentWillUnmount() {
      const { accountEmployeeLeaveDispatch } = this.props;
  
      accountEmployeeLeaveDispatch.loadDetailDispose();
    }
  };
  
export const AccountLeave = compose<AccountLeaveDetailProps, IOwnOption>(
    withUser,
    withLayout,
    withRouter,
    withAccountEmployeeLeave,
    injectIntl,
    withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters), 
    lifecycle<AccountLeaveDetailProps, IOwnState>(lifecycles),
  )(AccountLeaveView);
  