import AppMenu from '@constants/AppMenu';
import { IBasePagingFilter, IQueryCollectionState } from '@generic/interfaces';
import { DirectionType } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithPage, withPage } from '@layout/hoc/withPage';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
  info: {
    uid: AppMenu | string;
    parentUid?: AppMenu | string;
    title: string;
    description: string;
    parentUrl?: string;
  };
  fields: ICollectionValue[];
  onLoadApi: (filter?: IBasePagingFilter, resetPage?: boolean, isRetry?: boolean) => void;
  onLoadedApi?: () => void;
  disableSelection?: (item: any) => boolean;
  onSelection?: (values: string[]) => void;
  onBind: (item: any, index: number) => IDataBindResult;
  onRowRender?: (item: any, index: number) => React.ReactNode;
  summaryComponent: (item: any) => React.ReactNode;
  actionComponent?: (item: any) => React.ReactNode;
  appBarSearchComponent?: React.ReactNode;
  appBarCustomComponent?: React.ReactNode;
  toolbarDataComponent?: React.ReactNode;
}

interface IOwnState {
  selected: string[];
  orderBy?: string;
  direction?: 'ascending' | 'descending';
  page?: number;
  size?: number;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setRequestFilter: StateHandler<IOwnState>;
  setSelection: StateHandler<IOwnState>;
  setPageNext: StateHandler<IOwnState>;
  setPagePrevious: StateHandler<IOwnState>;
  setPageOne: StateHandler<IOwnState>;
  setField: StateHandler<IOwnState>;
  setOrder: StateHandler<IOwnState>;
  setSize: StateHandler<IOwnState>;
  setPageAndSize: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoad: (resetPage?: boolean, isRetry?: boolean) => void;
  handleOnCheckedSelection: (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => void;
  handleOnChangeSelection: (event: React.MouseEvent<HTMLElement>) => void;
  handleOnClearSelection: (event: React.MouseEvent<HTMLElement>) => void;
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
  & WithPage
  & InjectedIntlProps;

const createProps: mapper<IOwnOption, IOwnState> = (props: IOwnOption): IOwnState => ({
  orderBy: props.state.request && props.state.request.filter.orderBy,
  direction: props.state.request && props.state.request.filter.direction,
  page: props.state.request && props.state.request.filter.page,
  size: props.state.request && props.state.request.filter.size,  
  selected: []
});

const stateUpdaters: StateUpdaters<IOwnOption, IOwnState, IOwnStateUpdater> = {
  setRequestFilter: (prev: IOwnState) => (filter: IBasePagingFilter): Partial<IOwnState> => ({
    ...filter
  }),
  setForceReload: (state: IOwnState) => (toFirst?: boolean): Partial<IOwnState> => ({
    page: toFirst ? 1 : state.page
  }),
  setSelection: (state: IOwnState) => (values: string[]): Partial<IOwnState> => ({
    selected: values
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
  })
};

const handlerCreators: HandleCreators<CollectionPageProps, IOwnHandler> = {
  handleOnLoad: (props: CollectionPageProps) => (resetPage?: boolean, isRetry?: boolean) => {
    const filter: IBasePagingFilter = {
      page: props.page,
      size: props.size,
      orderBy: props.orderBy,
      direction: props.direction
    };

    props.onLoadApi(filter, resetPage, isRetry);
  },
  handleOnCheckedSelection: (props: CollectionPageProps) => (event: React.ChangeEvent<HTMLInputElement>, checked: boolean) => {
    const value = event.currentTarget.value;
    const selected = props.selected;

    if (checked) {
      selected.push(value);
    } else {
      const index = props.selected.indexOf(value);

      if (index !== -1) {
        selected.splice(index, 1);
      }
    }

    props.setSelection(selected);
  },
  handleOnChangeSelection: (props: CollectionPageProps) => (event: React.MouseEvent<HTMLElement>) => {
    if (props.onSelection && props.selected.length > 0) {
      props.onSelection(props.selected);
      props.setSelection([]);
    }
  },
  handleOnClearSelection: (props: CollectionPageProps) => (event: React.MouseEvent<HTMLElement>) => {
    props.setSelection([]);
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
        isNavBackVisible: false,
        isMoreVisible: false,
        isModeList: true
      }
    });

    // assign search component
    if (this.props.appBarSearchComponent) {
      this.props.appBarDispatch.assignSearchComponent(this.props.appBarSearchComponent);
    }

    // assign custom component
    if (this.props.appBarCustomComponent) {
      this.props.appBarDispatch.assignCustomComponent(this.props.appBarCustomComponent);
    }

    // loading data
    this.props.handleOnLoad();
  },
  componentDidUpdate(prevProps: CollectionPageProps) {
    // handling updated request state
    if (this.props.state.request !== prevProps.state.request) {
      this.props.setRequestFilter(this.props.state.request.filter);
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
      this.props.handleOnLoad();
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
  withLayout,
  withAppBar,
  withPage,
  setDisplayName('CollectionPage'),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
  withWidth(),
  withStyles(styles),
  injectIntl
)(CollectionPageView);