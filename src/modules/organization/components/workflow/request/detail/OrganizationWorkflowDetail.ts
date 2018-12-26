import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithOrganizationWorkflow, withOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { travelMessage } from '@travel/locales/messages/travelMessage';
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
import { OrganizationWorkflowDetailView } from './OrganizationWorkflowDetailView';

interface OwnRouteParams {
  menuUid: string;
  companyUid: string;
}

interface OwnHandler {
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  isAdmin: boolean;
  action?: DiemUserAction;
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

export type OrganizationWorkflowDetailProps
  = WithUser
  & WithOrganizationWorkflow
  & WithLookupMenu
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & OwnState
  & OwnStateUpdaters
  & OwnHandler;

const createProps: mapper<OrganizationWorkflowDetailProps, OwnState> = (props: OrganizationWorkflowDetailProps): OwnState => ({
  isAdmin: false,
  dialogFullScreen: false,
  dialogOpen: false,
});

const stateUpdaters: StateUpdaters<OrganizationWorkflowDetailProps, OwnState, OwnStateUpdaters> = {
  setModify: (prevState: OwnState, props: OrganizationWorkflowDetailProps) => (): Partial<OwnState> => ({
    action: DiemUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(travelMessage.request.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(travelMessage.request.confirm.modifyDescription),
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

const handlerCreators: HandleCreators<OrganizationWorkflowDetailProps, OwnHandler> = {
  handleOnModify: (props: OrganizationWorkflowDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: OrganizationWorkflowDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: OrganizationWorkflowDetailProps) => () => {
    const { response } = props.lookupMenuState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let menuUid: string | undefined;

    // get menu uid
    if (response.data) {
      menuUid = response.data.uid;
    }
    console.log(menuUid);

    // actions with new page
    const actions = [
      DiemUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case DiemUserAction.Modify:
          next = '/organization/workflow/form';
          break;

        default:
          break;
      }

      props.setDefault();
      props.history.push(next, {
        uid: menuUid, companyUid: props.match.params.companyUid
      });
    }
  },
};

export const OrganizationWorkflowDetail = compose(
  withRouter,
  withUser,
  withLookupMenu,
  withOrganizationWorkflow,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(OrganizationWorkflowDetailView);