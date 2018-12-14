import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupRoleDeletePayload } from '@lookup/classes/request/role';
import { RoleUserAction } from '@lookup/classes/types';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { Dispatch } from 'redux';
import { FormErrors } from 'redux-form';
import { isObject } from 'util';
import { RoleDeleteFormData } from './LookupRoleDelete';
import { LookupRoleDetailView } from './LookupRoleDetailView';

interface OwnRouteParams {
  roleUid: string;
}

interface OwnHandler {
  // handleOnModify: () => void;
  handleOnOpenDialog: (action: RoleUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: RoleDeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: RoleUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  // setModify: StateHandler<OwnState>;
  // setDefault: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type RoleDetailProps
  = WithUser
  & WithLayout
  & WithLookupRole
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<RoleDetailProps, OwnState> = (props: RoleDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<RoleDetailProps, OwnState, OwnStateUpdaters> = {
  // setModify: (prevState: OwnState, props: RoleDetailProps) => (): Partial<OwnState> => ({
  //   action: RoleUserAction.Modify,
  //   dialogFullScreen: false,
  //   dialogOpen: true,
  //   dialogTitle: props.intl.formatMessage(lookupMessage.role.confirm.modifyTitle),
  //   dialogContent: props.intl.formatMessage(lookupMessage.role.confirm.modifyDescription),
  //   dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  //   dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  // }),
  // setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
  //   dialogFullScreen: false,
  //   dialogOpen: false,
  //   dialogTitle: undefined,
  //   dialogContent: undefined,
  //   dialogCancelLabel: undefined,
  //   dialogConfirmLabel: undefined,
  // }),
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handlerCreators: HandleCreators<RoleDetailProps, OwnHandler> = {
  
  // handleOnModify: (props: RoleDetailProps) => () => {
  //   props.setModify();
  // },
  // handleOnCloseDialog: (props: RoleDetailProps) => () => {
  //   props.setDefault();
  // },
  handleOnOpenDialog: (props: RoleDetailProps) => (action: RoleUserAction) => {
    if (action === RoleUserAction.Modify) {
      props.stateUpdate({
        action: RoleUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.modifyDescription),
      });
    } else if (action === RoleUserAction.Delete) {
      props.stateUpdate({
        action: RoleUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.shared.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.shared.confirm.deleteDescription),
      });
    }
  },
  handleOnCloseDialog: (props: RoleDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: RoleDetailProps) => () => {
    const { response } = props.lookupRoleState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let roleUid: string | undefined;

    if (response.data) {
      roleUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      RoleUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case RoleUserAction.Modify:
          next = '/lookup/roles/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: roleUid 
      });
    }
  },
  handleDelete: (props: RoleDetailProps) => () => {
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
  handleDeleteSuccess: (props: RoleDetailProps) => (response: boolean) => {
    props.history.push('/lookup/roles');

    props.layoutDispatch.alertAdd({
      time: new Date(),
      message: props.intl.formatMessage(lookupMessage.role.message.deleteSuccess, { uid : props.match.params.roleUid })
    });
  },
  handleDeleteFail: (props: RoleDetailProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
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

export const LookupRoleDetail = compose(
  withRouter,
  withUser,
  withLayout,
  withLookupRole,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<RoleDetailProps, OwnHandler>(handlerCreators),
)(LookupRoleDetailView);