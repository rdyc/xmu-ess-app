import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AppRole } from '@constants/AppRole';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeRateDetailView } from './AccountRateDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  rateUid: string;
}

interface IOwnState {
  isAdmin: boolean;
  pageOptions?: IAppBarMenu[];
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type AccountEmployeeRateDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployeeRate
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeRateDetailProps, IOwnState> = (props: AccountEmployeeRateDetailProps): IOwnState => {
  // checking admin status
  const { user } = props.oidcState;
  let isAdmin: boolean = false;

  if (user) {
    const role: string | string[] | undefined = user.profile.role;

    if (role) {
      if (Array.isArray(role)) {
        isAdmin = role.indexOf(AppRole.Admin) !== -1;
      } else {
        isAdmin = role === AppRole.Admin;
      }
    }
  }
  return {
    isAdmin,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  };
};

const stateUpdaters: StateUpdaters<AccountEmployeeRateDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeRateDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeRateDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && props.match.params.rateUid && !props.accountEmployeeRateState.detail.isLoading) {
      props.accountEmployeeRateDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        rateId: props.match.params.rateUid
      });
    }
  },
  handleOnOpenDialog: (props: AccountEmployeeRateDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, {state: 'Rate'}),
        dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, {state: 'rate'}),
      });
    } 
  },
  handleOnCloseDialog: (props: AccountEmployeeRateDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: AccountEmployeeRateDetailProps) => () => {
    const { response } = props.accountEmployeeRateState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;
    let rateUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeUid = props.match.params.employeeUid;
      rateUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = `/account/employee/${employeeUid}/rate/form`;
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        rateUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeRateDetailProps) {
    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid ||
        this.props.match.params.rateUid !== prevProps.match.params.rateUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeRateState.detail.response !== prevProps.accountEmployeeRateState.detail.response) {
      const { isLoading } = this.props.accountEmployeeRateState.detail;

      // generate option menus
      const options: IAppBarMenu[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
          onClick: this.props.handleOnLoadApi
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: this.props.accountEmployeeRateState.detail.response && this.props.accountEmployeeRateState.detail.response.data.isActive || false,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Modify)
        },
      ];

      this.props.setOptions(options);
    }
  }
};
 
export const AccountEmployeeRateDetail = compose<AccountEmployeeRateDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployeeRate,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeRateDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('AccountEmployeeRateDetail')
)(AccountEmployeeRateDetailView);