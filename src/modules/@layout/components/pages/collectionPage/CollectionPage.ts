import AppMenu from '@constants/AppMenu';
import { IResponseCollection } from '@generic/interfaces';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithPage, withPage } from '@layout/hoc/withPage';
import { IListBarField } from '@layout/interfaces';
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
  allowSearch?: boolean | false;
  allowSelect?: boolean | false;
  hasRedirection?: boolean | false;
  onLoad: (states: Tconn, callback: CollectionCallback) => void;
  onUpdated: (states: Tconn, callback: CollectionCallback) => void;
  onBind: (item: Tres, index: number) => {
    key: any;
    primary: string;
    secondary: string;
  };
  onRedirect: (item: Tres) => string;
}

interface OwnOption {
  config: CollectionConfig<any, any>;
  innerProps: any;
}

interface OwnState {
  isLoading: boolean;
  response: IResponseCollection<any> | undefined;
  selected: string[];
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
  setLoading: StateHandler<OwnState>;
  setSource: StateHandler<OwnState>;
  setSelected: StateHandler<OwnState>;
}

interface OwnHandler {
  handleResponse: (response: IResponseCollection<any> | undefined) => void;
  handleOnChangeItem: (event: React.ChangeEvent<HTMLInputElement>) => void;
}

export type CollectionCallback = Pick<CollectionPageProps, 'setLoading' | 'handleResponse'>;

export type CollectionPageProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & OwnHandler
  & WithLayout
  & WithPage;

const createProps: mapper<OwnOption, OwnState> = (props: OwnOption): OwnState => ({
  isLoading: false,
  response: undefined,
  selected: []
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
  setLoading: (prev: OwnState) => (isLoading: boolean): Partial<OwnState> => ({
    isLoading
  }),
  setSource: (prev: OwnState) => (response: IResponseCollection<any> | undefined): Partial<OwnState> => ({
    response
  }),
  setSelected: (prev: OwnState) => (uid: string): Partial<OwnState> => {
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
  }
};

const handlerCreators: HandleCreators<CollectionPageProps, OwnHandler> = {
  handleResponse: (props: CollectionPageProps) => (response: IResponseCollection<any> | undefined) => {
    props.setSource(response);
  },
  handleOnChangeItem: (props: CollectionPageProps) => (event: React.ChangeEvent<HTMLInputElement>) => {
    props.setSelected(event.currentTarget.value);
  }
};

const lifecycles: ReactLifeCycleFunctions<CollectionPageProps, OwnState> = {
  componentWillMount() {
    // console.log('component will mount');
  },
  componentDidMount() {
    // configure view
    this.props.layoutDispatch.setupView({
      view: {
        uid: this.props.config.uid,
        parentUid: this.props.config.parentUid,
        title: this.props.config.title,
        subTitle: this.props.config.description,
      },
      status: {
        isSearchVisible: true,
        isModeList: true
      }
    });

    // store current page
    this.props.pageChange({
      uid: this.props.config.uid,
      isSearching: false
    });

    this.props.config.onLoad(this.props.innerProps, this.props);
  },
  componentWillReceiveProps(nextProps: CollectionPageProps) {
    // console.log('component will receive props');
  },
  componentWillUpdate(nextProps: CollectionPageProps, nextState: OwnState) {
    // console.log('component will update');
  },
  componentDidUpdate(prevProps: CollectionPageProps, prevState: OwnState) {
    if (this.props.innerProps !== prevProps.innerProps) {
      this.props.config.onUpdated(this.props.innerProps, this.props);
    }
  },
  componentWillUnmount() {
    // console.log('component will unmount');
  }
};

export const CollectionPage = compose<CollectionPageProps, OwnOption>(
  setDisplayName('CollectionPage'),
  withLayout,
  withPage,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(CollectionPageView);