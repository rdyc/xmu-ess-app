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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { AppRole } from '@constants/AppRole';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { StructureUserAction } from '@organization/classes/types';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { StructureDetailView } from './StructureDetailView';

interface IOwnRouteParams {
  structureUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  isAdmin: boolean;
  shouldLoad: boolean;
  action?: StructureUserAction;
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

export type OrganizationStructureDetailProps
  = WithUser
  & WithOidc
  & WithOrganizationStructure
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<OrganizationStructureDetailProps, IOwnState> = (props: OrganizationStructureDetailProps): IOwnState => {
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
    dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<OrganizationStructureDetailProps, IOwnState, IOwnStateUpdaters> = {
  setOptions: (prevState: IOwnState, props: OrganizationStructureDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState, props: OrganizationStructureDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: OrganizationStructureDetailProps) => (): Partial<IOwnState> => ({
    action: StructureUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(organizationMessage.structure.dialog.modifyTitle),
    dialogContent: props.intl.formatMessage(organizationMessage.structure.dialog.modifyDescription),
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disaggre),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.aggre)
  }),
  setDefault: () => (): Partial<IOwnState> => ({
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogContent: undefined,
    dialogCancelLabel: undefined,
    dialogConfirmLabel: undefined,
  })
};

const handlerCreators: HandleCreators<OrganizationStructureDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: OrganizationStructureDetailProps) => () => {
    if (props.userState.user && props.match.params.structureUid && !props.organizationStructureState.detail.isLoading) {
       if (props.history.location.state.companyUid) {
      props.organizationStructureDispatch.loadDetailRequest({
        companyUid: props.history.location.state.companyUid,
        structureUid: props.match.params.structureUid
      });
      } else {
         props.history.push('/organization/structure');
      }
    }
  },
  
  handleOnSelectedMenu: (props: OrganizationStructureDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case StructureUserAction.Refresh:
        props.setShouldLoad();
        break;
      case StructureUserAction.Modify:
        props.setModify();        
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: OrganizationStructureDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: OrganizationStructureDetailProps) => () => {
    const { response } = props.organizationStructureState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let structureUid: string | undefined;
    let companyUid: string | undefined;

    // get expense uid
    if (response.data) {
      structureUid = response.data.uid;
      companyUid = response.data.companyUid;
    }

    // actions with new page
    const actions = [
      StructureUserAction.Modify,
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case StructureUserAction.Modify:
          next = `/organization/structure/form`;
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, {
        companyUid, structureUid
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<OrganizationStructureDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: OrganizationStructureDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }

    // handle updated route params
    if (this.props.match.params.structureUid !== prevProps.match.params.structureUid) {
      this.props.handleOnLoadApi();
    }

    // handle updated response state
    if (this.props.organizationStructureState.detail.response !== prevProps.organizationStructureState.detail.response) {
      const { isLoading } = this.props.organizationStructureState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: StructureUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: StructureUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: !isLoading,
          visible: true
        },
      ];

      this.props.setOptions(options);
    }
  }
};

export const StructureDetail = compose(
  setDisplayName('OrganizationStructureDetail'),
  withRouter,
  withOidc,
  withUser,
  withOrganizationStructure,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(StructureDetailView);