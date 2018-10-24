import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { MileageExceptionField } from '@lookup/classes/types';
import { LookupMileageExceptionListView } from '@lookup/components/mileageException/list/LookupMileageExceptionListView';
import {
  WithLookupMileageException,
  withLookupMileageException
} from '@lookup/hoc/withLookupMileageException';
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
  withStateHandlers
} from 'recompose';

interface OwnHandlers {
  handleGoToDetail: (mileageExceptionUid: string) => void;
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

export type LookupMileageExceptionListProps = WithLookupMileageException &
  WithUser &
  WithLayout &
  WithNavBottom &
  RouteComponentProps &
  InjectedIntlProps &
  OwnOptions &
  OwnHandlers &
  OwnState &
  OwnStateUpdaters;

const createProps: mapper<LookupMileageExceptionListProps, OwnState> = (
  props: LookupMileageExceptionListProps
): OwnState => {
  const { orderBy, direction, page, size } = props;
  const { request } = props.lookupMileageExceptionState.all;

  return {
    orderBy: (request && request.filter && request.filter.orderBy) || orderBy,
    direction:
      (request && request.filter && request.filter.direction) || direction,
    page: (request && request.filter && request.filter.page) || page || 1,
    size: (request && request.filter && request.filter.size) || size || 10
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

const handlerCreators: HandleCreators<LookupMileageExceptionListProps, OwnHandlers> = {
  handleGoToDetail: (props: LookupMileageExceptionListProps) => (mileageExceptionUid) => {
    const { history } = props;
    const { isLoading } = props.lookupMileageExceptionState.all;

    if (!isLoading) {
      history.push(`/lookup/mileageexception/details/${mileageExceptionUid}`);
    } 
  },
  handleGoToNext: (props: LookupMileageExceptionListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: LookupMileageExceptionListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: LookupMileageExceptionListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: LookupMileageExceptionListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: LookupMileageExceptionListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: LookupMileageExceptionListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<LookupMileageExceptionListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.lookupMileageExceptionState.all;

    layoutDispatch.changeView({
      uid: AppMenu.Lookup,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage({id: 'lookup.mileageException.title'}),
      subTitle : intl.formatMessage({id: 'lookup.mileageException.subTitle'})
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
      onAddCallback: () => history.push('/lookup/mileageexception/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(MileageExceptionField)
      .map(key => ({ id: key, name: MileageExceptionField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: LookupMileageExceptionListProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.lookupMileageExceptionDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of lookup mileage exception' context 
    if (view && view.parentUid !== AppMenu.Lookup) {
      loadAllDispose();
    }
  }
};

const loadData = (props: LookupMileageExceptionListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.lookupMileageExceptionDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        direction,
        orderBy,
        page,
        size,
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

export const LookupMileageExceptionList = compose<LookupMileageExceptionListProps, OwnOptions>(
  withLookupMileageException,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<LookupMileageExceptionListProps, OwnHandlers>(handlerCreators),
  lifecycle<LookupMileageExceptionListProps, OwnState>(lifecycles),
)(LookupMileageExceptionListView);