import { AccountLeaveView } from '@account/components/views/AccountLeaveView';
import { WithAccountEmployeeLeave, withAccountEmployeeLeave } from '@account/hoc/withAccountEmployeeLeave';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
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

interface OwnState {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

interface OwnRouteParams {
  year: string;
}

export type AccountLeaveDetailProps
  = WithAccountEmployeeLeave
  & WithUser
  & WithLayout
  & WithAppBar
  & RouteComponentProps<OwnRouteParams> 
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<AccountLeaveDetailProps, OwnState> = (props: AccountLeaveDetailProps): OwnState => ({ 
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  });

const stateUpdaters: StateUpdaters<{}, OwnState, OwnStateUpdaters> = {
    stateUpdate: (prevState: OwnState) => (newState: any) => ({
      ...prevState,
      ...newState
    }),
    stateReset: (prevState: OwnState) => () => ({
      ...prevState,
      dialogFullScreen: false,
      dialogOpen: false,
      dialogTitle: undefined,
      dialogDescription: undefined,
      dialogCancelText: 'global.action.cancel',
      dialogConfirmedText: 'global.action.ok',
    })
  };

const lifecycles: ReactLifeCycleFunctions<AccountLeaveDetailProps, OwnState> = {
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
          employeeUid: user.uid,
        });
      }
    },

    componentWillUnmount() {
      const { layoutDispatch, appBarDispatch, accountEmployeeLeaveDispatch } = this.props;
  
      layoutDispatch.changeView(null);
      layoutDispatch.navBackHide();
      layoutDispatch.moreHide();
      layoutDispatch.actionCentreHide();
  
      appBarDispatch.dispose();
  
      accountEmployeeLeaveDispatch.loadDetailDispose();
    }
  };
  
export const AccountLeave = compose<AccountLeaveDetailProps, {}>(
    withUser,
    withLayout,
    withAppBar,
    withRouter,
    withAccountEmployeeLeave,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters), 
    lifecycle<AccountLeaveDetailProps, OwnState>(lifecycles),
  )(AccountLeaveView);
  