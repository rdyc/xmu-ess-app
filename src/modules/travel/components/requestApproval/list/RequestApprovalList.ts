import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { TravelRequestField } from '@travel/classes/types';
import { RequestApprovalListView } from '@travel/components/requestApproval/list/RequestApprovalListView';
import { WithTravelApproval, withTravelApproval } from '@travel/hoc/withTravelApproval';
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

export interface OwnHandlers {
  handleGoToDetail: (travelUid: string) => void;
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

export type RequestApprovalListProps 
  = WithTravelApproval
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<RequestApprovalListProps, OwnState> = (props: RequestApprovalListProps): OwnState => {
    const { orderBy, direction, page, size } = props;
    const { request } = props.travelApprovalState.all;

    return { 
      orderBy: request && request.filter && request.filter['query.orderBy'] || orderBy,
      direction: request && request.filter && request.filter['query.direction'] || direction,
      page: request && request.filter && request.filter['query.page'] || page || 1, 
      size: request && request.filter && request.filter['query.size'] || size || 10,
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

const handlerCreators: HandleCreators<RequestApprovalListProps, OwnHandlers> = {
  handleGoToDetail: (props: RequestApprovalListProps) => (travelUid) => {
    const { history } = props;
    const { isLoading } = props.travelApprovalState.all;

    if (!isLoading) {
      history.push(`/approval/travel/details/${travelUid}`);
    } 
  },
  handleGoToNext: (props: RequestApprovalListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: RequestApprovalListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: RequestApprovalListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: RequestApprovalListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: RequestApprovalListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: RequestApprovalListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<RequestApprovalListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.travelApprovalState.all;

    layoutDispatch.changeView({
      uid: AppMenu.TravelApproval,
      parentUid: AppMenu.Travel,
      title: intl.formatMessage({id: 'travelApproval.title'}),
      subTitle : intl.formatMessage({id: 'travelApproval.subTitle'})
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
      onAddCallback: () => history.push('approval/travel/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(TravelRequestField)
      .map(key => ({ id: key, name: TravelRequestField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: RequestApprovalListProps, state: OwnState) {
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
    const { loadAllDispose } = this.props.travelApprovalDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of travel request' context 
    if (view && view.parentUid !== AppMenu.Travel) {
      loadAllDispose();
    }
  }
};

const loadData = (props: RequestApprovalListProps): void => {
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.travelApprovalDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      filter: {
        'query.direction': direction,
        'query.orderBy': orderBy,
        'query.page': page,
        'query.size': size,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        status: undefined,
        isNotify: undefined,
        'query.find': undefined,
        'query.findBy': undefined,
      }
    }); 
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const RequestApprovalList = compose<RequestApprovalListProps, OwnOptions>(
  withTravelApproval,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<RequestApprovalListProps, OwnHandlers>(handlerCreators),
  lifecycle<RequestApprovalListProps, OwnState>(lifecycles),
)(RequestApprovalListView);