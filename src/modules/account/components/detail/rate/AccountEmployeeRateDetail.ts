import { WithAccountEmployeeRate, withAccountEmployeeRate } from '@account/hoc/withAccountEmployeeRate';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { LookupUserAction } from '@lookup/classes/types';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { AccountEmployeeRateDetailView } from './AccountRateDetailView';

interface IOwnRouteParams {
  employeeUid: string;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
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
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setCreate: StateHandler<IOwnState>;
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
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<AccountEmployeeRateDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: AccountEmployeeRateDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: AccountEmployeeRateDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, {state: 'Rate'}),
    dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, {state: 'rate'}),
  }),
  setCreate: (prevState: IOwnState, props: AccountEmployeeRateDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Create,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.createTitle, {state: 'Rate'}),
    dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.createDescription, {state: 'rate'}),
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeRateDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeRateDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && !props.accountEmployeeRateState.detail.isLoading) {
      props.accountEmployeeRateDispatch.loadCurrentRequest({
        employeeUid: props.match.params.employeeUid
      });
    }
  },
  handleOnSelectedMenu: (props: AccountEmployeeRateDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;
      case LookupUserAction.Modify:
        props.setModify();        
        break;
      case LookupUserAction.Create:
        props.setCreate();        
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: AccountEmployeeRateDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false,
      dialogTitle: undefined,
      dialogContent: undefined,
    });
  },
  handleOnConfirm: (props: AccountEmployeeRateDetailProps) => () => {
    const { response, errors } = props.accountEmployeeRateState.current;

    // skipp untracked action or empty response
    if (!props.action || !errors && !response || errors && errors.status !== 404) {
      return;
    }

    // get project uid
    const employeeUid = props.match.params.employeeUid;

    // actions with new page
    const actions = [
      LookupUserAction.Modify,
      LookupUserAction.Create
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = `/account/employee/${employeeUid}/rate/form`;
          break;
        case LookupUserAction.Create:
          next = `/account/employee/${employeeUid}/rate/form`;
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        rateId: response && response.data && response.data.uid || ''
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeRateDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeRateDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeRateState.current.response !== prevProps.accountEmployeeRateState.current.response) {
      const { isLoading } = this.props.accountEmployeeRateState.current;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true
        },
      ];

      this.props.setOptions(options);
    }

    // handle add a new rate
    if (this.props.accountEmployeeRateState.current.errors && this.props.accountEmployeeRateState.current.errors !== prevProps.accountEmployeeRateState.current.errors) {
      if (this.props.accountEmployeeRateState.current.errors.status === 404) {
        const { isLoading } = this.props.accountEmployeeRateState.current;
  
        // generate option menus
        const options: IPopupMenuOption[] = [
          {
            id: LookupUserAction.Refresh,
            name: this.props.intl.formatMessage(layoutMessage.action.refresh),
            enabled: !isLoading,
            visible: true
          },
          {
            id: LookupUserAction.Create,
            name: this.props.intl.formatMessage(layoutMessage.action.create),
            enabled: !isLoading,
            visible: true
          },
        ];
  
        this.props.setOptions(options);
      }
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