import AppMenu from '@constants/AppMenu';
import { IBaseFilter, IBasePagingFilter, IQueryCollectionState, IResponseCollection } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IDataControl } from '../dataContainer/DataContainer';
import { ListPageView } from './ListPageView';

export interface IListConfig<Tresponse> {
  page: {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    title: string;
    description: string;
  };
  parentUrl?: string;
  fields: ICollectionValue[];
  toolbarControls?: (callback: ListHandler) => IAppBarControl[];
  moreOptions?: (callback: ListHandler) => IAppBarMenu[];
  hasSearching?: boolean | false;
  searchStatus?: () => boolean | false;
  hasSelection?: boolean | false;
  notSelectionTypes?: string[] | [];
  hasNavBack?: boolean | false;
  onProcessSelection?: (values: string[], callback: ListHandler) => void;
  showActionCentre?: boolean | false;
  filter?: IBasePagingFilter | IBaseFilter;
  onDataLoad: (callback: ListHandler, params: ListDataProps, forceReload?: boolean | false) => void;
  onBind: (item: Tresponse, index: number) => {
    key: any;
    primary: string;
    secondary: string;
    tertiary: string;
    quaternary: string;
    quinary: string;
    senary: string;
  };
  onRowRender?: (item: Tresponse, index: number) => JSX.Element;
  summaryComponent: (item: Tresponse) => JSX.Element;
  actionComponent?: (item: Tresponse, callback: ListHandler) => JSX.Element;
  additionalControls?: IDataControl[];
}

interface IOwnOption {
  config: IListConfig<any>;
  source: IQueryCollectionState<any, any>;
  loadDataWhen: any;
}

interface IOwnState {
  // statuses
  forceReload: boolean;
  isLoading: boolean;
  
  // data response
  response?: IResponseCollection<any> | undefined;
  
  // selection
  selected: string[];

  // filter
  find?: string;
  findBy?: string;
  
  // order
  orderBy?: string;
  direction?: 'ascending' | 'descending' | string | undefined;
  
  // paging
  page: number;
  size: number;

  // transition
  inTransition: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setForceReload: StateHandler<IOwnState>;
  setLoading: StateHandler<IOwnState>;
  setSource: StateHandler<IOwnState>;
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
  setPageAndSize: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleLoading: (isLoading: boolean) => void;
  handleResponse: (response: IResponseCollection<any> | undefined) => void;
  handleForceReload: () => void;
  handleOnChangeSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSearch: (find: string | undefined, field: ICollectionValue | undefined) => void;
}

export type ListHandler = Pick<ListPageProps, 'handleLoading' | 'handleResponse' | 'handleForceReload'>;
export type ListDataProps = Pick<ListPageProps, 'find' | 'findBy' | 'orderBy' | 'direction' | 'page' | 'size'>;

export type ListPageProps
  = IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  forceReload: false,
  isLoading: false,
  selected: [],
  page: 1,
  size: 10,
  inTransition: true,
  ...props.config.filter
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setForceReload: (prev: IOwnState) => (toFirst?: boolean): Partial<IOwnState> => ({
    page: toFirst ? 1 : prev.page,
    forceReload: true
  }),
  setLoading: (prev: IOwnState) => (isLoading: boolean): Partial<IOwnState> => ({
    isLoading,
    inTransition: !isLoading,
  }),
  setSource: (prev: IOwnState) => (response: IResponseCollection<any> | undefined): Partial<IOwnState> => ({
    response,
    forceReload: false
  }),
  setSelection: (prev: IOwnState) => (uid: string): Partial<IOwnState> => {
    const index = prev.selected.indexOf(uid);
    const result: string[] = prev.selected;

    if (index !== -1) {
      result.splice(index, 1);
    } else {
      result.push(uid);
    }

    return {
      selected: result
    };
  },
  setSelectionClear: (prev: IOwnState) => (): Partial<IOwnState> => ({
    selected: []
  }),
  setSearchDefault: (prevState: IOwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find: undefined,
    findBy: undefined,
    page: 1,
    forceReload: true
  }),
  setSearchResult: (prevState: IOwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find,
    findBy: field ? field.value : undefined,
    page: 1,
    forceReload: true
  }),
  setPageNext: (prevState: IOwnState) => () => ({
    page: prevState.page + 1,
    forceReload: true
  }),
  setPagePrevious: (prevState: IOwnState) => () => ({
    page: prevState.page > 1 ? prevState.page - 1 : 1,
    forceReload: true
  }),
  setPageOne: (prevState: IOwnState) => () => ({
    page: 1,
    forceReload: true
  }),
  setField: (prevState: IOwnState) => (field: string) => ({
    orderBy: field,
    page: 1,
    forceReload: true
  }),
  setOrder: (prevState: IOwnState) => (direction: string) => ({
    direction,
    page: 1,
    forceReload: true
  }),
  setSize: (prevState: IOwnState) => (size: number) => ({
    size,
    page: 1,
    forceReload: true
  }),
  setPageAndSize: (prevState: IOwnState) => (page: number, size: number) => ({
    size,
    page
  })
};

