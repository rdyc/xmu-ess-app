import { IEmployeeNoteDeletePayload } from '@account/classes/request/employeeNote';
import { WithAccountEmployeeNote, withAccountEmployeeNote } from '@account/hoc/withAccountEmployeeNote';
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
import { AccountEmployeeNoteDetailView } from './AccountEmployeeNoteDetailView';

interface IOwnRouteParams {
  employeeUid: string;
  noteId: string;
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

export type AccountEmployeeNoteDetailProps
  = IOwnState
  & IOwnHandler
  & IOwnStateUpdaters
  & RouteComponentProps<IOwnRouteParams>
  & WithUser
  & WithOidc
  & WithLayout
  & WithAccountEmployeeNote
  & InjectedIntlProps;

const createProps: mapper<AccountEmployeeNoteDetailProps, IOwnState> = (props: AccountEmployeeNoteDetailProps): IOwnState => {
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
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  };
};

const stateUpdaters: StateUpdaters<AccountEmployeeNoteDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: AccountEmployeeNoteDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: AccountEmployeeNoteDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: AccountEmployeeNoteDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.modifyTitle, {state: 'Note'}),
    dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.modifyDescription, {state: 'note'}),
  }),
  setDelete: (prevState: IOwnState, props: AccountEmployeeNoteDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(accountMessage.shared.confirm.deleteTitle, {state: 'Note'}),
    dialogContent: props.intl.formatMessage(accountMessage.shared.confirm.deleteDescription, {state: 'note'}),
  })
};

const handlerCreators: HandleCreators<AccountEmployeeNoteDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: AccountEmployeeNoteDetailProps) => () => { 
    if (props.userState.user && props.match.params.employeeUid && props.match.params.noteId && !props.accountEmployeeNoteState.detail.isLoading) {
      props.accountEmployeeNoteDispatch.loadDetailRequest({
        employeeUid: props.match.params.employeeUid,
        noteId: props.match.params.noteId
      });
    }
  },
  handleOnSelectedMenu: (props: AccountEmployeeNoteDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: AccountEmployeeNoteDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false,
      dialogTitle: undefined,
      dialogContent: undefined,
    });
  },
  handleOnConfirm: (props: AccountEmployeeNoteDetailProps) => () => {
    const { response } = props.accountEmployeeNoteState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let employeeUid: string | undefined;
    let noteId: number | undefined;

    // get project uid
    if (response.data) {
      employeeUid = props.match.params.employeeUid;
      noteId = response.data.id;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = `/account/employee/${employeeUid}/note/form`;
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, { 
        employeeUid,
        noteId
      });
    }
  },
  handleSubmit: (props: AccountEmployeeNoteDetailProps) => () => {
    const { match, intl, action } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.accountEmployeeNoteDispatch;

    if (!user) {
      return Promise.reject('user was not found');
    }

    // props checking
    if (!match.params.employeeUid) {
      const message = intl.formatMessage(accountMessage.shared.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      id: match.params.noteId,
      employeeUid: match.params.employeeUid
    };

    if (action === LookupUserAction.Delete) {
      return new Promise((resolve, reject) => {
        deleteRequest({
          resolve,
          reject,
          employeeUid: match.params.employeeUid,
          data: payload as IEmployeeNoteDeletePayload
        });
      });
    }

    return null;
  },
  handleSubmitSuccess: (props: AccountEmployeeNoteDetailProps) => (response: boolean) => {
    if (props.action === LookupUserAction.Delete) {
      props.history.push(`/account/employee/${props.match.params.employeeUid}/note`);
  
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(accountMessage.shared.message.deleteSuccess, { uid : props.match.params.noteId, state: 'Note' })
      });
    }
  },
  handleSubmitFail: (props: AccountEmployeeNoteDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

const lifecycles: ReactLifeCycleFunctions<AccountEmployeeNoteDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: AccountEmployeeNoteDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.employeeUid !== prevProps.match.params.employeeUid ||
        this.props.match.params.noteId !== prevProps.match.params.noteId) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.accountEmployeeNoteState.detail.response !== prevProps.accountEmployeeNoteState.detail.response) {
      const { isLoading } = this.props.accountEmployeeNoteState.detail;

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
 
export const AccountEmployeeNoteDetail = compose<AccountEmployeeNoteDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withAccountEmployeeNote,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<AccountEmployeeNoteDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('AccountEmployeeNoteDetail')
)(AccountEmployeeNoteDetailView);