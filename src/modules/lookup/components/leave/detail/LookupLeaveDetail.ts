import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeaveDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';

import { LookupLeaveDetailView } from './LookupLeaveDetailView';

interface IOwnRouteParams {
  leaveUid: string;
  companyUid: string;
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

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleSubmit: () => void;
  handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
}

export type LeaveDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithLookupLeave
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<LeaveDetailProps, IOwnState> = (props: LeaveDetailProps): IOwnState => {
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

const stateUpdaters: StateUpdaters<LeaveDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: IOwnState, props: LeaveDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: LeaveDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: LeaveDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription, { state: 'time limit'}),
  }),
  setDelete: (prevState: IOwnState, props: LeaveDetailProps) => (): Partial<IOwnState> => ({
    action: LookupUserAction.Delete,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription, { state: 'time limit'}),
  })
};

const handlerCreators: HandleCreators<LeaveDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: LeaveDetailProps) => () => { 
    if (props.userState.user && props.match.params.leaveUid && !props.lookupLeaveState.detail.isLoading) {
      props.lookupLeaveDispatch.loadDetailRequest({
        companyUid: props.history.location.state.companyUid,
        leaveUid: props.match.params.leaveUid
      });
    }
  },
  handleOnSelectedMenu: (props: LeaveDetailProps) => (item: IPopupMenuOption) => { 
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
  handleOnCloseDialog: (props: LeaveDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false,
      dialogTitle: undefined,
      dialogContent: undefined,
    });
  },
  handleOnConfirm: (props: LeaveDetailProps) => () => {
    const { response } = props.lookupLeaveState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let leaveUid: string | undefined;
    let companyUid: string | undefined;

    // get uid
    if (response.data) {
      leaveUid = response.data.uid;
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
          next = '/lookup/leaves/config/form';
          break;

        default:
          break;
      }

      props.stateUpdate({
        dialogOpen: false
      });

      props.history.push(next, {
        companyUid,
        uid: leaveUid
      });
    }

  },
  handleSubmit: (props: LeaveDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupLeaveDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.leaveUid) {
      const message = intl.formatMessage(lookupMessage.leave.message.emptyProps);
      return Promise.reject(message);
    }
    const payload = {
      uid: match.params.leaveUid
    };
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupLeaveDeletePayload
      });
    });
  },
  handleSubmitSuccess: (props: LeaveDetailProps) => (response: boolean) => {
    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.leave.message.deleteSuccess, { uid : props.match.params.leaveUid })
    });

    props.history.push('/lookup/leaves/config/');
  },
  handleSubmitFail: (props: LeaveDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.leave.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.leaveUid !== prevProps.match.params.leaveUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupLeaveState.detail.response !== prevProps.lookupLeaveState.detail.response) {
      const { isLoading } = this.props.lookupLeaveState.detail;

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
          visible: true,
        },
        {
          id: LookupUserAction.Delete,
          name: this.props.intl.formatMessage(layoutMessage.action.delete),
          enabled: true,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const LookupLeaveDetail = compose<LeaveDetailProps, {}>(
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withLookupLeave,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LeaveDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupLeaveDetail')
)(LookupLeaveDetailView);