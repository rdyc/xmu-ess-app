import AppEvent from '@constants/AppEvent';
import { IPageInfo, IRedirection } from '@generic/interfaces';
import { NotificationProps } from '@home/components/notification';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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

import { ChildPageView, MasterPageView } from './MasterPageView';

const webName = process.env.REACT_APP_WEBSITE_NAME;

interface IOwnOption {
  
}

interface IOwnState {
  isUpdateAvailable: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setUpdateAvailable: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnFoundUpdate: (event: CustomEvent) => void;
  handleOnChangeRoute: (event: CustomEvent) => void;
  handleOnChangePage: (event: CustomEvent<IPageInfo>) => void;
  handleOnClickReload: (event: React.MouseEvent) => void;
}

export type MasterPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithUser
  & WithMasterPage
  & RouteComponentProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  isUpdateAvailable: false
});

const stateUpdaters: StateUpdaters<NotificationProps, IOwnState, IOwnStateUpdater> = {
  setUpdateAvailable: (state: IOwnState) => (): Partial<IOwnState> => ({
    isUpdateAvailable: !state.isUpdateAvailable
  })
};

const handlerCreators: HandleCreators<MasterPageProps, IOwnHandler> = {
  handleOnFoundUpdate: (props: MasterPageProps) => (event: CustomEvent) => {
    props.setUpdateAvailable();
  },
  handleOnChangeRoute: (props: MasterPageProps) => (event: CustomEvent<IRedirection>) => {
    props.history.push(event.detail.path, event.detail.state);
  },
  handleOnChangePage: (props: MasterPageProps) => (event: CustomEvent<IPageInfo>) => {
    const page = event.detail;

    const meta = document.getElementsByTagName('meta'); 	
    const desc = meta.namedItem('description');	

    if (desc && page.description) {	
      desc.content = page.description;	
    }	

    document.title = `${page.title} - ${webName}`;
  },
  handleOnClickReload: (props: MasterPageProps) => (event: React.MouseEvent) => {
    window.location.reload(true);
  } 
};

const lifecycles: ReactLifeCycleFunctions<MasterPageProps, {}> = {
  componentWillMount() {
    addEventListener(AppEvent.onFoundUpdate, this.props.handleOnFoundUpdate);
    addEventListener(AppEvent.onChangeRoute, this.props.handleOnChangeRoute);
    addEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onFoundUpdate, this.props.handleOnFoundUpdate);
    removeEventListener(AppEvent.onChangeRoute, this.props.handleOnChangeRoute);
    removeEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
  }
};

export const MasterPage = compose<MasterPageProps, IOwnOption>(
  setDisplayName('MasterPage'),
  withRouter,
  withUser,
  withMasterPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(MasterPageView);

export type ChildPageProps = WithStyles<typeof styles>;

export const ChildPage = compose<ChildPageProps, IOwnOption>(
  setDisplayName('ChildPage'),
  withStyles(styles)
)(ChildPageView);