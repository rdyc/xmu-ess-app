import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupLeaveDeletePayload } from '@lookup/classes/request';
import { LookupLeaveUserAction } from '@lookup/classes/types';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupLeaveListView } from './LookupLeaveListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  leaveUid: string;
  callback?: () => void;
  reload: boolean;
  action?: LookupLeaveUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setDelete: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

const createProps: mapper<LeaveListProps, OwnState> = (props: LeaveListProps): OwnState => ({
  leaveUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<LeaveListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: LeaveListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: LookupLeaveUserAction.Delete,
    leaveUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    leaveUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<LeaveListProps, OwnHandlers> = {
  handleOnDelete: (props: LeaveListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: LeaveListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: LeaveListProps) => () => {
    const { response } = props.lookupLeaveState.all;
    const { deleteRequest, loadAllDispose } = props.lookupLeaveDispatch;
    const { leaveUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: leaveUid
    };
    
    const message = intl.formatMessage(lookupMessage.leave.message.deleteSuccess, {uid: leaveUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupLeaveDeletePayload
      });

      alertAdd({
        message,
        time: new Date()
      });
  
      if (response && props.callback) {
        loadAllDispose();
        props.callback();
      }
      props.setDefault();
      props.history.push(`/lookup/leave/`);
    });
  },
};

export type LeaveListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupLeave;

export default compose<LeaveListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupLeave,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LeaveListProps, OwnHandlers>(handlerCreators),
)(LookupLeaveListView);