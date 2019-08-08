import { AppRole } from '@constants/AppRole';
import { KPICategoryUserAction } from '@kpi/classes/types/category/KPICategoryUserAction';
import { WithKPICategory, withKPICategory } from '@kpi/hoc/withKPICategory';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { IPopupMenuOption } from '@layout/components/PopupMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { layoutMessage } from '@layout/locales/messages';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import { compose, HandleCreators, lifecycle, mapper, ReactLifeCycleFunctions, setDisplayName, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { KPICategoryDetailView } from './KPICategoryDetailView';

interface IOwnRouteParams {
  categoryUid: string;
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
  action?: KPICategoryUserAction;
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
  stateUpdate: StateHandler<IOwnState>;
  setModify: StateHandler<IOwnState>;
}

export type CategoryDetailProps
  = WithUser
  & WithOidc
  & WithLayout
  & WithKPICategory
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnState
  & IOwnStateUpdaters
  & IOwnHandler;

const createProps: mapper<CategoryDetailProps, IOwnState> = (props: CategoryDetailProps): IOwnState => {
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
    dialogCancelLabel: props.intl.formatMessage(layoutMessage.action.disagree),
    dialogConfirmLabel: props.intl.formatMessage(layoutMessage.action.agree)
  };
};

const stateUpdaters: StateUpdaters<CategoryDetailProps, IOwnState, IOwnStateUpdaters> = {
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setOptions: () => (options?: IPopupMenuOption[]): Partial<IOwnState> => ({
    menuOptions: options
  }),
  setShouldLoad: (state: IOwnState) => (): Partial<IOwnState> => ({
    shouldLoad: !state.shouldLoad
  }),
  setModify: (prevState: IOwnState, props: CategoryDetailProps) => (): Partial<IOwnState> => ({
    action: KPICategoryUserAction.Modify,
    dialogOpen: true,
    dialogTitle: props.intl.formatMessage(kpiMessage.category.confirm.modifyTitle),
    dialogContent: props.intl.formatMessage(kpiMessage.category.confirm.modifyDescription, { state: 'category'}),
  }),
};

const handlerCreators: HandleCreators<CategoryDetailProps, IOwnHandler> = {
  handleOnLoadApi: (props: CategoryDetailProps) => () => { 
    if (props.userState.user && props.match.params.categoryUid && !props.kpiCategoryState.detail.isLoading) {
      props.kpiCategoryDispatch.loadDetailRequest({
        categoryUid: props.match.params.categoryUid,
      });
    }
  },
  handleOnSelectedMenu: (props: CategoryDetailProps) => (item: IPopupMenuOption) => { 
    switch (item.id) {
      case KPICategoryUserAction.Refresh:
        props.setShouldLoad();
        break;
      case KPICategoryUserAction.Modify:
        props.setModify();        
        break;

      default:
        break;
    }
  },
  handleOnCloseDialog: (props: CategoryDetailProps) => () => {
    props.stateUpdate({
      dialogOpen: false
    });
  },
  handleOnConfirm: (props: CategoryDetailProps) => () => {
    const { response } = props.kpiCategoryState.detail;

    // skipp untracked action or empty response
    if (!props.action || !response) {
      return;
    }

    // define vars
    let categoryUid: string | undefined;

    // get project uid
    if (response.data) {
      categoryUid = response.data.uid;
    }

    // actions with new page
    const actions = [
      KPICategoryUserAction.Modify
    ];

    if (actions.indexOf(props.action) !== -1) {
      let next: string = '404';

      switch (props.action) {
        case KPICategoryUserAction.Modify:
          next = '/kpi/categories/form';
          break;

        default:
          break;
      }

      props.history.push(next, { 
        uid: categoryUid 
      });
    }
  },
};

const lifecycles: ReactLifeCycleFunctions<CategoryDetailProps, IOwnState> = {
  componentDidUpdate(prevProps: CategoryDetailProps) {
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
    if (this.props.kpiCategoryState.detail.response !== prevProps.kpiCategoryState.detail.response) {
      const { isLoading } = this.props.kpiCategoryState.detail;

      // generate option menus
      const options: IPopupMenuOption[] = [
        {
          id: KPICategoryUserAction.Refresh,
          name: this.props.intl.formatMessage(layoutMessage.action.refresh),
          enabled: !isLoading,
          visible: true
        },
        {
          id: KPICategoryUserAction.Modify,
          name: this.props.intl.formatMessage(layoutMessage.action.modify),
          enabled: true,
          visible: true
        }
      ];

      this.props.setOptions(options);
    }
  }
};

export const KPICategoryDetail = compose(
  setDisplayName('KPICategoryDetail'),
  withRouter,
  withOidc,
  withUser,
  withLayout,
  withKPICategory,
  injectIntl,
  withStateHandlers<IOwnState, IOwnStateUpdaters, {}>(createProps, stateUpdaters),
  withHandlers<CategoryDetailProps, IOwnHandler>(handlerCreators),
  lifecycle(lifecycles),
)(KPICategoryDetailView);