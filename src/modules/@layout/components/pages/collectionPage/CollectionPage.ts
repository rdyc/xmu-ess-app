import AppMenu from '@constants/AppMenu';
import { IBaseFilter, IBasePagingFilter, IResponseCollection } from '@generic/interfaces';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu, IListBarField } from '@layout/interfaces';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

export interface CollectionConfig<Tres, Tconn> {
  uid: AppMenu | string;
  parentUid: AppMenu | string | undefined;
  title: string;
  description: string;
  fields?: IListBarField[] | undefined;
  fieldTranslator?: (find: string, field: IListBarField) => string;
  hasMore?: boolean | false;
  moreOptions?: (props: CollectionPageProps) => IAppBarMenu[];
  hasSearching?: boolean | false;
  searchStatus?: (states: Tconn) => boolean;
  hasSelection?: boolean | false;
  hasRedirection?: boolean | false;
  filter?: IBasePagingFilter | IBaseFilter;
  onDataLoad: (states: Tconn, callback: CollectionHandler, params: CollectionDataProps, forceReload?: boolean | false) => void;
  onUpdated: (states: Tconn, callback: CollectionHandler) => void;
  onBind: (item: Tres, index: number) => {
    key: any;
    primary: string;
    secondary: string;
  };
  onRedirect: (item: Tres) => string;
}

interface OwnOption {
  config: CollectionConfig<any, any>;
  connectedProps: any;
}

interface OwnState {
  forceReload: boolean;
  isLoading: boolean;
  response?: IResponseCollection<any> | undefined;
  selected: string[];
  find?: string;
  findBy?: string;
  orderBy?: string;
  direction?: 'ascending' | 'descending' | string | undefined;
  page?: number | 1;
  size?: number | 10;
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setForceReload: StateHandler<OwnState>;
  setLoading: StateHandler<OwnState>;
  setSource: StateHandler<OwnState>;
  setSelection: StateHandler<OwnState>;
  setSearchDefault: StateHandler<OwnState>;
  setSearchResult: StateHandler<OwnState>;
}

interface OwnHandler {
  handleResponse: (response: IResponseCollection<any> | undefined) => void;
  handleOnChangeSelection: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleOnSearch: (find: string | undefined, field: IListBarField | undefined) => void;
}

export type CollectionHandler = Pick<CollectionPageProps, 'setLoading' | 'handleResponse'>;
export type CollectionDataProps = Pick<CollectionPageProps, 'find' | 'findBy' | 'orderBy' | 'direction' | 'page' | 'size' >;

export type CollectionPageProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithLayout
  & WithAppBar
  & InjectedIntlProps;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  forceReload: false,
  isLoading: false,
  selected: [],
  ...props.config.filter
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setForceReload: (prev: OwnState) => (): Partial<OwnState> => ({
    forceReload: true
  }),
  setLoading: (prev: OwnState) => (isLoading: boolean): Partial<OwnState> => ({
    isLoading
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
  setSearchDefault: (prevState: OwnState) => (find: string, field: IListBarField | undefined) => ({
    find: undefined,
    findBy: undefined,
    page: 1,
    forceReload: true
  }),
  setSearchResult: (prevState: OwnState) => (find: string, field: IListBarField | undefined) => ({
    find,
    findBy: field ? field.id : undefined,
    forceReload: true
  }),
};

const handlerCreators: HandleCreators<CollectionPageProps, OwnHandler> = {
  handleResponse: (props: CollectionPageProps) => (response: IResponseCollection<any> | undefined) => {
    props.setSource(response);
  },
  handleOnChangeSelection: (props: CollectionPageProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelection(event.currentTarget.value);
  },
  handleOnSearch: (props: CollectionPageProps) => (find: string | undefined, field: IListBarField | undefined) => {
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
};

const lifecycles: ReactLifeCycleFunctions<CollectionPageProps, OwnState> = {
  componentDidMount() {
    // track last searching status
    const isSearching: boolean = this.props.config.searchStatus ? this.props.config.searchStatus(this.props.connectedProps) : false;

    // configure view
    this.props.layoutDispatch.setupView({
      view: {
        uid: this.props.config.uid,
        parentUid: this.props.config.parentUid,
        title: this.props.config.title,
        subTitle: this.props.config.description,
      },
      status: {
        isSearchVisible: this.props.config.hasSearching,
        isMoreVisible: this.props.config.hasMore,
        isModeSearch: this.props.config.hasSearching && isSearching
      }
    });

    // assign search
    if (this.props.config.hasSearching) {
      this.props.appBarDispatch.assignSearchCallback(this.props.handleOnSearch);
    }
    
    // assign fields
    if (this.props.config.fields) {
      this.props.appBarDispatch.assignFields(this.props.config.fields);
    }

    // assign more menu items
    if (this.props.config.hasMore && this.props.config.moreOptions) {
      const menuOptions = this.props.config.moreOptions(this.props);

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
  withLayout,
  withAppBar,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(CollectionPageView);