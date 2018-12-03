import AppMenu from '@constants/AppMenu';
import { IBaseFilter, IBasePagingFilter, IResponseCollection } from '@generic/interfaces';
import { ICollectionValue } from '@layout/classes/core';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
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

import { CollectionPageView } from './CollectionPageView';

export interface CollectionConfig<Tresponse, Tinner> {
  page: (props: Tinner) => {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    title: string;
    description: string;
  };
  fields: ICollectionValue[];
  fieldTranslator?: (find: string, field: ICollectionValue) => string;
  hasMore?: boolean | false;
  moreOptions?: (props: Tinner, callback: CollectionHandler) => IAppBarMenu[];
  hasSearching?: boolean | false;
  searchStatus?: (props: Tinner) => boolean;
  hasSelection?: boolean | false;
  notSelectionTypes?: string[] | [];
  onProcessSelection?: (values: string[], callback: CollectionHandler) => void;
  showActionCentre?: boolean | false;
  filter?: IBasePagingFilter | IBaseFilter;
  onDataLoad: (props: Tinner, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => void;
  onUpdated: (props: Tinner, callback: CollectionHandler) => void;
  onBind: (item: Tresponse, index: number, props: Tinner) => {
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
  actionComponent?: (item: Tresponse, callback: CollectionHandler) => JSX.Element;
}

interface OwnOption {
  config: CollectionConfig<any, any>;
  connectedProps: any;
}

interface OwnState {
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

  // not selection types
  notSelectionTypes: string[];
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setForceReload: StateHandler<OwnState>;
  setLoading: StateHandler<OwnState>;
  setSource: StateHandler<OwnState>;
  setSelection: StateHandler<OwnState>;
  setSelectionClear: StateHandler<OwnState>;
  setSearchDefault: StateHandler<OwnState>;
  setSearchResult: StateHandler<OwnState>;
  setPageNext: StateHandler<OwnState>;
  setPagePrevious: StateHandler<OwnState>;
  setPageOne: StateHandler<OwnState>;
  setField: StateHandler<OwnState>;
  setOrder: StateHandler<OwnState>;
  setSize: StateHandler<OwnState>;
  setPageAndSize: StateHandler<OwnState>;
  setNotSelectionTypes: StateHandler<OwnState>;
}

interface OwnHandler {
  handleLoading: (isLoading: boolean) => void;
  handleResponse: (response: IResponseCollection<any> | undefined) => void;
  handleForceReload: () => void;
  handleOnChangeSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSearch: (find: string | undefined, field: ICollectionValue | undefined) => void;
  handleRedirectTo: (path: string, state?: any) => void;
}

export type CollectionHandler = Pick<CollectionPageProps, 'handleLoading' | 'handleResponse' | 'handleForceReload' | 'handleRedirectTo'>;
export type CollectionDataProps = Pick<CollectionPageProps, 'find' | 'findBy' | 'orderBy' | 'direction' | 'page' | 'size'>;

export type CollectionPageProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithStyles<typeof styles>
  & WithWidth
  & WithLayout
  & WithAppBar
  & RouteComponentProps;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  forceReload: false,
  isLoading: false,
  selected: [],
  page: 1,
  size: 10,
  inTransition: true,
  notSelectionTypes: [],
  ...props.config.filter
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setForceReload: (prev: OwnState) => (toFirst?: boolean): Partial<OwnState> => ({
    page: toFirst ? 1 : prev.page,
    forceReload: true
  }),
  setLoading: (prev: OwnState) => (isLoading: boolean): Partial<OwnState> => ({
    isLoading,
    inTransition: !isLoading,
  }),
  setSource: (prev: OwnState) => (response: IResponseCollection<any> | undefined): Partial<OwnState> => ({
    response,
    forceReload: false
  }),
  setSelection: (prev: OwnState) => (uid: string): Partial<OwnState> => {
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
  setSelectionClear: (prev: OwnState) => (): Partial<OwnState> => ({
    selected: []
  }),
  setSearchDefault: (prevState: OwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find: undefined,
    findBy: undefined,
    page: 1,
    forceReload: true
  }),
  setSearchResult: (prevState: OwnState) => (find: string, field: ICollectionValue | undefined) => ({
    find,
    findBy: field ? field.value : undefined,
    page: 1,
    forceReload: true
  }),
  setPageNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
    forceReload: true
  }),
  setPagePrevious: (prevState: OwnState) => () => ({
    page: prevState.page > 1 ? prevState.page - 1 : 1,
    forceReload: true
  }),
  setPageOne: (prevState: OwnState) => () => ({
    page: 1,
    forceReload: true
  }),
  setField: (prevState: OwnState) => (field: string) => ({
    orderBy: field,
    page: 1,
    forceReload: true
  }),
  setOrder: (prevState: OwnState) => (direction: string) => ({
    direction,
    page: 1,
    forceReload: true
  }),
  setSize: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1,
    forceReload: true
  }),
  setPageAndSize: (prevState: OwnState) => (page: number, size: number) => ({
    size,
    page
  }),
  setNotSelectionTypes: (prevState: OwnState) => (types: string[]) => ({
    notSelectionTypes: types
  })
};

