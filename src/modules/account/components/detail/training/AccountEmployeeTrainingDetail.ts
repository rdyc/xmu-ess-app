import { IEmployeeTrainingDeletePayload } from '@account/classes/request/employeeTraining';
import { WithAccountEmployeeTraining, withAccountEmployeeTraining } from '@account/hoc/withAccountEmployeeTraining';
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
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { AccountEmployeeTrainingDetailView } from './AccountEmployeeTrainingDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  trainingUid: string;
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
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

export type AccountEmployeeTrainingDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployeeTraining
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeTrainingDetailProps, IOwnState> = (props: AccountEmployeeTrainingDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<AccountEmployeeTrainingDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: AccountEmployeeTrainingDetailProps) => (options?: IAppBarMenu[]): Partial<IOwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<AccountEmployeeTrainingDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeTrainingDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && props.match.params.trainingUid && !props.accountEmployeeTrainingState.detail.isLoading) {
      props.accountEmployeeTrainingDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        trainingUid: props.match.params.trainingUid
      });
    }
  },
  handleOnOpenDialog: (props: AccountEmployeeTrainingDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, {state: 'Training'}),
        dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, {state: 'training'}),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.deleteTitle, {state: 'Training'}),
        dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.deleteDescription, {state: 'training'}),
      });
    }
  },
  handleOnCloseDialog: (props: AccountEmployeeTrainingDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: AccountEmployeeTrainingDetailProps) => () => {
    const { response } = props.accountEmployeeTrainingState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;
    let trainingUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeUid = props.match.params.employeeUid;
      trainingUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = `/account/employee/${employeeUid}/training/form`;
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        employeeUid,
        trainingUid
      });
    }
  },
  handleSubmit: (props: AccountEmployeeTrainingDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.accountEmployeeTrainingDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.employeeUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.trainingUid,
      employeeUid: match.params.employeeUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        employeeUid: match.params.employeeUid,
        data: payload as IEmployeeTrainingDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: AccountEmployeeTrainingDetailProps) => (response: boolean) => {
    if (props.action === LookupUserAction.Delete) {
      props.history.push(`/account/employee/${props.match.params.employeeUid}/training`);
  
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(accountMessage.shared.message.deleteSuccess, { uid : props.match.params.trainingUid, state: 'Training' })
      });
    }
  },
  handleSubmitFail: (props: AccountEmployeeTrainingDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      if (props.action === LookupUserAction.Delete) {
        props.layoutDispatch.alertAdd({
          time: new Date(),
          message: props.intl.formatMessage(accountMessage.shared.message.deleteFailure),
          details: isObject(submitError) ? submitError.message : submitError
        });
      }
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeTrainingDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeTrainingDetailProps) {
    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid ||
        this.props.match.params.trainingUid !== prevProps.match.params.trainingUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeTrainingState.detail.response !== prevProps.accountEmployeeTrainingState.detail.response) {
      const { isLoading } = this.props.accountEmployeeTrainingState.detail;

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
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Modify)
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
          onClick: () => this.props.handleOnOpenDialog(LookupUserAction.Delete)
        }
      ];

      this.props.setOptions(options);
    }
  }
};
 
export const AccountEmployeeTrainingDetail = compose<AccountEmployeeTrainingDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployeeTraining,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeTrainingDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('AccountEmployeeTrainingDetail')
)(AccountEmployeeTrainingDetailView);