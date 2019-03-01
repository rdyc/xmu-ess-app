import { IEmployeeExperienceDeletePayload } from '@account/classes/request/employeeExperience';
import { WithAccountEmployeeExperience, withAccountEmployeeExperience } from '@account/hoc/withAccountEmployeeExperience';
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
import { AccountEmployeeExperienceDetailView } from './AccountEmployeeExperienceDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  experienceUid: string;
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
  setDelete: StateHandler<IOwnState>;
}

export type AccountEmployeeExperienceDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployeeExperience
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeExperienceDetailProps, IOwnState> = (props: AccountEmployeeExperienceDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<AccountEmployeeExperienceDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: AccountEmployeeExperienceDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: AccountEmployeeExperienceDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: AccountEmployeeExperienceDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, {state: 'Experience'}),
    dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, {state: 'experience'}),
  }),
  setDelete: (prevState: IOwnState, props: AccountEmployeeExperienceDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.deleteTitle, {state: 'Experience'}),
    dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.deleteDescription, {state: 'experience'}),
  })
};

const handlerCreators: HandleCreators<AccountEmployeeExperienceDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeExperienceDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && props.match.params.experienceUid && !props.accountEmployeeExperienceState.detail.isLoading) {
      props.accountEmployeeExperienceDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        experienceUid: props.match.params.experienceUid
      });
    }
  },
  handleOnSelectedMenu: (props: AccountEmployeeExperienceDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case LookupUserAction.Refresh:
        props.setShouldLoad();
        break;
      case LookupUserAction.Modify:
        props.setModify();        
        break;
      case LookupUserAction.Delete:
        props.setDelete();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: AccountEmployeeExperienceDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false,
      dialogTitle: undefined,
      dialogContent: undefined,
    });
  },
  handleOnConfirm: (props: AccountEmployeeExperienceDetailProps) => () => {
    const { response } = props.accountEmployeeExperienceState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;
    let experienceUid: string | undefined;

    // get project uid
    if (response.data) {
      employeeUid = props.match.params.employeeUid;
      experienceUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = `/account/employee/${employeeUid}/experience/form`;
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        employeeUid,
        experienceUid
      });
    }
  },
  handleSubmit: (props: AccountEmployeeExperienceDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.accountEmployeeExperienceDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.employeeUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.experienceUid,
      employeeUid: match.params.employeeUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        employeeUid: match.params.employeeUid,
        data: payload as IEmployeeExperienceDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: AccountEmployeeExperienceDetailProps) => (response: boolean) => {
    if (props.action === LookupUserAction.Delete) {
      props.history.push(`/account/employee/${props.match.params.employeeUid}/experience`);
  
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(accountMessage.shared.message.deleteSuccess, { uid : props.match.params.experienceUid, state: 'Experience' })
      });
    }
  },
  handleSubmitFail: (props: AccountEmployeeExperienceDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeExperienceDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeExperienceDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid ||
        this.props.match.params.experienceUid !== prevProps.match.params.experienceUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeExperienceState.detail.response !== prevProps.accountEmployeeExperienceState.detail.response) {
      const { isLoading } = this.props.accountEmployeeExperienceState.detail;

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
          enabled: true,
          visible: true
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};
 
export const AccountEmployeeExperienceDetail = compose<AccountEmployeeExperienceDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployeeExperience,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeExperienceDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('AccountEmployeeExperienceDetail')
)(AccountEmployeeExperienceDetailView);