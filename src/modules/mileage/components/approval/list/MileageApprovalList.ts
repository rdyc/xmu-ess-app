import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { MileageApprovalField } from '@mileage/classes/types';
import { MileageApprovalListView } from '@mileage/components/approval/list/MileageApprovalListView';
import { WithMileageApproval, withMileageApproval } from '@mileage/hoc/withMileageApproval';
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

// interface OwnOptions {
//   'query.orderBy'?: string | undefined;
//   'query.direction'?: string | undefined;
//   'query.page'?: number | undefined;
//   'query.size'?: number | undefined;
// }

// interface OwnState {
//   'query.orderBy': string | undefined;
//   'query.direction': string | undefined;
//   'query.page': number;
//   'query.size': number;
// }

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

export type MileageApprovalListProps 
  = WithMileageApproval
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<MileageApprovalListProps, OwnState> = (props: MileageApprovalListProps): OwnState => {
  // const { 'query.direction': direction, 'query.orderBy': orderBy, 'query.page': page, 'query.size': size } = props;
  const { orderBy, direction, page, size } = props;
  const { request } = props.mileageApprovalState.all;

  return { 
    orderBy: request && request.filter && request.filter['query.orderBy'] || orderBy,
    direction: request && request.filter && request.filter['query.direction'] || direction,
    page: request && request.filter && request.filter['query.page'] || page || 1, 
    size: request && request.filter && request.filter['query.size'] || size || 10,
  };
  // return { 
  //   'query.orderBy': request && request.filter && request.filter['query.orderBy'] || orderBy,
  //   'query.direction': request && request.filter && request.filter['query.direction'] || direction,
  //   'query.page': request && request.filter && request.filter['query.page'] || page || 1, 
  //   'query.size': request && request.filter && request.filter['query.size'] || size || 10,
  // };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  // stateNext: (prevState: OwnState) => () => ({
  //   'query.page': prevState['query.page'] + 1,
  // }),
  // statePrevious: (prevState: OwnState) => () => ({
  //   'query.page': prevState['query.page'] - 1,
  // }),
  // stateReloading: (prevState: OwnState) => () => ({
  //   'query.page': 1,
  // }),
  // stateOrdering: (prevState: OwnState) => (field: IListBarField) => ({
  //   orderBy: field.id,
  //   'query.page': 1,
  // }),
  // stateSorting: (prevState: OwnState) => (direction: SortDirection) => ({
  //   direction,
  //   'query.page': 1,
  // }),
  // stateSizing: (prevState: OwnState) => (size: number) => ({
  //   size,
  //   'query.page': 1,
  // }),
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

const handlerCreators: HandleCreators<MileageApprovalListProps, OwnHandlers> = {
  handleGoToDetail: (props: MileageApprovalListProps) => (mileageUid) => {
    const { history } = props;
    const { isLoading } = props.mileageApprovalState.all;

    if (!isLoading) {
      history.push(`/approval/mileage/details/${mileageUid}`);
    } 
  },
  handleGoToNext: (props: MileageApprovalListProps) => () => { 
    props.stateNext();
  },
  handleGoToPrevious: (props: MileageApprovalListProps) => () => { 
    props.statePrevious();
  },
  handleReloading: (props: MileageApprovalListProps) => () => { 
    props.stateReloading();

    // force re-load from api
    loadData(props);
  },
  handleChangeOrder: (props: MileageApprovalListProps) => (field: IListBarField) => { 
    props.stateOrdering(field);
  },
  handleChangeSize: (props: MileageApprovalListProps) => (value: number) => { 
    props.stateSizing(value);
  },
  handleChangeSort: (props: MileageApprovalListProps) => (direction: SortDirection) => { 
    props.stateSorting(direction);
  }
};

const lifecycles: ReactLifeCycleFunctions<MileageApprovalListProps, OwnState> = {
  componentDidMount() { 
    const { 
      handleGoToNext, handleGoToPrevious, handleReloading, 
      handleChangeOrder, handleChangeSize, handleChangeSort, 
      layoutDispatch, navBottomDispatch, 
      history, intl 
    } = this.props;
    
    const { isLoading, response } = this.props.mileageApprovalState.all;

    layoutDispatch.changeView({
      uid: AppMenu.MileageApproval,
      parentUid: AppMenu.Mileage,
      title: intl.formatMessage({id: 'mileage.approval.title'}),
      subTitle : intl.formatMessage({id: 'mileage.approval.subTitle'})
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
      onAddCallback: () => history.push('/mileage/approval/form'),
      onSizeCallback: handleChangeSize,
    });

    const items = Object.keys(MileageApprovalField)
      .map(key => ({ id: key, name: MileageApprovalField[key] }));

    navBottomDispatch.assignFields(items);

    // only load data when response are empty
    if (!isLoading && !response) {
      loadData(this.props);
    }
  },
  componentDidUpdate(props: MileageApprovalListProps, state: OwnState) {
    // only load when these props are different
    if (
      // this.props['query.orderBy'] !== props['query.orderBy'] ||
      // this.props['query.direction'] !== props['query.direction'] ||
      // this.props['query.page'] !== props['query.page']||
      // this.props['query.size'] !== props['query.size']
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
    const { loadAllDispose } = this.props.mileageApprovalDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    navBottomDispatch.dispose();

    // dispose 'get all' from 'redux store' when the page is 'out of mileage request' context 
    if (view && view.parentUid !== AppMenu.MileageApproval) {
      loadAllDispose();
    }
  }
};

const loadData = (props: MileageApprovalListProps): void => {
  // const { 'query.orderBy': orderBy, 'query.direction': direction, 'query.page': page, 'query.size': size } = props;
  const { orderBy, direction, page, size } = props;
  const { user } = props.userState;
  const { loadAllRequest } = props.mileageApprovalDispatch;
  const { alertAdd } = props.layoutDispatch;

  if (user) {
    loadAllRequest({
      companyUid: user.company.uid,
      positionUid: user.position.uid,
      filter: {
        'query.direction': direction,
        'query.orderBy': orderBy,
        'query.page': page ,
        'query.size': size ,
        status: undefined,
        isNotify: undefined,
        companyUid: user.company.uid,
        positionUid: user.position.uid,
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

export const MileageApprovalList = compose<MileageApprovalListProps, OwnOptions>(
  withMileageApproval,
  withUser,
  withLayout,
  withNavBottom,
  withRouter,
  injectIntl,
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
  withHandlers<MileageApprovalListProps, OwnHandlers>(handlerCreators),
  lifecycle<MileageApprovalListProps, OwnState>(lifecycles),
)(MileageApprovalListView);