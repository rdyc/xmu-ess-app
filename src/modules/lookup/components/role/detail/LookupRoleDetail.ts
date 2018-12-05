import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { RoleUserAction } from '@lookup/classes/types';
import { WithLookupRole, withLookupRole } from '@lookup/hoc/withLookupRole';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { LookupRoleDetailView } from './LookupRoleDetailView';

interface OwnRouteParams {
  roleUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
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
  setModify: StateHandler<OwnState>;
  setDefault: StateHandler<OwnState>;
}

export type RoleDetailProps
  = WithUser
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
});

const stateUpdaters: StateUpdaters<RoleDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: RoleDetailProps) => (): Partial<OwnState> => ({
    action: RoleUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(lookupMessage.role.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(lookupMessage.role.confirm.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: (prevState: OwnState) => (): Partial<OwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<RoleDetailProps, OwnHandler> = {
  handleOnModify: (props: RoleDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: RoleDetailProps) => () => {
    props.setDefault();
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
          next = '/lookup/role/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: roleUid 
      });
    }
  },
};

export const LookupRoleDetail = compose(
  withRouter,
  withUser,
  withLookupRole,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(LookupRoleDetailView);