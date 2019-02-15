import AppMenu from '@constants/AppMenu';
import { IBasePagingFilter, IQueryCollectionState } from '@generic/interfaces';
import { DirectionType } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithPage, withPage } from '@layout/hoc/withPage';
import { IAppBarControl, IAppBarMenu } from '@layout/interfaces';
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
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IDataControl } from '../dataContainer/DataContainer';
import { CollectionPageView } from './CollectionPageView';

export interface IDataBindResult {
  key: any;
  primary: string;
  secondary: string;
  tertiary: string;
  quaternary: string;
  quinary: string;
  senary: string;
}

interface IOwnOption {
  state: IQueryCollectionState<any, any>;
  options?: IAppBarMenu[];
  dataControls?: IDataControl[];
  toolbarControls?: IAppBarControl[];
  info: {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    title: string;
    description: string;
    parentUrl?: string;
  };
  onLoadApi: (filter?: IBasePagingFilter) => void;
  onLoadedApi?: () => void;
  fields: ICollectionValue[];
  hasSearching?: boolean;
  isModeSearch?: boolean;
  hasSelection?: boolean;
  notSelectionTypes?: string[] | [];
  hasNavBack?: boolean;
  onProcessSelection?: (values: string[]) => void;
  onBind: (item: any, index: number) => IDataBindResult;
  onRowRender?: (item: any, index: number) => JSX.Element;
  summaryComponent: (item: any) => JSX.Element;
  actionComponent?: (item: any) => JSX.Element;
}

interface IOwnState {
  // selection
  selected: string[];

  // filter
  find?: string;
  findBy?: string;
  
  // order
  orderBy?: string;
  direction?: 'ascending' | 'descending';
  
  // paging
  page?: number;
  size?: number;

  // transition
  inTransition: boolean;

  // not selection types
  notSelectionTypes: string[];
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setRequestFilter: StateHandler<IOwnState>;
  setSelection: StateHandler<IOwnState>;
  setSelectionClear: StateHandler<IOwnState>;
  setSearchDefault: StateHandler<IOwnState>;
  setSearchResult: StateHandler<IOwnState>;
  setPageNext: StateHandler<IOwnState>;
  setPagePrevious: StateHandler<IOwnState>;
  setPageOne: StateHandler<IOwnState>;
  setField: StateHandler<IOwnState>;
  setOrder: StateHandler<IOwnState>;
  setSize: StateHandler<IOwnState>;
  setNotSelectionTypes: StateHandler<IOwnState>;
  setPageAndSize: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnChangeSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSearch: (find: string | undefined, field: ICollectionValue | undefined) => void;
}

export type CollectionPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar
  & WithPage;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  // pagination props
  find: props.state.request && props.state.request.filter.find,
  findBy: props.state.request && props.state.request.filter.findBy,
  orderBy: props.state.request && props.state.request.filter.orderBy,
  direction: props.state.request && props.state.request.filter.direction,
  page: props.state.request && props.state.request.filter.page,
  size: props.state.request && props.state.request.filter.size,
  
  // other props
  selected: [],
  inTransition: true,
  notSelectionTypes: []
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setRequestFilter: (prev: IOwnState) => (filter: IBasePagingFilter): Partial<IOwnState> => ({
    ...filter
  }),
  setForceReload: (state: IOwnState) => (toFirst?: boolean): Partial<IOwnState> => ({
    page: toFirst ? 1 : state.page
  }),
  setSelection: (state: IOwnState) => (uid: string): Partial<IOwnState> => {
    const index = state.selected.indexOf(uid);
    const result: string[] = state.selected;

    if (index !== -1) {
      result.splice(index, 1);
    } else {
      result.push(uid);
    }

    return {
      selected: result
    };
  },
  setSelectionClear: (state: IOwnState) => (): Partial<IOwnState> => ({
    selected: []
  }),
  setSearchDefault: (state: IOwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find: undefined,
    findBy: undefined,
    page: 1
  }),
  setSearchResult: (state: IOwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find,
    findBy: field ? field.value : undefined,
    page: 1
  }),
  setPageNext: (state: IOwnState) => () => ({
    page: (state.page || 1) + 1
  }),
  setPagePrevious: (state: IOwnState) => () => ({
    page: (state.page || 1) > 1 ? (state.page || 1) - 1 : 1
  }),
  setPageOne: (state: IOwnState) => () => ({
    page: 1
  }),
  setField: (state: IOwnState) => (field: string) => ({
    orderBy: field,
    page: 1
  }),
  setOrder: (state: IOwnState) => (direction: DirectionType) => ({
    direction,
    page: 1
  }),
  setSize: (state: IOwnState) => (size: number) => ({
    size,
    page: 1
  }),
  setPageAndSize: (state: IOwnState) => (page: number, size: number) => ({
    size,
    page
  }),
  setNotSelectionTypes: (state: IOwnState) => (types: string[]) => ({
    notSelectionTypes: types
  }),
};

