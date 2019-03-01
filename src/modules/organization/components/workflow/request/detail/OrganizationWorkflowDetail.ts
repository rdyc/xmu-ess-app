import { AppRole } from '@constants/AppRole';
import { IBasePagingFilter } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { IDataBindResult } from '@layout/components/pages';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { IOrganizationWorkflowAllFilter } from '@organization/classes/filters/workflow';
import { IWorkflow } from '@organization/classes/response/workflow';
import { workflowUserAction } from '@organization/classes/types';
import { WithOrganizationWorkflow, withOrganizationWorkflow } from '@organization/hoc/withOrganizationWorkflow';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { OrganizationWorkflowDetailView } from './OrganizationWorkflowDetailView';

interface IOwnRouteParams {
  menuUid: string;
  companyUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  handleOnBind: (item: IWorkflow, index: number) => IDataBindResult;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  fields: ICollectionValue[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: workflowUserAction;
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
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
}

export type OrganizationWorkflowDetailProps
  = WithOidc
  & WithUser
  & WithOrganizationWorkflow
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<OrganizationWorkflowDetailProps, IOwnState> = (props: OrganizationWorkflowDetailProps): IOwnState => {
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
    fields: []
  };
};

const stateUpdaters: StateUpdaters<OrganizationWorkflowDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: OrganizationWorkflowDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: OrganizationWorkflowDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: OrganizationWorkflowDetailProps) => (): Partial<IOwnState> => ({
    action: workflowUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.workflowSetup.dialog.modifyTitle),
    dialogContent: props.intl.formatMessage(organizationMessage.workflowSetup.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setDefault: (prevState: IOwnState) => (): Partial<IOwnState> => ({
    action: undefined,    
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<OrganizationWorkflowDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationWorkflowDetailProps) => (params?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => {
    const { isLoading, request } = props.organizationWorkflowState.all;
    const { loadAllRequest } = props.organizationWorkflowDispatch;

    if (!isLoading) {
      const filter: IOrganizationWorkflowAllFilter = {
        menuUid: props.match.params.menuUid,
        companyUid: props.match.params.companyUid,
        orderBy: 'priority',
        direction: params && params.direction || request && request.filter && request.filter.direction,
        page: resetPage ? undefined : params && params.page || request && request.filter && request.filter.page,
        size: params && params.size || request && request.filter && request.filter.size
      };

      const shouldLoad = !shallowEqual(filter, request && request.filter || {});

      if (shouldLoad || isRetry) {
        loadAllRequest({
          filter
        });
      }
    }
  },
  handleOnSelectedMenu: (props: OrganizationWorkflowDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case workflowUserAction.Refresh:
        props.setShouldLoad();
        break;
      case workflowUserAction.Modify:
        props.setModify();
        break;
    
      default:
        break;
    }
  },
  handleOnBind: (props: OrganizationWorkflowDetailProps) => (item: IWorkflow, index: number) => ({
    key: index,
    primary: item.priority,
    secondary: item.hierarchy ? item.hierarchy.name : 'N/A',
    tertiary: '',
    quaternary: item.hierarchy && item.hierarchy.company && item.hierarchy.company.name || 'N/A',
    quinary: item.changes && item.changes.updated && item.changes.updated.fullName || item.changes && item.changes.created && item.changes.created.fullName || 'N/A',
    senary: item.changes && moment(item.changes.updatedAt ? item.changes.updatedAt : item.changes.createdAt).fromNow() || '?'
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
      workflowUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case workflowUserAction.Modify:
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

const lifecycles: ReactLifeCycleFunctions<OrganizationWorkflowDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: OrganizationWorkflowDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if ((this.props.match.params.companyUid !== prevProps.match.params.companyUid) && (this.props.match.params.menuUid !== prevProps.match.params.menuUid)) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.organizationWorkflowState.all.response !== prevProps.organizationWorkflowState.all.response) {
      const { isLoading } = this.props.organizationWorkflowState.all;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: workflowUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: workflowUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const OrganizationWorkflowDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withOrganizationWorkflow,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle<OrganizationWorkflowDetailProps, IOwnState>(lifecycles),
  setDisplayName('OrganizationWorkflowDetail')
)(OrganizationWorkflowDetailView);