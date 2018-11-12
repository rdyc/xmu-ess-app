import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { IAppBarMenu, IListBarField } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { TopBarView } from './TopBarView';

type TopBarMode = 'normal' | 'list' | 'search';

interface OwnOption {
  
}

interface OwnState {
  mode: TopBarMode;
  search: string;
  field: IListBarField | undefined;
  isSearching: boolean;
  isOpenMenu: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setMode: StateHandler<OwnState>;
  setSearch: StateHandler<OwnState>;
  setField: StateHandler<OwnState>;
  setSearching: StateHandler<OwnState>;
  setMenuVisibility: StateHandler<OwnState>;
}

interface OwnHandler {
  handleOnClickMenu: (menu: IAppBarMenu) => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleOnClickDivSearch: (event: React.MouseEvent<HTMLDivElement>) => void;
  handleOnDiscardSearch: () => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleOnClickField: (field: IListBarField) => void;
  getClassNames: () => string[];
  getCountNotif: () => number;
}

export type TopBarProps
  = WithAppBar
  & WithLayout
  & WithAppBar
  & WithNotification
  & WithWidth 
  & WithStyles<typeof styles>
  & RouteComponentProps
  & OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  mode: 'normal',
  search: '',
  field: undefined,
  isSearching: false,
  isOpenMenu: false
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setMode: (prev: OwnState) => (mode: TopBarMode): Partial<OwnState> => ({
    mode
  }),
  setSearch: (prev: OwnState) => (value: string): Partial<OwnState> => ({
    search: value
  }),
  setField: (prev: OwnState) => (field: IListBarField | undefined): Partial<OwnState> => ({
    field
  }),
  setSearching: (prev: OwnState) => (): Partial<OwnState> => ({
    isSearching: !prev.isSearching
  }),
  setMenuVisibility: (prev: OwnState) => (): Partial<OwnState> => ({
    isOpenMenu: !prev.isOpenMenu
  })
};

const handlerCreators: HandleCreators<TopBarProps, OwnHandler> = {
  handleOnChangeSearch: (props: TopBarProps) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.setSearch(event.target.value);
  },
  handleOnClickMenu: (props: TopBarProps) => (menu: IAppBarMenu) => {
    props.appBarDispatch.menuHide();
    props.appBarState.onClickMenu(menu);
  },
  handleOnClickDivSearch: (props: TopBarProps) => (event: React.MouseEvent<HTMLDivElement>) => {
    event.preventDefault();

    props.setSearching();
  },
  handleOnDiscardSearch: (props: TopBarProps) => () => {
    props.setSearching();
    props.setField(undefined);
    props.setSearch('');
    props.setMode('normal');
    props.appBarState.onSearch();
  },
  handleOnKeyUpSearch: (props: TopBarProps) => (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.keyCode === 13) {
      props.setField(undefined);
      props.setSearching();
      props.appBarState.onSearch(props.search);
    }
  },
  handleOnClickField: (props: TopBarProps) => (field: IListBarField) => {
    props.setField(field);
    props.setSearching();
    props.appBarState.onSearch(props.search, field);
  },
  getClassNames: (props: TopBarProps) => (): string[] => {
    const { classes } = props;
    const { anchor, isDrawerMenuVisible } = props.layoutState;

    const shift = anchor === 'right' ? classes.appBarShiftRight : classes.appBarShiftLeft;

    return isDrawerMenuVisible ? [classes.appBar] : [classes.appBar, shift];
  },
  getCountNotif: (props: TopBarProps) => (): number => {
    const { result } = props.notificationState;

    let count: number = 0;
    
    if (result && result.data) {
      if (Array.isArray(result.data)) {
        result.data.forEach(element =>
          element.details.forEach(detail => {
            count = count + detail.total;
          })
        );
      }
    }

    return count;
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<TopBarProps, OwnState> = {
  // componentWillMount() {
  //   console.log('component will mount');
  // },
  // componentWillReceiveProps() {
  //   console.log('component will receive props');
  // },
  // componentDidMount() {
  //   console.log('component did mount');
  // },
  // componentWillUpdate() {
  //   console.log('component will update');
  // },
  // componentDidUpdate() {
  //   console.log('component did update');
  // },
  // componentWillUnmount() {
  //   console.log('component will unmount');
  // }
};

export const TopBar = compose<TopBarProps, OwnOption>(
  withLayout,
  withNotification,
  withAppBar,
  withRouter,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(TopBarView);