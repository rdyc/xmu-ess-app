import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { MileageRequestField } from '@mileage/classes/types';
import { MileageRequestListView } from '@mileage/components/request/list/MileageRequestListView';
import { WithMileageRequest, withMileageRequest } from '@mileage/hoc/withMileageRequest';
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

interface OwnHandlers {
  handleGoToDetail: (mileageUid: string) => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeOrder: (field: IListBarField) => void;
  handleChangeSort: (direction: SortDirection) => void;
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
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type MileageRequestListProps 
  = WithMileageRequest
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<MileageRequestListProps, OwnState> = (props: MileageRequestListProps): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.mileageRequestState.all;

  return { 
    orderBy: request && request.filter && request.filter.orderBy || orderBy,
    direction: request && request.filter && request.filter.direction || direction,
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
  stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
    orderBy: field.id,
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

const handlerCreators: HandleCreators<MileageRequestListProps, OwnHandlers> = {
  handleGoToDetail: (props: MileageRequestListProps) => (mileageUid) => {
    const { history } = props;
    const { isLoading } = props.mileageRequestState.all;

    if (!isLoading) {
      history.push(`/mileage/request/details/${mileageUid}`);
    } 
  },
  handleGoToNext: (props: MileageRequestListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: MileageRequestListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: MileageRequestListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: MileageRequestListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: MileageRequestListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: MileageRequestListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageRequestListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.mileageRequestState.all;

    layoutDispatch.changeView({
      uid: AppMenu.MileageRequest,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({id: 'mileage.request.title'}),
      subTitle : intl.formatMessage({id: 'mileage.request.subTitle'})
    });

    layoutDispatch.modeListOn();
    layoutDispatch.searchShow();
    layoutDispatch.actionCentreShow();

    navBottomDispatch.assignCallbacks({
      onNextCallback: handleGoToNext,
      onPrevCallback: handleGoToPrevious,
      onSyncCallback: handleReloading,
      onOrderCallback: handleChangeOrder,
      onDirectionCallback: handleChangeSort,
      onAddCallback: () => history.push('/mileage/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(MileageRequestField)
      .map(key => ({ id: key, name: MileageRequestField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: MileageRequestListProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.mileageRequestDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of mileage request' context 
    if (view && view.parentUid !== AppMenu.Mileage) {
      loadAllDispose();
    }
  }
};

const loadData = (props: MileageRequestListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.mileageRequestDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        direction,
        orderBy,
        page,
        size,
        isRejected : undefined,
        month: undefined,
        year: undefined,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        find: undefined,
        findBy: undefined,
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const MileageRequestList = compose<MileageRequestListProps, OwnOptions>(
  withMileageRequest,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<MileageRequestListProps, OwnHandlers>(handlerCreators),
  lifecycle<MileageRequestListProps, OwnState>(lifecycles),
)(MileageRequestListView);