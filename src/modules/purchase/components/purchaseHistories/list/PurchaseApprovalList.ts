import AppMenu from '@constants/AppMenu';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
import { PurchaseField } from '@purchase/classes/types';
import { PurchaseApprovalListView } from '@purchase/components/purchaseHistories/list/PurchaseApprovalListView';
import { WithPurchaseApproval, withPurchaseApproval } from '@purchase/hoc/purchaseHistories/withPurchaseApproval';
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
  handleGoToDetail: (purchaseUid: string) => void;
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

export type PurchaseApprovalListProps 
  = WithPurchaseApproval
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<PurchaseApprovalListProps, OwnState> = (props: PurchaseApprovalListProps): OwnState => {
    const { orderBy, direction, page, size } = props;
    const { request } = props.purchaseApprovalState.all;

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
      // page: prevState.page,
      page: 1
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
      page: prevState.page,
    }),
  };

const handlerCreators: HandleCreators<PurchaseApprovalListProps, OwnHandlers> = {
    handleGoToDetail: (props: PurchaseApprovalListProps) => (purchaseUid) => {
      const { history } = props;
      const { isLoading } = props.purchaseApprovalState.all;
  
      if (!isLoading) {
        history.push(`/purchase/approvals/details/${purchaseUid}`);
      } 
    },
    handleGoToNext: (props: PurchaseApprovalListProps) => () => { 
      props.stateNext();
    },
    handleGoToPrevious: (props: PurchaseApprovalListProps) => () => { 
      props.statePrevious();
    },
    handleReloading: (props: PurchaseApprovalListProps) => () => { 
      props.stateReloading();
  
      // force re-load from api
      loadData(props);
    },
    handleChangeOrder: (props: PurchaseApprovalListProps) => (field: IListBarField) => { 
      props.stateOrdering(field);
    },
    handleChangeSize: (props: PurchaseApprovalListProps) => (value: number) => { 
      props.stateSizing(value);
    },
    handleChangeSort: (props: PurchaseApprovalListProps) => (direction: SortDirection) => { 
      props.stateSorting(direction);
    }
  };

const lifecycles: ReactLifeCycleFunctions<PurchaseApprovalListProps, OwnState> = {
    componentDidMount() { 
      const { 
        handleGoToNext, handleGoToPrevious, handleReloading, 
        handleChangeOrder, handleChangeSize, handleChangeSort, 
        layoutDispatch, navBottomDispatch, 
        history, intl 
      } = this.props;
      
      const { isLoading, response } = this.props.purchaseApprovalState.all;
  
      layoutDispatch.changeView({
        uid: AppMenu.PurchaseApproval,
        parentUid: AppMenu.Purchase,
        title: intl.formatMessage({id: 'purchaseapproval.title'}),
        subTitle : intl.formatMessage({id: 'purchaseapproval.subTitle'})
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
        onAddCallback: () => history.push('/approval/purchase/request/form'),
        onSizeCallback: handleChangeSize,
      });
  
      const items = Object.keys(PurchaseField)
        .map(key => ({ id: key, name: PurchaseField[key] }));
  
      navBottomDispatch.assignFields(items);
  
      // only load data when response are empty
      if (!isLoading && !response) {
        loadData(this.props);
      }
    },
    componentDidUpdate(props: PurchaseApprovalListProps, state: OwnState) {
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
      const { loadAllDispose } = this.props.purchaseApprovalDispatch;
  
      layoutDispatch.changeView(null);
      layoutDispatch.modeListOff();
      layoutDispatch.searchHide();
      layoutDispatch.modeSearchOff();
      layoutDispatch.actionCentreHide();
      layoutDispatch.moreHide();
  
      navBottomDispatch.dispose();
  
      // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
      if (view && view.parentUid !== AppMenu.Purchase) {
        loadAllDispose();
      }
    }
  };

const loadData = (props: PurchaseApprovalListProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { loadAllRequest } = props.purchaseApprovalDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      loadAllRequest({
        filter: {
          companyUid: user.company.uid,
          positionUid: user.position.uid,
          ['query.direction']: direction,
          ['query.orderBy']: orderBy,
          ['query.page']: page,
          ['query.size']: size,
          ['query.find']: undefined,
          ['query.findBy']: undefined,
          isNotify: undefined,
          status: undefined,
        }
      }); 
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  };

export const PurchaseApprovalList = compose<PurchaseApprovalListProps, OwnOptions>(
    withPurchaseApproval,
    withUser,
    withLayout,
    withNavBottom,
    withRouter,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<PurchaseApprovalListProps, OwnHandlers>(handlerCreators),
    lifecycle<PurchaseApprovalListProps, OwnState>(lifecycles),
  )(PurchaseApprovalListView);