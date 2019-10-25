import { AppRole } from '@constants/AppRole';
import { IHrCompetencyCategoryUserAction } from '@hr/classes/types';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
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

import { HrCompetencyCategoryDetailView } from './HrCompetencyCategoryDetailView';

interface IOwnRouteParams {
  categoryUid: string;
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
  action?: IHrCompetencyCategoryUserAction;
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
      shouldLoad: false,
      dialogFullScreen: false,
      dialogOpen: false
  };
};

const stateUpdaters: StateUpdaters<HrCompetencyCategoryDetailProps, IOwnState, IOwnStateUpdaters> = {
  setShouldLoad: (state: IOwnState, props: HrCompetencyCategoryDetailProps) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setOptions: (prevState: IOwnState, props: HrCompetencyCategoryDetailProps) => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setModify: (prevState: IOwnState, props: HrCompetencyCategoryDetailProps) => (): Partial<IOwnState> => ({
    action: IHrCompetencyCategoryUserAction.Modify,
    dialogFullScreen: false,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(hrMessage.shared.confirm.modifyTitle, {state: 'Category'}),
    dialogContent: props.intl.formatMessage(hrMessage.shared.confirm.modifyDescription, {state: 'category'}),
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

const handlerCreators: HandleCreators<HrCompetencyCategoryDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: HrCompetencyCategoryDetailProps) => () => { 
    const { user } = props.userState;
    const clusterUid = props.history.location.state.clusterUid;
    const categoryUid = props.match.params.categoryUid;
    const { isLoading } = props.hrCompetencyCategoryState.detail;

    if (user && clusterUid && categoryUid && !isLoading) {
      props.hrCompetencyCategoryDispatch.loadDetailRequest({
        categoryUid,
        clusterUid
      });
    }
  },
  handleOnSelectedMenu: (props: HrCompetencyCategoryDetailProps) => (item: IPopupMenuOption) => {
    switch (item.id) {
      case IHrCompetencyCategoryUserAction.Refresh:
        props.setShouldLoad();
        break;

      case IHrCompetencyCategoryUserAction.Modify:
        props.setModify();
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: HrCompetencyCategoryDetailProps) => () => {
    props.setDefault();
  },
  handleOnConfirm: (props: HrCompetencyCategoryDetailProps) => () => {
    const { response } = props.hrCompetencyCategoryState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let categoryUid: string | undefined;
    let clusterUid: string | undefined;

    // get project uid
    if (response.data) {
      categoryUid = response.data.uid;
      clusterUid = response.data.competencyUid;
    }

    // actions with new page
    const actions = [
      IHrCompetencyCategoryUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case IHrCompetencyCategoryUserAction.Modify:
          next = '/hr/competency/category/form';
          break;

        default:
          break;
      }

      props.setDefault();

      props.history.push(next, { 
        clusterUid,
        uid: categoryUid
      });
    }
  },
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
        },
        {
          id: IHrCompetencyCategoryUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
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