const handlerCreators: HandleCreators<ListPageProps, IOwnHandler> = {
  handleLoading: (props: ListPageProps) => (isLoading: boolean) => {
    props.setLoading(isLoading);
  },
  handleResponse: (props: ListPageProps) => (response: IResponseCollection<any> | undefined) => {
    props.setSource(response);

    // reading metadata, when page and size was present then set into the state
    if (response && response.metadata && response.metadata.paginate) {
      props.setPageAndSize(response.metadata.paginate.current, response.metadata.size);
    }
  },
  handleForceReload: (props: ListPageProps) => () => {
    props.setForceReload(true);
  },
  handleOnChangeSelection: (props: ListPageProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    props.setSelection(event.currentTarget.value);

    props.appBarDispatch.selectionAddRemove(event.currentTarget.value);
  },
  handleOnSearch: (props: ListPageProps) => (find: string | undefined, field: ICollectionValue | undefined) => {
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

const lifecycles: ReactLifeCycleFunctions<ListPageProps, IOwnState> = {
  componentDidMount() {
    // track last searching status
    const isSearching: boolean = this.props.config.searchStatus ? this.props.config.searchStatus() : false;

    // configure view
    const page = this.props.config.page;
    this.props.layoutDispatch.setupView({
      view: {
        uid: page.uid,
        parentUid: page.parentUid,
        title: page.title,
        subTitle: page.description,
      },
      parentUrl: this.props.config.parentUrl,
      status: {
        isNavBackVisible: this.props.config.hasNavBack || false,
        isSearchVisible: this.props.config.hasSearching,
        isActionCentreVisible: this.props.config.showActionCentre,
        isMoreVisible: this.props.config.moreOptions !== undefined,
        isModeList: true,
        isModeSearch: this.props.config.hasSearching && isSearching,
      }
    });

    // assign search callback
    if (this.props.config.hasSearching) {
      this.props.appBarDispatch.assignSearchCallback(this.props.handleOnSearch);
    }

    // assign selection callback
    if (this.props.config.hasSelection) {
      this.props.appBarDispatch.assignSelectionClearCallback(this.props.setSelectionClear);

      // call config processing callback
      this.props.appBarDispatch.assignSelectionProcessCallback(() => {
        return this.props.config.onProcessSelection ? this.props.config.onProcessSelection(this.props.selected, this.props) : undefined;
      });
    }
    
    // assign fields
    if (this.props.config.fields) {
      this.props.appBarDispatch.assignFields(this.props.config.fields);
    }

    // assign custom toolbar controls
    if (this.props.config.toolbarControls) {
      const controls = this.props.config.toolbarControls(this.props);

      this.props.appBarDispatch.assignControls(controls);
    }

    // assign more menu items
    if (this.props.config.moreOptions) {
      const options = this.props.config.moreOptions(this.props);

      this.props.appBarDispatch.assignMenus(options);
    }

    // loading data event from config
    this.props.config.onDataLoad(this.props, this.props);
  },
  componentDidUpdate(prevProps: ListPageProps, prevState: IOwnState) {
    // track force reload changes
    if (this.props.forceReload !== prevProps.forceReload) {
      if (this.props.forceReload) {
        this.props.config.onDataLoad(this.props, this.props, true);
      }
    }
    
    // filter
    if (this.props.find !== prevProps.find || this.props.findBy !== prevProps.findBy) {
      this.props.config.onDataLoad(this.props, this.props, true);
    }

    // state
    if (this.props.loadDataWhen !== prevProps.loadDataWhen) {
      this.props.config.onDataLoad(this.props, this.props, true);
    }

    // track connected props changes
    if (this.props.source !== prevProps.source) {  
      // this.props.config.onUpdated(this.props);
      const { isLoading, response } = this.props.source;

      this.props.handleLoading(isLoading);
      this.props.handleResponse(response);
    }
  },
  componentWillUnmount() {
    // reset top bar back to default 
    this.props.appBarDispatch.dispose();
  }
};

export const ListPage = compose<ListPageProps, IOwnOption>(
  setDisplayName('ListPage'),
  withStyles(styles),
  withWidth(),
  withLayout,
  withAppBar,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(ListPageView);