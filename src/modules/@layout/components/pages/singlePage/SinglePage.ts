import AppMenu from '@constants/AppMenu';
import { IResponseSingle } from '@generic/interfaces';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
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

import { SinglePageView } from './SinglePageView';

export interface SingleConfig<Tresponse, Tinner> {
  page: (props: Tinner) => {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    title: string;
    description: string;
  };
  hasMore?: boolean | false;
  moreOptions?: (props: Tinner, callback: SingleHandler) => IAppBarMenu[];
  showActionCentre?: boolean | false;
  onDataLoad: (props: Tinner, callback: SingleHandler, forceReload?: boolean | false) => void;
  onUpdated: (props: Tinner, callback: SingleHandler) => void;
  primaryComponent: (data: Tresponse, props: Tinner) => JSX.Element;
  secondaryComponent: (data: Tresponse, props: Tinner) => JSX.Element[];
  tertiaryComponent: (data: Tresponse, props: Tinner) => JSX.Element[];
}

interface OwnOption {
  config: SingleConfig<any, any>;
  connectedProps: any;
}

interface OwnState {
  // status
  forceReload: boolean;
  isLoading: boolean;
  
  // data response
  response?: IResponseSingle<any> | undefined;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setLoading: StateHandler<OwnState>;
  setSource: StateHandler<OwnState>;
}

interface OwnHandler {
  handleLoading: (isLoading: boolean) => void;
  handleResponse: (response: IResponseSingle<any> | undefined) => void;
  handleForceReload: () => void;
}

export type SingleHandler = Pick<SinglePageProps, 'handleLoading' | 'handleResponse' | 'handleForceReload'>;

export type SinglePageProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  isLoading: false,
  forceReload: false
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setForceReload: (prev: OwnState) => (): Partial<OwnState> => ({
    forceReload: true
  }),
  setLoading: (prev: OwnState) => (isLoading: boolean): Partial<OwnState> => ({
    isLoading
  }),
  setSource: (prev: OwnState) => (response: IResponseSingle<any> | undefined): Partial<OwnState> => ({
    response,
    forceReload: false
  })
};

const handlerCreators: HandleCreators<SinglePageProps, OwnHandler> = {
  handleLoading: (props: SinglePageProps) => (isLoading: boolean) => {
    props.setLoading(isLoading);
  },
  handleResponse: (props: SinglePageProps) => (response: IResponseSingle<any> | undefined) => {
    props.setSource(response);
  },
  handleForceReload: (props: SinglePageProps) => () => {
    props.setForceReload();
  },
};

const lifecycles: ReactLifeCycleFunctions<SinglePageProps, OwnState> = {
  componentDidMount() {
    // configure view
    const page = this.props.config.page(this.props.connectedProps);
    this.props.layoutDispatch.setupView({
      view: {
        uid: page.uid,
        parentUid: page.parentUid,
        title: page.title,
        subTitle: page.description,
      },
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: this.props.config.showActionCentre,
        isMoreVisible: this.props.config.hasMore,
        isModeSearch: false
      }
    });

    // assign more menu items
    if (this.props.config.hasMore && this.props.config.moreOptions) {
      const menuOptions = this.props.config.moreOptions(this.props.connectedProps, this.props);

      this.props.appBarDispatch.assignMenus(menuOptions);
    }

    // loading data event from config
    this.props.config.onDataLoad(this.props.connectedProps, this.props);
  },
  componentDidUpdate(prevProps: SinglePageProps, prevState: OwnState) {
    // track force reload changes
    if (this.props.forceReload !== prevProps.forceReload) {
      if (this.props.forceReload) {
        this.props.config.onDataLoad(this.props.connectedProps, this.props, true);
      }
    }

    // track inner props changes
    if (this.props.connectedProps !== prevProps.connectedProps) {  
      this.props.config.onUpdated(this.props.connectedProps, this.props);
    }
  },
  componentWillUnmount() {
    // reset top bar back to default 
    this.props.appBarDispatch.dispose();
  }
};

export const SinglePage = compose<SinglePageProps, OwnOption>(
  setDisplayName('SinglePage'),
  withStyles(styles),
  withWidth(),
  withLayout,
  withAppBar,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(SinglePageView);