import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupRoleDeletePayload } from '@lookup/classes/request/role';
import { RoleUserAction } from '@lookup/classes/types';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupRoleListView } from './LookupRoleListView';

interface OwnHandlers {
  handleOnDelete: (uid: string, callback: () => void) => void;
  handleOnCloseDialog: () => void;
  handleSubmit: () => void;
}

interface OwnState {
  roleUid: string;
  callback?: () => void;
  reload: boolean;
  action?: RoleUserAction;
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

const createProps: mapper<RoleListProps, OwnState> = (props: RoleListProps): OwnState => ({
  roleUid: '',
  reload: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<RoleListProps, OwnState, OwnStateUpdaters> = {
  setDelete: (prevState: OwnState, props: RoleListProps) => (uid: string, callback: () => void): Partial<OwnState> => ({
    callback,
    action: RoleUserAction.Delete,
    roleUid: uid,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggree)
  }),
  setDefault: () => (): Partial<OwnState> => ({
    roleUid: '',
    reload: false,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<RoleListProps, OwnHandlers> = {
  handleOnDelete: (props: RoleListProps) => (uid: string, callback: () => void) => {
    props.setDelete(uid, callback);
  },
  handleOnCloseDialog: (props: RoleListProps) => () => {
    props.setDefault();
  },
  handleSubmit: (props: RoleListProps) => () => {
    const { response } = props.lookupRoleState.all;
    const { deleteRequest, loadAllDispose } = props.lookupRoleDispatch;
    const { roleUid, intl } = props;
    const { alertAdd } = props.layoutDispatch;

    const payload = {
      uid: roleUid
    };
    
    const message = intl.formatMessage(lookupMessage.systemLimit.message.deleteSuccess, {uid: roleUid});

    // get uid
    return new Promise((resolve, reject) => {
      deleteRequest({
        resolve,
        reject,
        data: payload as ILookupRoleDeletePayload
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
      props.history.push(`/lookup/roles/list`);
    });
  },
};

export type RoleListProps
  = WithUser
  & WithLayout
  & OwnState
  & OwnStateUpdaters
  & OwnHandlers
  & RouteComponentProps
  & InjectedIntlProps
  & WithLookupRole;

export default compose<RoleListProps, {}>(
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withLookupRole,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RoleListProps, OwnHandlers>(handlerCreators),
)(LookupRoleListView);