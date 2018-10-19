import AppMenu from '@constants/AppMenu';
import { ExpenseField } from '@expense/classes/types';
import { RequestListView } from '@expense/components/request/list/RequestListView';
import { WithExpenseRequest, withExpenseRequest } from '@expense/hoc/withExpenseRequest';
import { SortDirection } from '@generic/types';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithNavBottom, withNavBottom } from '@layout/hoc/withNavBottom';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IListBarField } from '@layout/interfaces';
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
  handleGoToDetail: (expenseUid: string) => void;
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

export type RequestListProps 
  = WithExpenseRequest
  & WithUser
  & WithLayout
  & WithNavBottom
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<RequestListProps, OwnState> = (props: RequestListProps): OwnState => {
    const { orderBy, direction, page, size } = props;
    const { request } = props.expenseRequestState.all;

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

const handlerCreators: HandleCreators<RequestListProps, OwnHandlers> = {
    handleGoToDetail: (props: RequestListProps) => (expenseUid) => {
      const { history } = props;
      const { isLoading } = props.expenseRequestState.all;
  
      if (!isLoading) {
        history.push(`/expense/details/${expenseUid}`);
      } 
    },
    handleGoToNext: (props: RequestListProps) => () => { 
      props.stateNext();
    },
    handleGoToPrevious: (props: RequestListProps) => () => { 
      props.statePrevious();
    },
    handleReloading: (props: RequestListProps) => () => { 
      props.stateReloading();
  
      // force re-load from api
      loadData(props);
    },
    handleChangeOrder: (props: RequestListProps) => (field: IListBarField) => { 
      props.stateOrdering(field);
    },
    handleChangeSize: (props: RequestListProps) => (value: number) => { 
      props.stateSizing(value);
    },
    handleChangeSort: (props: RequestListProps) => (direction: SortDirection) => { 
      props.stateSorting(direction);
    }
  };

const lifecycles: ReactLifeCycleFunctions<RequestListProps, OwnState> = {
    componentDidMount() { 
      const { 
        handleGoToNext, handleGoToPrevious, handleReloading, 
        handleChangeOrder, handleChangeSize, handleChangeSort, 
        layoutDispatch, navBottomDispatch, 
        history, intl 
      } = this.props;
      
      const { isLoading, response } = this.props.expenseRequestState.all;
  
      layoutDispatch.changeView({
        uid: AppMenu.ExpenseRequest,
        parentUid: AppMenu.Expense,
        title: intl.formatMessage({id: 'expense.title'}),
        subTitle : intl.formatMessage({id: 'expense.subTitle'})
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
        onAddCallback: () => history.push('/expense/form'),
        onSizeCallback: handleChangeSize,
      });
  
      const items = Object.keys(ExpenseField)
        .map(key => ({ id: key, name: ExpenseField[key] }));
  
      navBottomDispatch.assignFields(items);
  
      // only load data when response are empty
      if (!isLoading && !response) {
        loadData(this.props);
      }
    },
    componentDidUpdate(props: RequestListProps, state: OwnState) {
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
      const { loadAllDispose } = this.props.expenseRequestDispatch;
  
      layoutDispatch.changeView(null);
      layoutDispatch.modeListOff();
      layoutDispatch.searchHide();
      layoutDispatch.modeSearchOff();
      layoutDispatch.actionCentreHide();
      layoutDispatch.moreHide();
  
      navBottomDispatch.dispose();
  
      // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
      if (view && view.parentUid !== AppMenu.Expense) {
        loadAllDispose();
      }
    }
  };

const loadData = (props: RequestListProps): void => {
    const { orderBy, direction, page, size } = props;
    const { user } = props.userState;
    const { loadAllRequest } = props.expenseRequestDispatch;
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
          start: undefined,
          end: undefined,
          status: undefined,
          isRejected: undefined,
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

export const RequestList = compose<RequestListProps, OwnOptions>(
    withExpenseRequest,
    withUser,
    withLayout,
    withNavBottom,
    withRouter,
    injectIntl,
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<RequestListProps, OwnHandlers>(handlerCreators),
    lifecycle<RequestListProps, OwnState>(lifecycles),
  )(RequestListView);