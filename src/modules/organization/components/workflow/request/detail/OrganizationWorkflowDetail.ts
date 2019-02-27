import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { WithUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { DiemUserAction } from '@lookup/classes/types/diem/DiemUserAction';
import { WithLookupMenu, withLookupMenu } from '@lookup/hoc/withLookupMenu';
import { IOrganizationWorkflowAllFilter } from '@organization/classes/filters/workflow';
import { IWorkflow } from '@organization/classes/response/workflow';
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
  shallowEqual,
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
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IWorkflow, index: number) => IDataBindResult;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface OwnState {
  fields: ICollectionValue[];
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
  fields: []
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
  handleOnLoadApi: (props: OrganizationWorkflowDetailProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.organizationWorkflowState.all;
    const { loadAllRequest } = props.organizationWorkflowDispatch;

    if (!isLoading) {
      const filter: IOrganizationWorkflowAllFilter = {
        menuUid: props.match.params.menuUid,
        companyUid: props.match.params.companyUid,
        orderBy: 'priority',
        direction: 'ascending'
      };

      const shouldLoad = !shallowEqual(filter, request && request.filter || {});

      if (shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnBind: (props: OrganizationWorkflowDetailProps) => (item: IWorkflow, index: number) => ({
    key: index,
    primary: item.priority,
    secondary: item.hierarchy ? item.hierarchy.name : 'N/A',
    tertiary: item.menuUid,
    quaternary: item.uid,
    quinary: item.hierarchyUid,
    senary: ''
  }),
  handleOnModify: (props: OrganizationWorkflowDetailProps) => () => {
    props.setModify();
  },
  handleOnCloseDialog: (props: OrganizationWorkflowDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: OrganizationWorkflowDetailProps) => () => {
    const { response } = props.organizationWorkflowState.all;
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
  // componentWillReceiveProps(nextProps: OrganizationWorkflowDetailProps) {
  //   if (nextProps.organizationWorkflowState.list.response !== this.props.organizationWorkflowState.list.response) {
  //     const { loadDetailRequest } = this.props.lookupMenuDispatch;

  //     if (this.props.match.params.menuUid) {
  //       loadDetailRequest({
  //         menuUid: this.props.match.params.menuUid
  //       });
  //     }
  //   }
  // },
  // componentWillUnmount() {
  //   const { organizationWorkflowDispatch } = this.props;

  //   // lookupMenuDispatch.loadDetailDispose();
  //   organizationWorkflowDispatch.loadListDispose();
  // }
  componentDidMount() {
    const { request } = this.props.organizationWorkflowState.all;
    if ((request && request.filter && request.filter.menuUid !== this.props.match.params.menuUid) && (request && request.filter && request.filter.companyUid !== this.props.match.params.companyUid)) {
      this.props.handleOnLoadApi();
    }
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