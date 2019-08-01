import { AppRole } from '@constants/AppRole';
import { IHrCompetencyCategoryUserAction } from '@hr/classes/types';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
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

import { HrCompetencyCategoryDetailView } from './HrCompetencyCategoryDetailView';

interface IOwnRouteParams {
  categoryUid: string;
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
  action?: IHrCompetencyCategoryUserAction;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  setOptions: StateHandler<IOwnState>;
  setShouldLoad: StateHandler<IOwnState>;
}

export type HrCompetencyCategoryDetailProps
  = WithOidc
  & WithUser
  & WithHrCompetencyCategory
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<HrCompetencyCategoryDetailProps, IOwnState> = (props: HrCompetencyCategoryDetailProps): IOwnState => { 
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

const stateUpdaters: StateUpdaters<HrCompetencyCategoryDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyCategoryDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyCategoryDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  })
};

const handlerCreators: HandleCreators<HrCompetencyCategoryDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyCategoryDetailProps) => () => { 
    const { user } = props.userState;
    const clusterUid = props.match.params.clusterUid;
    const categoryUid = props.match.params.categoryUid;
    const { isLoading } = props.hrCompetencyCategoryState.detail;

    if (user && clusterUid && categoryUid && !isLoading) {
      props.hrCompetencyCategoryDispatch.loadDetailRequest({
        clusterUid,
        categoryUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyCategoryDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyCategoryUserAction.Refresh:
        props.setShouldLoad();
        break;

      default:
        break;
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<HrCompetencyCategoryDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: HrCompetencyCategoryDetailProps) {
    // handle updated reload state
    if (this.props.shouldLoad && this.props.shouldLoad !== prevProps.shouldLoad) {
      this.props.setShouldLoad();
      this.props.handleOnLoadApi();
    }
    
    // handle updated route params
    if (this.props.match.params.categoryUid !== prevProps.match.params.categoryUid) {
      this.props.handleOnLoadApi();
    }

      // handle updated response state
    if (this.props.hrCompetencyCategoryState.detail.response !== prevProps.hrCompetencyCategoryState.detail.response) {
      const { isLoading } = this.props.hrCompetencyCategoryState.detail;

      const options: IPopupMenuOption[] = [
        {
          id: IHrCompetencyCategoryUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true,
        }
      ];

      this.props.setOptions(options);
    }
  }
}; 

export const HrCompetencyCategoryDetail = compose(
  withRouter,
  withOidc,
  withUser,
  withHrCompetencyCategory,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  setDisplayName('HrCompetencyCategoryDetail')
)(HrCompetencyCategoryDetailView);