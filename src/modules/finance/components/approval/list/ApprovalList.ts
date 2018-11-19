import AppMenu from '@constants/AppMenu';
import { FinanceField } from '@finance/classes/types';
import { ApprovalListView } from '@finance/components/approval/list/ApprovalListView';
import { WithFinanceApproval, withFinanceApproval } from '@finance/hoc/withFinanceApproval';
import { SortDirection } from '@generic/types';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
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
  handleCheckbox: (uid: string) => void;
  handleGoToDetail: (projectUid: string) => void;
  handleGoToApproval: () => void;
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleReloading: () => void;
  handleChangeSize: (value: number) => void;
  handleChangeOrder: (field: ICollectionValue) => void;
  handleChangeSort: (direction: SortDirection) => void;
}

interface OwnOptions {
  orderBy?: string | undefined;
  direction?: string | undefined;
  page?: number | undefined;
  size?: number | undefined;
}

interface OwnState {
  financeUids: string[] | undefined;
  orderBy: string | undefined;
  direction: string | undefined;
  page: number;
  size: number;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateCheckbox: StateHandler<OwnState>;
  stateNext: StateHandler<OwnState>;
  statePrevious: StateHandler<OwnState>;
  stateReloading: StateHandler<OwnState>;
  stateOrdering: StateHandler<OwnState>;
  stateSorting: StateHandler<OwnState>;
  stateSizing: StateHandler<OwnState>;
}

export type ApprovalListProps 
  = WithFinanceApproval
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<ApprovalListProps, OwnState> = (props: ApprovalListProps): OwnState => {
    const { orderBy, page, size } = props;
    const { request } = props.financeApprovalState.all;
  
    return { 
      financeUids: [],
      orderBy: request && request.filter && request.filter.orderBy || orderBy,
      direction: request && request.filter && request.filter.direction || SortDirection.desc,
      page: request && request.filter && request.filter.page || page || 1, 
      size: request && request.filter && request.filter.size || size || 10,
    };
  };

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
    stateCheckbox: (prevState: OwnState) => (financeUids: string[]) => ({
      financeUids
    }),
    stateNext: (prevState: OwnState) => () => ({
      page: prevState.page + 1,
    }),
    statePrevious: (prevState: OwnState) => () => ({
      page: prevState.page - 1,
    }),
    stateReloading: (prevState: OwnState) => () => ({
      page: 1,
    }),
    stateOrdering: (prevState: OwnState) => (field: ICollectionValue) => ({
      orderBy: field.value,
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

const handlerCreators: HandleCreators<ApprovalListProps, OwnHandlers> = {
    handleCheckbox: (props: ApprovalListProps) => (uid: string) => {
      const { financeUids, stateCheckbox } = props;
      const _uids = new Set(financeUids);

      _uids.has(uid) ? _uids.delete(uid) : _uids.add(uid);

      stateCheckbox(Array.from(_uids));
    },
    handleGoToDetail: (props: ApprovalListProps) => (financeUid) => {
      const { history } = props;
      const { isLoading } = props.financeApprovalState.all;
  
      if (!isLoading) {
        history.push(`/finance/approvals/${financeUid}`);
      } 
    },
    handleGoToApproval: (props: ApprovalListProps) => () => {
      const { history, financeUids } = props;
      const { isLoading } = props.financeApprovalState.all;
  
      if (!isLoading) {
        history.push(`/finance/approvals/payment/${financeUids}`);      } 

    },
    handleGoToNext: (props: ApprovalListProps) => () => { 
      props.stateNext();
    },
    handleGoToPrevious: (props: ApprovalListProps) => () => { 
      props.statePrevious();
    },
    handleReloading: (props: ApprovalListProps) => () => { 
      props.stateReloading();
  
      // force re-load from api
      loadData(props);
    },
    handleChangeOrder: (props: ApprovalListProps) => (field: ICollectionValue) => { 
      props.stateOrdering(field);
    },
    handleChangeSize: (props: ApprovalListProps) => (value: number) => { 
      props.stateSizing(value);
    },
    handleChangeSort: (props: ApprovalListProps) => (direction: SortDirection) => { 
      props.stateSorting(direction);
    }
  };

  // tslint:disable-next-line:align
  const lifecycles: ReactLifeCycleFunctions<ApprovalListProps, OwnState> = {
    componentDidMount() { 
      const { 
        handleGoToNext, handleGoToPrevious, handleReloading, 
        handleChangeOrder, handleChangeSize, handleChangeSort, 
        layoutDispatch, navBottomDispatch, 
        history, intl
      } = this.props;
      
      const { isLoading, response } = this.props.financeApprovalState.all;
  
      layoutDispatch.changeView({
        uid: AppMenu.FinanceApproval,
        parentUid: AppMenu.Finance,
        title: intl.formatMessage({id: 'finance.title'}),
        subTitle : intl.formatMessage({id: 'finance.subTitle'})
      });
  
      layoutDispatch.modeListOn();
      layoutDispatch.searchShow();
      layoutDispatch.actionCentreShow();
      
      navBottomDispatch.addHide();
      navBottomDispatch.assignCallbacks({
        onNextCallback: handleGoToNext,
        onPrevCallback: handleGoToPrevious,
        onSyncCallback: handleReloading,
        onOrderCallback: handleChangeOrder,
        onDirectionCallback: handleChangeSort,
        onAddCallback: () => history.push(''),
        onSizeCallback: handleChangeSize,
      });
  
      const items = Object.keys(FinanceField)
        .map(key => ({ value: key, name: FinanceField[key] }));
  
      navBottomDispatch.assignFields(items);
  
      // only load data when response are empty
      if (!isLoading && !response) {
        loadData(this.props);
      }
    },
    componentDidUpdate(props: ApprovalListProps, state: OwnState) {
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
      const { loadAllDispose } = this.props.financeApprovalDispatch;
  
      layoutDispatch.changeView(null);
      layoutDispatch.modeListOff();
      layoutDispatch.searchHide();
      layoutDispatch.modeSearchOff();
      layoutDispatch.actionCentreHide();
      layoutDispatch.moreHide();
  
      navBottomDispatch.dispose();
  
      // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
      if (view && view.parentUid !== AppMenu.Finance) {
        loadAllDispose();
      }
    }
  };
  
const loadData = (props: ApprovalListProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { loadAllRequest } = props.financeApprovalDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      loadAllRequest({
        companyUid: user.company.uid,
        positionUid: user.position.uid,
        filter: {
          direction,
          orderBy,
          page,
          size,
          moduleType: undefined,
          employeeName: undefined,
          financeStatusTypes: undefined,
          settlementStatusTypes: undefined,
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

export const ApprovalList = compose<ApprovalListProps, OwnOptions>(
    withFinanceApproval,
    withUser,
    withLayout,
    withNavBottom,
    withRouter,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<ApprovalListProps, OwnHandlers>(handlerCreators),
    lifecycle<ApprovalListProps, OwnState>(lifecycles),
  )(ApprovalListView);