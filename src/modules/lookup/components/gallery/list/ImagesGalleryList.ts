import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { ImageGalleryField } from '@lookup/classes/types/gallery/ImageGalleryField';
import { WithImageGallery, withImageGallery } from '@lookup/hoc/withImageGallery';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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
import { ImagesGalleryListView } from './ImagesGalleryListView';

interface OwnHandlers {
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
  // handleChangeSize: (value: number) => void;
  // handleChangeOrder: (field: IListBarField) => void;
  // handleChangeSort: (direction: SortDirection) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

interface OwnState {
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type ImageGalleryListProps 
  = WithImageGallery
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ImageGalleryListProps, OwnState> = (props: ImageGalleryListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.imageGalleryState.all;

  return { 
    orderBy: request && request.filter && request.filter.orderBy || orderBy || 'uid',
    direction: request && request.filter && request.filter.direction || direction || 'descending',
    page: request && request.filter && request.filter.page || page || 1, 
    size: request && request.filter && request.filter.size || size || 10,
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateNext: (prevState: OwnState) => () => ({
    page: prevState.page + 1,
  }),
  statePrevious: (prevState: OwnState) => () => ({
    page: prevState.page - 1,
  }),
  stateReloading: (prevState: OwnState) => () => ({
    page: 1,
  }),
  stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
    direction,
    page: 1,
  }),
  stateSizing: (prevState: OwnState) => (size: number) => ({
    size,
    page: 1,
  }),
};

const handlerCreators: HandleCreators<ImageGalleryListProps, OwnHandlers> = {
  handleGoToNext: (props: ImageGalleryListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: ImageGalleryListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: ImageGalleryListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  // handleChangeOrder: (props: ImageGalleryListProps) => (field: IListBarField) => { 
  //   props.stateOrdering(field);
  // },
  // handleChangeSize: (props: ImageGalleryListProps) => (value: number) => { 
  //   props.stateSizing(value);
  // },
  // handleChangeSort: (props: ImageGalleryListProps) => (direction: SortDirection) => { 
  //   props.stateSorting(direction);
  // }
};

const lifecycles: ReactLifeCycleFunctions<ImageGalleryListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history
    } = this.props;
    
    const { isLoading, response } = this.props.imageGalleryState.all;

    layoutDispatch.changeView({
      uid: AppMenu.ImageGallery,
      parentUid: AppMenu.Lookup,
      title: '',
      subTitle : ''
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleGoToNext,
      onPrevCallback: handleGoToPrevious,
      onSyncCallback: handleReloading,
      onOrderCallback: handleChangeOrder,
      onDirectionCallback: handleChangeSort,
      onAddCallback: () => history.push('/travel/requests/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(ImageGalleryField)
      .map(key => ({ value: key, name: ImageGalleryField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: ImageGalleryListProps, state: OwnState) {
    // only load when these props are different
    if (
      this.props.orderBy !== props.orderBy ||
      this.props.direction !== props.direction ||
      this.props.page !== props.page ||
      this.props.size !== props.size
    ) {
      loadData(this.props);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, navBottomDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadAllDispose } = this.props.imageGalleryDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of travel request' context 
    if (view && view.parentUid !== AppMenu.Travel) {
      loadAllDispose();
    }
  }
};

const loadData = (props: ImageGalleryListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.imageGalleryDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        direction,
        orderBy,
        page,
        size
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const ImagesGalleryList = compose<ImageGalleryListProps, OwnOptions>(
  withImageGallery,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<ImageGalleryListProps, OwnHandlers>(handlerCreators),
  lifecycle<ImageGalleryListProps, OwnState>(lifecycles),
)(ImagesGalleryListView);