const handlerCreators: HandleCreators<CollectionPageProps, IOwnHandler> = {
  handleOnChangeSelection: (props: CollectionPageProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelection(event.currentTarget.value);

    props.appBarDispatch.selectionAddRemove(event.currentTarget.value);
  },
  handleOnSearch: (props: CollectionPageProps) => (find?: string, field?: ICollectionValue) => {
    // when find is undefided, that means user has close or exit from search mode
    if (find) {
      // set search state props for searching
      props.setSearchResult(find.trim(), field);
    } else {
      // set search state props to default
      props.setSearchDefault();
    }
  }
};

const lifecycles: ReactLifeCycleFunctions<CollectionPageProps, IOwnState> = {
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
        isNavBackVisible: this.props.hasNavBack || false,
        isSearchVisible: this.props.hasSearching,
        isMoreVisible: false,
        isModeList: true,
        isModeSearch: this.props.isModeSearch
      }
    });
    
    // assign search callback
    if (this.props.hasSearching) {
      this.props.appBarDispatch.assignSearchCallback(this.props.handleOnSearch);
    }

    // assign selection callback
    if (this.props.hasSelection) {
      this.props.appBarDispatch.assignSelectionClearCallback(this.props.setSelectionClear);

      this.props.setNotSelectionTypes(this.props.notSelectionTypes);

      // call config processing callback
      this.props.appBarDispatch.assignSelectionProcessCallback(() => {
        return this.props.onProcessSelection ? this.props.onProcessSelection(this.props.selected) : undefined;
      });
    }
    
    // assign fields
    if (this.props.fields) {
      this.props.appBarDispatch.assignFields(this.props.fields);
    }

    // assign custom toolbar controls
    if (this.props.toolbarControls) {
      this.props.appBarDispatch.assignControls(this.props.toolbarControls);
    }

    // assign more menu items
    if (this.props.options) {
      this.props.layoutDispatch.moreShow();
      this.props.appBarDispatch.assignMenus(this.props.options);
    }

    // loading data event from config
    this.props.onLoadApi({
      
    });
  },
  componentDidUpdate(prevProps: CollectionPageProps) {
    // handling updated request state
    if (this.props.state.request !== prevProps.state.request) {
      this.props.setRequestFilter(this.props.state.request.filter);
    } 

    // handling updated page options state
    if (this.props.options && this.props.options !== prevProps.options) {
      this.props.layoutDispatch.moreShow();
      this.props.appBarDispatch.assignMenus(this.props.options);
    }
    
    // handling updated pagination state
    const isChanged = !shallowEqual(
      {
        find: this.props.find,
        findBy: this.props.findBy,
        page: this.props.page,
        size: this.props.size,
        orderBy: this.props.orderBy,
        direction: this.props.direction
      }, 
      {
        find: prevProps.find,
        findBy: prevProps.findBy,
        page: prevProps.page,
        size: prevProps.size,
        orderBy: prevProps.orderBy,
        direction: prevProps.direction
      }
    );

    if (isChanged) {
      this.props.onLoadApi({
        find: this.props.find,
        findBy: this.props.findBy,
        page: this.props.page,
        size: this.props.size,
        orderBy: this.props.orderBy,
        direction: this.props.direction
      });
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

export const CollectionPage = compose<CollectionPageProps, IOwnOption>(
  withWidth(),
  withLayout,
  withAppBar,
  withPage,
  setDisplayName('CollectionPage'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withStyles(styles)
)(CollectionPageView);