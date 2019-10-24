import { AppRole } from '@constants/AppRole';
import { IHrCompetencyClusterUserAction } from '@hr/classes/types';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { hrMessage } from '@hr/locales/messages/hrMessage';
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
  handleOnCloseDialog: () => void;
  handleOnConfirm: () => void;
}

interface IOwnState {
  menuOptions?: IPopupMenuOption[];
  shouldLoad: boolean;
  isAdmin: boolean;
  action?: IHrCompetencyClusterUserAction;
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string;
  dialogContent?: string;
  dialogCancelLabel?: string;
  dialogConfirmLabel?: string;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
  setDefault: StateHandler<IOwnState>;
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
      shouldLoad: false,
      dialogFullScreen: false,
      dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyClusterDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyClusterDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyClusterDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyClusterDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyClusterUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Cluster'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'cluster'}),
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

const handlerCreators: HandleCreators<HrCompetencyClusterDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyClusterDetailProps) => () => { 
    const { user } = props.userState;
    const competencyUid = props.match.params.clusterUid;
    const { isLoading } = props.hrCompetencyClusterState.detail;

    if (user && competencyUid && !isLoading) {
      props.hrCompetencyClusterDispatch.loadDetailRequest({
        competencyUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyClusterDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyClusterUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IHrCompetencyClusterUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyClusterDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyClusterDetailProps) => () => {
    const { response } = props.hrCompetencyClusterState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let clusterUid: string | undefined;

    // get project uid
    if (response.data) {
      clusterUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyClusterUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyClusterUserAction.Modify:
          next = '/hr/competency/cluster/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        uid: clusterUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyClusterDetailProps, IOwnState> = {
  componentDidMount() {
    // console.log('WOI');
  },
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
        },
        {
          id: IHrCompetencyClusterUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
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