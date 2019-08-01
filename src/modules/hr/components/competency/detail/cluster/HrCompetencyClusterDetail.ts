import { AppRole } from '@constants/AppRole';
import { IHrCompetencyClusterUserAction } from '@hr/classes/types';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
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

import { HrCompetencyClusterDetailView } from './HrCompetencyClusterDetailView';

interface IOwnRouteParams {
  clusterUid: string;
}

interface IOwnHandler {
  handleOnLoadApi: () => void;
  handleOnSelectedMenu: (item: IPopupMenuOption) => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: IHrCompetencyClusterUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type HrCompetencyClusterDetailProps
  = WithOidc
  & WithUser
  & WithHrCompetencyCluster
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyClusterDetailProps, IOwnState> = (props: HrCompetencyClusterDetailProps): IOwnState => { 
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
      shouldLoad: false
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyClusterDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyClusterDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyClusterDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<HrCompetencyClusterDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyClusterDetailProps) => () => { 
    const { user } = props.userState;
    const clusterUid = props.match.params.clusterUid;
    const { isLoading } = props.hrCompetencyClusterState.detail;

    if (user && clusterUid && !isLoading) {
      props.hrCompetencyClusterDispatch.loadDetailRequest({
        clusterUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyClusterDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyClusterUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyClusterDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyClusterDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.clusterUid !== prevProps.match.params.clusterUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCompetencyClusterState.detail.response !== prevProps.hrCompetencyClusterState.detail.response) {
      const { isLoading } = this.props.hrCompetencyClusterState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: IHrCompetencyClusterUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyClusterDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHrCompetencyCluster,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('HrCompetencyClusterDetail')
)(HrCompetencyClusterDetailView);