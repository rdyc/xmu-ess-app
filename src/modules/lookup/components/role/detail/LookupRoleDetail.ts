import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IAppBarMenu } from '@layout/interfaces';
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

interface OwnRouteParams {
  roleUid: string;
}

interface OwnHandler {
  handleOnLoadApi: () => void;
  handleOnOpenDialog: (action: LookupUserAction) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleDelete: (payload: DeleteFormData) => void;
  handleDeleteSuccess: (result: any, dispatch: Dispatch<any>) => void;
  handleDeleteFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, deleteError: any) => void;
}

interface OwnState {
  pageOptions?: IAppBarMenu[];
  action?: LookupUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  setOptions: StateHandler<OwnState>;
  stateUpdate: StateHandler<OwnState>;
}

export type LookupRoleDetailProps
  = WithUser
  & WithLayout
  & WithLookupRole
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<LookupRoleDetailProps, OwnState> = (props: LookupRoleDetailProps): OwnState => ({
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
  dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
});

const stateUpdaters: StateUpdaters<LookupRoleDetailProps, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: (prevState: OwnState, props: LookupRoleDetailProps) => (options?: IAppBarMenu[]): Partial<OwnState> => ({
    pageOptions: options
  }),
};

const handlerCreators: HandleCreators<LookupRoleDetailProps, OwnHandler> = {
  handleOnLoadApi: (props: LookupRoleDetailProps) => () => { 
    if (props.userState.user && props.match.params.roleUid && !props.lookupRoleState.detail.isLoading) {
      props.lookupRoleDispatch.loadDetailRequest({
        companyUid: props.history.location.state ? props.history.location.state.companyUid : '',
        roleUid: props.match.params.roleUid
      });
    }
  },
  handleOnOpenDialog: (props: LookupRoleDetailProps) => (action: LookupUserAction) => {
    if (action === LookupUserAction.Modify) {
      props.stateUpdate({
        action: LookupUserAction.Modify,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.role.confirm.modifyTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.role.confirm.modifyDescription),
      });
    } else if (action === LookupUserAction.Delete) {
      props.stateUpdate({
        action: LookupUserAction.Delete,
        dialogOpen: true,
        dialogTitle: props.intl.formatMessage(lookupMessage.role.confirm.deleteTitle),
        dialogContent: props.intl.formatMessage(lookupMessage.role.confirm.deleteDescription),
      });
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

    if (response.data) {
      roleUid = response.data.uid;
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

const lifecycles: ReactLifeCycleFunctions<LookupRoleDetailProps, OwnState> = {
  componentDidUpdate(prevProps: LookupRoleDetailProps) {
    // handle updated route params
    if (this.props.match.params.roleUid !== prevProps.match.params.roleUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.lookupRoleState.detail.response !== prevProps.lookupRoleState.detail.response) {
      const { isLoading } = this.props.lookupRoleState.detail;

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

export const LookupRoleDetail = compose(
  withRouter,
  withUser,
  withLayout,
  withLookupRole,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<LookupRoleDetailProps, OwnHandler>(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('LookupRoleDetail')
)(LookupRoleDetailView);