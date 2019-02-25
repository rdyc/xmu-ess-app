import AppEvent from '@constants/AppEvent';
import { IPageInfo } from '@generic/interfaces';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { Anchor } from '@layout/types';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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

import { TopBarView } from './TopBarView';

interface IOwnOption {
  defaultAnchor: Anchor;
}

interface IOwnState {
  anchor: Anchor;
  title?: string;
  parentUrl?: string;
  totalNotif: number;
  searchComponent?: React.ReactNode;
  customComponent?: React.ReactNode;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setAnchor: StateHandler<IOwnState>;
  setPage: StateHandler<IOwnState>;
  setNotif: StateHandler<IOwnState>;
  setSearchComponent: StateHandler<IOwnState>;
  setCustomComponent: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangePage: (event: CustomEvent<IPageInfo>) => void;
  handleOnChangeAnchor: (event: CustomEvent) => void;
  handleOnChangeNotif: (event: CustomEvent<number>) => void;
  handleOnChangeSearch: (event: CustomEvent<React.ReactNode>) => void;
  handleOnChangeCustom: (event: CustomEvent<React.ReactNode>) => void;
  handleOnClickMenu: (event: React.MouseEvent) => void;
  handleOnClickNotif: (event: React.MouseEvent) => void;
  handleOnClickBack: (event: React.MouseEvent) => void;
}

export type TopBarProps
  = WithMasterPage
  & WithWidth
  & WithStyles<typeof styles>
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<TopBarProps, IOwnState> = (props: TopBarProps): IOwnState => ({
  anchor: props.defaultAnchor,
  totalNotif: 0
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setAnchor: (state: IOwnState) => (): Partial<IOwnState> => ({
    anchor: state.anchor === 'left' ? 'right' : 'left'
  }),
  setPage: (state: IOwnState) => (title?: string, parentUrl?: string): Partial<IOwnState> => ({
    title,
    parentUrl,
    searchComponent: undefined,
    customComponent: undefined
  }),
  setNotif: (state: IOwnState) => (totalNotif: number): Partial<IOwnState> => ({
    totalNotif
  }),
  setSearchComponent: (state: IOwnState) => (component?: React.ReactNode): Partial<IOwnState> => ({
    searchComponent: component
  }),
  setCustomComponent: (state: IOwnState) => (component?: React.ReactNode): Partial<IOwnState> => ({
    customComponent: component
  }),
};

const handlerCreators: HandleCreators<TopBarProps, IOwnHandler> = {
  handleOnChangePage: (props: TopBarProps) => (event: CustomEvent<IPageInfo>) => {
    props.setPage(event.detail.title, event.detail.parentUrl);
  },
  handleOnChangeAnchor: (props: TopBarProps) => (event: CustomEvent) => {
    props.setAnchor();
  },
  handleOnChangeNotif: (props: TopBarProps) => (event: CustomEvent<number>) => {
    props.setNotif(event.detail);
  },
  handleOnChangeSearch: (props: TopBarProps) => (event: CustomEvent<React.ReactNode>) => {
    props.setSearchComponent(event.detail);
  },
  handleOnChangeCustom: (props: TopBarProps) => (event: CustomEvent<React.ReactNode>) => {
    props.setCustomComponent(event.detail);
  },
  handleOnClickMenu: (props: TopBarProps) => (event: React.MouseEvent) => {
    dispatchEvent(new CustomEvent(AppEvent.onChangeDrawerLeft));
  },
  handleOnClickNotif: (props: TopBarProps) => (event: React.MouseEvent) => {
    dispatchEvent(new CustomEvent(AppEvent.onChangeDrawerRight));
  },
  handleOnClickBack: (props: TopBarProps) => (event: React.MouseEvent) => {
    if (props.parentUrl) {
      props.masterPage.changeRoute({
        path: props.parentUrl
      });
    }
  }
};

const lifeCycles: ReactLifeCycleFunctions<TopBarProps, IOwnState> = {
  componentWillMount() {
    addEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
    addEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
    addEventListener(AppEvent.onChangeNotif, this.props.handleOnChangeNotif);
    addEventListener(AppEvent.onChangeSearchComponent, this.props.handleOnChangeSearch);
    addEventListener(AppEvent.onChangeCustomComponent, this.props.handleOnChangeCustom);
  },
  componentWillUnmount() {
    removeEventListener(AppEvent.onChangeAnchor, this.props.handleOnChangeAnchor);
    removeEventListener(AppEvent.onChangePage, this.props.handleOnChangePage);
    removeEventListener(AppEvent.onChangeNotif, this.props.handleOnChangeNotif);
    removeEventListener(AppEvent.onChangeSearchComponent, this.props.handleOnChangeSearch);
    removeEventListener(AppEvent.onChangeCustomComponent, this.props.handleOnChangeCustom);
  }
};

export const TopBar = compose<TopBarProps, IOwnOption>(
  setDisplayName('TopBar'),
  withMasterPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles),
  withStyles(styles),
  withWidth()
)(TopBarView);