const handlerCreators: HandleCreators<CollectionPageProps, OwnHandler> = {
  handleLoading: (props: CollectionPageProps) => (isLoading: boolean) => {
    props.setLoading(isLoading);
  },
  handleResponse: (props: CollectionPageProps) => (response: IResponseCollection<any> | undefined) => {
    props.setSource(response);

    // reading metadata, when page and size was present then set into the state
    if (response && response.metadata && response.metadata.paginate) {
      props.setPageAndSize(response.metadata.paginate.current, response.metadata.size);
    }
  },
  handleForceReload: (props: CollectionPageProps) => () => {
    props.setForceReload(true);
  },
  handleOnChangeSelection: (props: CollectionPageProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    event.preventDefault();
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    props.setSelection(event.currentTarget.value);

    props.appBarDispatch.selectionAddRemove(event.currentTarget.value);
  },
  handleOnSearch: (props: CollectionPageProps) => (find: string | undefined, field: ICollectionValue | undefined) => {
    // when find is undefided, that means user has close or exit from search mode
    if (find) {
      let _find: string = find.trim();

      // execute translator when field has value and fieldTranslator was set in config
      if (field && props.config.fieldTranslator) {
        _find = props.config.fieldTranslator(find, field);
      }

      // set search state props for searching
      props.setSearchResult(_find, field);
    } else {
      // set search state props to default
      props.setSearchDefault();
    }
  },
  handleRedirectTo: (props: CollectionPageProps) => (path: string, state?: any) => {
    props.history.push(path, state);
  }
};

const lifecycles: ReactLifeCycleFunctions<CollectionPageProps, OwnState> = {
  componentDidMount() {
    // track last searching status
    const isSearching: boolean = this.props.config.searchStatus ? this.props.config.searchStatus(this.props.connectedProps) : false;

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
        isNavBackVisible: false,
        isSearchVisible: this.props.config.hasSearching,
        isActionCentreVisible: this.props.config.showActionCentre,
        isMoreVisible: this.props.config.hasMore,
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

      this.props.setNotSelectionTypes(this.props.config.notSelectionTypes);

      // call config processing callback
      this.props.appBarDispatch.assignSelectionProcessCallback(() => {
        return this.props.config.onProcessSelection ? this.props.config.onProcessSelection(this.props.selected, this.props) : undefined;
      });
    }
    
    // assign fields
    if (this.props.config.fields) {
      this.props.appBarDispatch.assignFields(this.props.config.fields);
    }

    // assign more menu items
    if (this.props.config.hasMore && this.props.config.moreOptions) {
      const menuOptions = this.props.config.moreOptions(this.props.connectedProps, this.props);

      this.props.appBarDispatch.assignMenus(menuOptions);
    }

    // loading data event from config
    this.props.config.onDataLoad(this.props.connectedProps, this.props, this.props);
  },
  componentDidUpdate(prevProps: CollectionPageProps, prevState: OwnState) {
    // track force reload changes
    if (this.props.forceReload !== prevProps.forceReload) {
      if (this.props.forceReload) {
        this.props.config.onDataLoad(this.props.connectedProps, this.props, this.props, true);
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

export const CollectionPage = compose<CollectionPageProps, OwnOption>(
  setDisplayName('CollectionPage'),
  withRouter,
  withStyles(styles),
  withWidth(),
  withLayout,
  withAppBar,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(CollectionPageView);