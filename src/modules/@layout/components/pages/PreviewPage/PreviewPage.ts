import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { IQuerySingleState } from '@generic/interfaces';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { IAppBarMenu } from '@layout/interfaces';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

import { PreviewPageView } from './PreviewPageView';

interface IOwnOption {
  state: IQuerySingleState<any, any>;
  options?: IAppBarMenu[];
  info: {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    title: string;
    description: string;
    parentUrl?: string;
  };
  onLoadApi: () => void;
  onLoadedApi?: () => void;
  primary: (data: any) => JSX.Element;
  secondary?: (data: any) => JSX.Element[];
}

interface IOwnState {
  isAdmin: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setAdmin: StateHandler<IOwnState>;
}

interface IOwnHandler {

}

export type PreviewPageState = Pick<PreviewPageProps, 'isAdmin'>;

export type PreviewPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithOidc
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar
  & InjectedIntlProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isAdmin: false
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setAdmin: (prev: IOwnState) => (): Partial<IOwnState> => ({
    isAdmin: true
  })
};

const handlerCreators: HandleCreators<PreviewPageProps, IOwnHandler> = {
  
};

const lifecycles: ReactLifeCycleFunctions<PreviewPageProps, IOwnState> = {
  componentDidMount() {
    // get page config
    const page = this.props.info;

    // configure view
    this.props.layoutDispatch.setupView({
      view: {
        uid: page.uid,
        parentUid: page.parentUid,
        title: page.title,
        subTitle: page.description,
      },
      parentUrl: page.parentUrl,
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isModeList: false,
        isModeSearch: false,
        isMoreVisible: false
      }
    });

    // checking admin status
    const { user } = this.props.oidcState;
    let result: boolean = false;
    if (user) {
      const role: string | string[] | undefined = user.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        this.props.setAdmin();
      }
    }

    // loading data event from config
    this.props.onLoadApi();
  },
  componentDidUpdate(prevProps: PreviewPageProps, prevState: IOwnState) {
    // handling updated page options state
    if (this.props.options && this.props.options !== prevProps.options) {
      this.props.layoutDispatch.moreShow();
      this.props.appBarDispatch.assignMenus(this.props.options);
    }
    
    // handling updated response state
    if (this.props.state.response !== prevProps.state.response) {
      if (this.props.onLoadedApi) {
        this.props.onLoadedApi();
      }
    }
  },
  componentWillUnmount() {
    // reset top bar back to default 
    this.props.appBarDispatch.dispose();
  }
};

export const PreviewPage = compose<PreviewPageProps, IOwnOption>(
  setDisplayName('PreviewPage'),
  withOidc,
  withLayout,
  withAppBar,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles),
  withWidth(),
  injectIntl
)(PreviewPageView);