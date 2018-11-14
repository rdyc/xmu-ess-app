import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNotification, withNotification } from '@layout/hoc/withNotification';
import { IAppBarMenu, IListBarField } from '@layout/interfaces';
import { WithStyles, withStyles, WithTheme, withTheme } from '@material-ui/core';
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
  isShowFields: boolean;
  isOpenMenu: boolean;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setMode: StateHandler<OwnState>;
  setSearch: StateHandler<OwnState>;
  setField: StateHandler<OwnState>;
  setFieldVisibility: StateHandler<OwnState>;
  setMenuVisibility: StateHandler<OwnState>;
}

interface OwnHandler {
  handleOnClickSearch: (event: React.MouseEvent) => void;
  handleOnClickMenuItem: (menu: IAppBarMenu) => void;
  handleOnChangeSearch: (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleOnDiscardSearch: () => void;
  handleOnClearSearch: () => void;
  handleOnKeyUpSearch: (event: React.KeyboardEvent<HTMLTextAreaElement | HTMLInputElement>) => void;
  handleOnClickField: (field?: IListBarField | undefined) => void;
  getClassNames: () => string[];
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
  & OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler;

const createProps: mapper<TopBarProps, OwnState> = (props: TopBarProps): OwnState => ({
  mode: props.layoutState.isModeSearch ? 'search' : 'normal',
  search: '',
  field: undefined,
  isShowFields: false,
  isOpenMenu: false
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setMode: (prev: OwnState) => (mode: TopBarMode): Partial<OwnState> => ({
    mode
  }),
  setSearch: (prev: OwnState) => (value: string): Partial<OwnState> => ({
    search: value,
    isShowFields: value.length >= 3
  }),
  setField: (prev: OwnState) => (field: IListBarField | undefined): Partial<OwnState> => ({
    field
  }),
  setFieldVisibility: (prev: OwnState) => (): Partial<OwnState> => ({
    isShowFields: !prev.isShowFields
  }),
  setMenuVisibility: (prev: OwnState) => (): Partial<OwnState> => ({
    isOpenMenu: !prev.isOpenMenu
  })
};

const handlerCreators: HandleCreators<TopBarProps, OwnHandler> = {
  handleOnClickSearch: (props: TopBarProps) => (event: React.MouseEvent) => {
    event.preventDefault();

    props.setMode('search');
    props.layoutDispatch.modeSearchOn();
  },
  handleOnChangeSearch: (props: TopBarProps) => (event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
    props.setSearch(event.target.value);
  },
  handleOnClickMenuItem: (props: TopBarProps) => (menu: IAppBarMenu) => {
    // hide menu popup
    props.setMenuVisibility();
    
    // call menu item callback (if any)
    if (menu.onClick) {
      menu.onClick();
    }
  },
  handleOnDiscardSearch: (props: TopBarProps) => () => {
    props.setFieldVisibility();
    props.setField(undefined);
    props.setSearch('');
    props.setMode('normal');
    props.appBarState.onSearch();
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

      props.appBarState.onSearch(props.search, props.field);
    }
  },
  handleOnClickField: (props: TopBarProps) => (field: IListBarField) => {
    props.setField(field);
    props.setFieldVisibility();
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

const lifeCycles: ReactLifeCycleFunctions<TopBarProps, OwnState> = {
  componentDidUpdate(prevProps: TopBarProps) {
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
  }
};

export const TopBar = compose<TopBarProps, OwnOption>(
  withLayout,
  withNotification,
  withAppBar,
  withRouter,
  withTheme(),
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycles)
)(TopBarView);