// import { IEmployeeDeletePayload } from '@account/classes/request';
import { WithAccountEmployee, withAccountEmployee } from '@account/hoc/withAccountEmployee';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { AccountEmployeeDetailView } from './AccountEmployeeDetailView';

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
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
}

export type AccountEmployeeDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployee
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeDetailProps, IOwnState> = (props: AccountEmployeeDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<AccountEmployeeDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: AccountEmployeeDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: AccountEmployeeDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: AccountEmployeeDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.employee.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(accountMessage.employee.confirm.modifyDescription),
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && !props.accountEmployeeState.detail.isLoading) {
      props.accountEmployeeDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid
      });
    }
  },
  handleOnSelectedMenu: (props: AccountEmployeeDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;
      case LookupUserAction.Modify:
        props.setModify();        
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: AccountEmployeeDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false,
      dialogTitle: undefined,
      dialogContent: undefined,
    });
  },
  handleOnConfirm: (props: AccountEmployeeDetailProps) => () => {
    const { response } = props.accountEmployeeState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/account/employee/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        uid: employeeUid 
      });
    }
  },
  handleSubmit: (props: AccountEmployeeDetailProps) => () => {
    // const { match, intl } = props;
    // const { user } = props.userState;
    // // const { deleteRequest } = props.accountEmployeeDispatch;

    // if (!user) {
    //   return Promise.reject('user was not found');
    // }

    // // props checking
    // if (!match.params.employeeUid) {
    //   const message = intl.formatMessage(accountMessage.shared.message.emptyProps);
    //   return Promise.reject(message);
    // }
    // const payload = {
    //   uid: match.params.employeeUid
    // };
    // return new Promise((resolve, reject) => {
    //   deleteRequest({
    //     resolve,
    //     reject,
    //     data: payload as IEmployeeDeletePayload
    //   });
    // });
  },
  handleSubmitSuccess: (props: AccountEmployeeDetailProps) => (response: boolean) => {
    props.history.push('/account/employee/');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(accountMessage.shared.message.deleteSuccess, { uid : props.match.params.employeeUid })
    });
  },
  handleSubmitFail: (props: AccountEmployeeDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(accountMessage.shared.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeDetailProps) {
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
    if (this.props.accountEmployeeState.detail.response !== prevProps.accountEmployeeState.detail.response) {
      const { isLoading } = this.props.accountEmployeeState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: LookupUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: LookupUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};
 
export const AccountEmployeeDetail = compose<AccountEmployeeDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployee,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('AccountEmployeeDetail')
)(AccountEmployeeDetailView);