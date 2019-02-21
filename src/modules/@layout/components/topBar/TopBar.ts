import AppEvent from '@constants/AppEvent';
import { ICollectionValue } from '@layout/classes/core';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { IAppBarMenu } from '@layout/interfaces';
import { WithStyles, withStyles, WithTheme, withTheme } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
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

import { TopBarView } from './TopBarView';

type TopBarMode = 'normal' | 'selection' | 'search';

interface IOwnOption {
  // isOpenMenu: boolean;
  // onClickMenu: () => void;
  // onClickNotif: () => void;
}

interface IOwnState {
  mode: TopBarMode;
  search?: string;
  field?: ICollectionValue;
  isShowMenu: boolean;
  isShowFields: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setMode: StateHandler<IOwnState>;
  setSearch: StateHandler<IOwnState>;
  setField: StateHandler<IOwnState>;
  setFieldVisibility: StateHandler<IOwnState>;
  setMenuVisibility: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnClickMenu: (event: React.MouseEvent) => void;
  handleOnClickNotif: (event: React.MouseEvent) => void;
  handleOnClickBack: (event: React.MouseEvent) => void;
  handleOnClickSearch: (event: React.MouseEvent) => void;
  handleOnClickMore: (event: React.MouseEvent) => void;
  handleOnClickMoreItem: (menu: IAppBarMenu) => void;
  handleOnCloseMore: () => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleOnDiscardSearch: () => void;
  handleOnClearSearch: () => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleOnDiscardSelection: () => void;
  handleOnClickField: (field?: ICollectionValue | undefined) => void;
  handleOnClickProcess: () => void;
  getCountNotif: () => number;
}

export type TopBarProps
  = WithAppBar
  & WithLayout
  & WithAppBar
  & WithNotification
  & WithWidth
  & WithTheme
  & WithStyles<typeof styles>
  & RouteComponentProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<TopBarProps, IOwnState> = (props: TopBarProps): IOwnState => ({
  mode: props.layoutState.isModeSearch ? 'search' : 'normal',
  search: '',
  field: undefined,
  isShowMenu: false,
  isShowFields: false
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setMode: (prev: IOwnState) => (mode: TopBarMode): Partial<IOwnState> => ({
    mode
  }),
  setSearch: (prev: IOwnState) => (value: string): Partial<IOwnState> => ({
    search: value,
    isShowFields: value.length >= 3
  }),
  setField: (prev: IOwnState) => (field: ICollectionValue | undefined): Partial<IOwnState> => ({
    field
  }),
  setFieldVisibility: (prev: IOwnState) => (): Partial<IOwnState> => ({
    isShowFields: !prev.isShowFields
  }),
  setMenuVisibility: (prev: IOwnState) => (): Partial<IOwnState> => ({
    isShowMenu: !prev.isShowMenu
  })
};

const handlerCreators: HandleCreators<TopBarProps, IOwnHandler> = {
  handleOnClickMenu: (props: TopBarProps) => (event: React.MouseEvent) => {
    dispatchEvent(new CustomEvent(AppEvent.DrawerLeft));
  },
  handleOnClickNotif: (props: TopBarProps) => (event: React.MouseEvent) => {
    dispatchEvent(new CustomEvent(AppEvent.DrawerRight));
  },
  handleOnClickBack: (props: TopBarProps) => (event: React.MouseEvent) => {
    props.layoutDispatch.navBackShow();
    
    if (props.layoutState.parentUrl) {
      props.history.push(props.layoutState.parentUrl);
    } else {
      props.history.goBack();
    }
  },
  handleOnClickSearch: (props: TopBarProps) => (event: React.MouseEvent) => {
    event.preventDefault();

    props.setMode('search');
    props.layoutDispatch.modeSearchOn();
  },
  handleOnClickMore: (props: TopBarProps) => (event: React.MouseEvent) => {
    props.setMenuVisibility();
  },
  handleOnClickMoreItem: (props: TopBarProps) => (item: IAppBarMenu) => {
    // hide menu popup
    props.setMenuVisibility();
    
    // call menu item callback (if any)
    if (item.onClick) {
      item.onClick();
    }
  },
  handleOnCloseMore: (props: TopBarProps) => () => {
    props.setMenuVisibility();
  },
  handleOnChangeSearch: (props: TopBarProps) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.setSearch(event.target.value);
  },
  handleOnDiscardSearch: (props: TopBarProps) => () => {
    props.setFieldVisibility();
    props.setField(undefined);
    props.setSearch('');
    props.setMode('normal');
    props.appBarState.onSearching();
  },
  handleOnClearSearch: (props: TopBarProps) => () => {
    props.setFieldVisibility();
    props.setField(undefined);
    props.setSearch('');
  },
  handleOnKeyUpSearch: (props: TopBarProps) => (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    if (event.keyCode === 13) {
      if (props.isShowFields) {
        props.setFieldVisibility();
      }

      props.appBarState.onSearching(props.search, props.field);
    }
  },
  handleOnDiscardSelection: (props: TopBarProps) => () => {
    props.appBarDispatch.selectionClear();

    props.appBarState.onSelectionClear();
  },
  handleOnClickField: (props: TopBarProps) => (field: ICollectionValue) => {
    props.setField(field);
    props.setFieldVisibility();
    props.appBarState.onSearching(props.search, field);
  },
  handleOnClickProcess: (props: TopBarProps) => () => {
    if (props.appBarState.selections) {
      // call process callback
      props.appBarState.onSelectionProcess(props.appBarState.selections);
      
      // clear selection on redux states
      props.appBarDispatch.selectionClear();
      
      // call selection clear callback
      props.appBarState.onSelectionClear();
    }
  },
  getCountNotif: (props: TopBarProps) => (): number => {
    const { response: result } = props.notificationState;

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

const lifeCycles: ReactLifeCycleFunctions<TopBarProps, IOwnState> = {
  componentDidMount () {
    this.props.appBarDispatch.selectionClear();
  },
  componentDidUpdate(prevProps: TopBarProps) {
    // layout comparer
    if (this.props.layoutState !== prevProps.layoutState) {

      if (this.props.layoutState.view) {
        // search mode checking
        if (this.props.layoutState.isModeSearch) {
          this.props.setMode('search');
        } else { 
          // when search has value, then turn back it into search mode
          if (this.props.layoutState.view.isSearchable && this.props.search !== '') {
            this.props.setMode('search');
          } else {
            this.props.setMode('normal');
          }
        }
      }
    }

    // topbar comparer
    if (this.props.appBarState !== prevProps.appBarState) {
      if (this.props.layoutState.isModeList && this.props.appBarState.selections) {
        this.props.setMode('selection');
      } else {
        this.props.setMode('normal');
      }
    }
  }
};

export const TopBar = compose<TopBarProps, IOwnOption>(
  setDisplayName('TopBar'),
  withLayout,
  withNotification,
  withAppBar,
  withRouter,
  withTheme(),
  withStyles(styles),
  withWidth(),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(TopBarView);