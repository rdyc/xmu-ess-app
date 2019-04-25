import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupRoleDeletePayload } from '@lookup/classes/request/role';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { LookupRoleDetailView } from './LookupRoleDetailView';

interface IOwnRouteParams {
  roleUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
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

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDelete: StateHandler<IOwnState>;
}

export type LookupRoleDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithLookupRole
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<LookupRoleDetailProps, IOwnState> = (props: LookupRoleDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<LookupRoleDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: LookupRoleDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: LookupRoleDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: LookupRoleDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'role'}),
  }),
  setDelete: (prevState: IOwnState, props: LookupRoleDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'role'}),
  })
};

const handlerCreators: HandleCreators<LookupRoleDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: LookupRoleDetailProps) => () => { 
    if (props.userState.user && props.match.params.roleUid && !props.lookupRoleState.detail.isLoading) {
      props.lookupRoleDispatch.loadDetailRequest({
        companyUid: props.history.location.state ? props.history.location.state.companyUid : '',
        roleUid: props.match.params.roleUid
      });
    }
  },
  handleOnSelectedMenu: (props: LookupRoleDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: LookupRoleDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: LookupRoleDetailProps) => () => {
    const { response } = props.lookupRoleState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let roleUid: string | undefined;
    let companyUid: string | undefined;

    if (response.data) {
      roleUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/roles/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        companyUid,
        uid: roleUid 
      });
    }
  },
  handleDelete: (props: LookupRoleDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupRoleDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.roleUid) {
      const message = intl.formatMessage(lookupMessage.role.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.roleUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupRoleDeletePayload
      });
    });
  },
  handleDeleteSuccess: (props: LookupRoleDetailProps) => (response: boolean) => {
    props.history.push('/lookup/roles');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.role.message.deleteSuccess, { uid : props.match.params.roleUid })
    });
  },
  handleDeleteFail: (props: LookupRoleDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.role.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LookupRoleDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: LookupRoleDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.roleUid !== prevProps.match.params.roleUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupRoleState.detail.response !== prevProps.lookupRoleState.detail.response) {
      const { isLoading } = this.props.lookupRoleState.detail;

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

export const LookupRoleDetail = compose(
  withRouter,
  withUser,
  withOidc,
  withLayout,
  withLookupRole,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupRoleDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupRoleDetail')
)(LookupRoleDetailView);