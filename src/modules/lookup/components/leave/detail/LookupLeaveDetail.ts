import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeaveDeletePayload } from '@lookup/classes/request';
import { LookupUserAction } from '@lookup/classes/types';
import { DeleteFormData } from '@lookup/components/currency/editor/DeleteForm';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  mapper,
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

interface OwnRouteParams {
  leaveUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
}

export type LookupLeaveDetailProps 
  = WithUser
  & WithLayout
  & WithLookupLeave
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupLeaveDetailProps, OwnState> = (props: LookupLeaveDetailProps): OwnState => ({ 
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<LookupLeaveDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<LookupLeaveDetailProps, OwnHandler> = {
  handleOnOpenDialog: (props: LookupLeaveDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
      });
    }
  },
  handleOnCloseDialog: (props: LookupLeaveDetailProps) => () => { 
    props.stateUpdate({      
      dialogOpen: false});
  },
  handleOnConfirm: (props: LookupLeaveDetailProps) => () => { 
    const { response } = props.lookupLeaveState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let leaveUid: string | undefined;

    // get Leave uid
    if (response.data) {
      leaveUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      LookupUserAction.Modify, 
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case LookupUserAction.Modify:
          next = '/lookup/leave/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: leaveUid 
      });
    }
  },
  handleDelete: (props: LookupLeaveDetailProps) => () => {
    const { match, intl } = props;
    const { user } = props.userState;
    const { deleteRequest } = props.lookupLeaveDispatch;
    // user checking
    if (!user) {
      return Promise.reject('user was not found');
    }
    // props checking
    if (!match.params.leaveUid) {
      const message = intl.formatMessage(lookupMessage.role.message.emptyProps);
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
  handleDeleteSuccess: (props: LookupLeaveDetailProps) => (response: boolean) => {
    props.history.push('/lookup/Leave');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.role.message.deleteSuccess, { uid : props.match.params.leaveUid })
    });
  },
  handleDeleteFail: (props: LookupLeaveDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
    if (errors) {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: isObject(submitError) ? submitError.message : submitError
      });
    } else {
      props.layoutDispatch.alertAdd({
        time: new Date(),
        message: props.intl.formatMessage(lookupMessage.company.message.deleteFailure),
        details: isObject(submitError) ? submitError.message : submitError
      });
    }
  }
};

export const LookupLeaveDetail = compose(
  withRouter,
  withLayout,
  withUser,
  withLookupLeave,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupLeaveDetailProps, OwnHandler>(handlerCreators),
)(LookupLeaveDetailView);