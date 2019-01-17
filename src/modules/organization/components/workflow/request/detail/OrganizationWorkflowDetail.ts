import { layoutMessage } from '@layout/locales/messages';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { WithOrganizationWorkflow, withOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
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
  = WithOrganizationWorkflow
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
    dialogTitle: props.intl.formatMessage(organizationMessage.workflowSetup.dialog.modifyTitle),
    dialogContent: props.intl.formatMessage(organizationMessage.workflowSetup.dialog.modifyDescription),
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
    const { response } = props.organizationWorkflowState.list;
    // const menuResponse = props.lookupMenuState.detail.response;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    // let menuUid: string | undefined;

    // get menu uid
    // if (response) {
    //   menuUid = menuResponse.data.uid;
    // }

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
        menuUid: props.match.params.menuUid, companyUid: props.match.params.companyUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<OrganizationWorkflowDetailProps, OwnState> = {
  componentWillReceiveProps(nextProps: OrganizationWorkflowDetailProps) {
    if (nextProps.organizationWorkflowState.list.response !== this.props.organizationWorkflowState.list.response) {
      const { loadDetailRequest } = this.props.lookupMenuDispatch;

      if (this.props.match.params.menuUid) {
        loadDetailRequest({
          menuUid: this.props.match.params.menuUid
        });
      }
    }
  },
  componentWillUnmount() {
    const { lookupMenuDispatch, organizationWorkflowDispatch } = this.props;

    lookupMenuDispatch.loadDetailDispose();
    organizationWorkflowDispatch.loadListDispose();
  }
};

export const OrganizationWorkflowDetail = compose(
  withRouter,
  withLookupMenu,
  withOrganizationWorkflow,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle<OrganizationWorkflowDetailProps, OwnState>(lifecycles),
)(OrganizationWorkflowDetailView);