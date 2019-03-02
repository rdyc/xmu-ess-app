import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
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

import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { HierarchyUserAction } from '@organization/classes/types';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { OrganizationHierarchyDetailView } from './OrganizationHierarchyDetailView';

interface IOwnRouteParams {
  hierarchyUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnModify: () => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  isAdmin: boolean;
  action?: HierarchyUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
  setOptions: StateHandler<IOwnState>;
}

export type OrganizationHierarchyDetailProps 
  = WithOidc
  & WithUser
  & WithOrganizationHierarchy
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<OrganizationHierarchyDetailProps, IOwnState> = (props: OrganizationHierarchyDetailProps): IOwnState => {
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
  
  return ({
    isAdmin,
    shouldLoad: false,
    dialogFullScreen: false,
    dialogOpen: false,
  });
};

const stateUpdaters: StateUpdaters<OrganizationHierarchyDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: OrganizationHierarchyDetailProps) => (): Partial<IOwnState> => ({
    action: HierarchyUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.hierarchy.dialog.modifyTitle), 
    dialogContent: props.intl.formatMessage(organizationMessage.hierarchy.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  }),
  setDefault: () => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
};

const handlerCreators: HandleCreators<OrganizationHierarchyDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationHierarchyDetailProps) => () => { 
    if (props.userState.user && props.match.params.hierarchyUid && !props.organizationHierarchyState.detail.isLoading) {
      if (props.history.location.state.companyUid) {
        props.organizationHierarchyDispatch.loadDetailRequest({
          companyUid: props.history.location.state.companyUid,
          hierarchyUid: props.match.params.hierarchyUid
        });
      } else {
        props.history.push('/organization/hierarchy');
      }
    }
  },
  handleOnSelectedMenu: (props: OrganizationHierarchyDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case HierarchyUserAction.Refresh:
        props.setShouldLoad();
        break;
      case HierarchyUserAction.Modify:
        props.setModify();
        break;
    
      default:
        break;
    }
  },
  handleOnModify: (props: OrganizationHierarchyDetailProps) => () => { 
    props.setModify();
  },
  handleOnCloseDialog: (props: OrganizationHierarchyDetailProps) => () => { 
    props.setDefault();
  },
  handleOnConfirm: (props: OrganizationHierarchyDetailProps) => () => { 
    const { response } = props.organizationHierarchyState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    } 

    // define vars
    let hierarchyUid: string | undefined;
    let companyUid: string | undefined;

    // get expense uid
    if (response.data) {
      hierarchyUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      HierarchyUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case HierarchyUserAction.Modify:
          next = `/organization/hierarchy/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        companyUid, hierarchyUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<OrganizationHierarchyDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: OrganizationHierarchyDetailProps) {
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    if (this.props.match.params.hierarchyUid !== prevProps.match.params.hierarchyUid) {
      this.props.handleOnLoadApi();
    }

    if (this.props.organizationHierarchyState.detail.response !== prevProps.organizationHierarchyState.detail.response) {
      const { isLoading } = this.props.organizationHierarchyState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: HierarchyUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        },
        {
          id: HierarchyUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  },
};

export const OrganizationHierarchyDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withOrganizationHierarchy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters), 
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(OrganizationHierarchyDetailView);