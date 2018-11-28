import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { IResponseSingle } from '@generic/interfaces';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
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
  parentUrl?: (props: Tinner) => string;
  hasMore?: boolean | false;
  moreOptions?: (props: Tinner, state: SingleState, callback: SingleHandler) => IAppBarMenu[];
  showActionCentre?: boolean | false;
  onDataLoad: (props: Tinner, callback: SingleHandler, forceReload?: boolean | false) => void;
  onDataLoaded?: (props: Tinner) => void;
  onUpdated: (props: Tinner, callback: SingleHandler) => void;
  primaryComponent: (data: Tresponse, props: Tinner) => JSX.Element;
  secondaryComponents: (data: Tresponse, props: Tinner) => JSX.Element[];
}

interface OwnOption {
  config: SingleConfig<any, any>;
  connectedProps: any;
  shouldDataReload?: boolean;
}

interface OwnState {
  // status
  forceReload: boolean;
  isAdmin: boolean;
  isLoading: boolean;
  
  // data response
  response?: IResponseSingle<any> | undefined;

  // data status
  statusType?: WorkflowStatusType;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setLoading: StateHandler<OwnState>;
  setSource: StateHandler<OwnState>;
  setAdmin: StateHandler<OwnState>;
  setStatusType: StateHandler<OwnState>;
}

interface OwnHandler {
  handleLoading: (isLoading: boolean) => void;
  handleResponse: (response: IResponseSingle<any> | undefined) => void;
  handleStatusType: (statusType: string) => void;
  handleForceReload: () => void;
}

export type SingleState = Pick<SinglePageProps, 'isAdmin' | 'response' | 'statusType'>;
export type SingleHandler = Pick<SinglePageProps, 'handleStatusType' | 'handleLoading' | 'handleResponse' | 'handleForceReload'>;

export type SinglePageProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithOidc
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  isAdmin: false,
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
  }),
  setAdmin: (prev: OwnState) => (): Partial<OwnState> => ({
    isAdmin: true
  }),
  setStatusType: (prev: OwnState) => (statusType?: WorkflowStatusType): Partial<OwnState> => ({
    statusType
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
  handleStatusType: (props: SinglePageProps) => (statusType: string) => {
    props.setStatusType(statusType);
  }
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
      parentUrl: this.props.config.parentUrl ? this.props.config.parentUrl(this.props.connectedProps) : undefined,
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: this.props.config.showActionCentre,
        isMoreVisible: this.props.config.hasMore,
        isModeSearch: false
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
    this.props.config.onDataLoad(this.props.connectedProps, this.props);
  },
  componentDidUpdate(prevProps: SinglePageProps, prevState: OwnState) {
    // track force reload changes
    if (this.props.forceReload !== prevProps.forceReload) {
      if (this.props.forceReload) {
        this.props.config.onDataLoad(this.props.connectedProps, this.props, true);
      }
    }

    // track reload request from child
    if (this.props.shouldDataReload !== prevProps.shouldDataReload) {
      if (this.props.shouldDataReload) {
        this.props.config.onDataLoad(this.props.connectedProps, this.props, true);
      }
    }

    // track inner props changes
    if (this.props.connectedProps !== prevProps.connectedProps) {  
      this.props.config.onUpdated(this.props.connectedProps, this.props);
    }

    // track response changes
    if (this.props.response !== prevProps.response) {
      // call after receive any response 
      if (this.props.config.onDataLoaded) {
        this.props.config.onDataLoaded(this.props.connectedProps);
      }

      // assign more menu items
      if (this.props.config.hasMore && this.props.config.moreOptions) {
        const menuOptions = this.props.config.moreOptions(this.props.connectedProps, this.props, this.props);

        this.props.appBarDispatch.assignMenus(menuOptions);
      }
    }
  },
  componentWillUnmount() {
    // reset top bar back to default 
    this.props.appBarDispatch.dispose();
  }
};

export const SinglePage = compose<SinglePageProps, OwnOption>(
  setDisplayName('SinglePage'),
  withOidc,
  withStyles(styles),
  withWidth(),
  withLayout,
  withAppBar,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(SinglePageView);