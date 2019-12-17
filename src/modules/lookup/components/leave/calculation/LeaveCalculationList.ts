import { IEmployeeListFilter } from '@account/classes/filters/IEmployeeListFilter';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ICalculateLeavePayload } from '@lookup/classes/request';
import { WithLeaveCalculation, withLeaveCalculation } from '@lookup/hoc/withLeaveCalculation';
import { WithLookupCompany, withLookupCompany } from '@lookup/hoc/withLookupCompany';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  shallowEqual,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { LeaveCalculationListView } from './LeaveCalculationListView';
import { ILeaveFilterResult } from './LeaveFilter';

export interface ICalculationFormValue {
  companyUid: string;
  companyName?: string;
  year: number;
}

interface IOwnHandlers {
  handleGoToNext: () => void;
  handleGoToPrevious: () => void;
  handleChangeSize: (value: number) => void;
  handleChangePage: (page: number) => void;
  handleFilterVisibility: (event: React.MouseEvent<HTMLElement>) => void;
  handleFilterApplied: (filter: ILeaveFilterResult) => void;
  handleOnLoadApi: () => void;
  handleFindEmployee: (find: string) => void;

  // Calculation
  handleOnSubmit: (values: ICalculationFormValue, actions: FormikActions<ICalculationFormValue>) => void;
}

interface IOwnState extends ILeaveFilterResult {
  page: number;
  size: number;
  find: string | undefined;
  isFilterOpen: boolean;
  filterEmployee?: IEmployeeListFilter;

  // Calculation
  initialValues?: ICalculationFormValue;
  isCalculateOpen: boolean;
}

interface IOwnStateUpdaters extends StateHandlerMap<IOwnState> {
  stateNext: StateHandler<IOwnState>;
  statePrevious: StateHandler<IOwnState>;
  stateSizing: StateHandler<IOwnState>;
  statePage: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setFilterVisibility: StateHandler<IOwnState>;
  setFilterApplied: StateHandler<IOwnState>;

  // Calculation
  setInitialValues: StateHandler<IOwnState>;
  setCalculateOpen: StateHandler<IOwnState>;
}

export type LeaveCalculationListProps = 
  WithLeaveCalculation &
  WithLookupCompany &
  WithUser &
  WithLayout &
  WithMasterPage &
  WithStyles<typeof styles> &
  RouteComponentProps &
  InjectedIntlProps &
  IOwnHandlers &
  IOwnState &
  IOwnStateUpdaters;

const createProps: mapper<LeaveCalculationListProps, IOwnState> = (props: LeaveCalculationListProps): IOwnState => {
  const { request } = props.leaveCalculationState.all;

  const state: IOwnState = {
    companyUid: request && request.companyUid || '',
    year: request && request.year || 0,
    find: request && request.filter && request.filter.find || undefined,
    isFilterOpen: true,
    page: request && request.filter && request.filter.page || 1,
    size: request && request.filter && request.filter.size || 10,

    // Calculation
    initialValues: {
      companyUid: request && request.companyUid || '',
      year: request && request.year || 0
    },
    isCalculateOpen: false,
  };

  if (request && request.filter) {
    state.isFilterOpen = false;
  }

  return state;
};

const stateUpdaters: StateUpdaters<LeaveCalculationListProps, IOwnState, IOwnStateUpdaters> = {
  stateNext: (prevState: IOwnState) => () => ({
    page: prevState.page + 1
  }),
  statePrevious: (prevState: IOwnState) => () => ({
    page: prevState.page - 1
  }),
  stateSizing: (prevState: IOwnState) => (size: number) => ({
    size,
    page: 1
  }),
  statePage: (prevState: IOwnState) => (page: number) => ({
    page
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterVisibility: (state: IOwnState) => (): Partial<IOwnState> => ({
    isFilterOpen: !state.isFilterOpen
  }),
  setFilterApplied: () => (filter: ILeaveFilterResult): Partial<IOwnState> => ({
    ...filter,
    isFilterOpen: false,
    filterEmployee: {
      isActive: true,
      orderBy: 'fullName',
      direction: 'ascending',
      companyUids: filter.companyUid
    }
  }),

  // Calculate
  setInitialValues: () => (values: ICalculationFormValue): Partial<IOwnState> => ({
    initialValues: values
  }),
  setCalculateOpen: (prevState: IOwnState) => () => ({
    isCalculateOpen: !prevState.isCalculateOpen
  })
};

const handlerCreators: HandleCreators<LeaveCalculationListProps, IOwnHandlers> = {
  handleGoToNext: (props: LeaveCalculationListProps) => () => {
    props.stateNext();
  },
  handleGoToPrevious: (props: LeaveCalculationListProps) => () => {
    props.statePrevious();
  },
  handleChangeSize: (props: LeaveCalculationListProps) => (value: number) => {
    props.stateSizing(value);
  },
  handleFindEmployee: (props: LeaveCalculationListProps) => (find: string) => {
    props.stateUpdate({
      find
    });
  },
  handleChangePage: (props: LeaveCalculationListProps) => (page: number) => {
    props.statePage(page);
  },
  handleOnLoadApi: (props: LeaveCalculationListProps) => () => {
    const { size, find, page, year, companyUid } = props;
    const { user } = props.userState;
    // const { isLoading, isExpired } = props.leaveCalculationState.all;
    const { loadAllRequest } = props.leaveCalculationDispatch;

    if (user) {
      loadAllRequest({
        companyUid,
        year,
        filter: {
          find,
          page,
          size,
        }
      });
    }
  },
  handleFilterVisibility: (props: LeaveCalculationListProps) => () => {
    props.setFilterVisibility();
  },
  handleFilterApplied: (props: LeaveCalculationListProps) => (filter: ILeaveFilterResult) => {
    props.setFilterApplied(filter);
    
    if (props.filterEmployee) {
      const isFilterChanged = !shallowEqual(
        {
          year: filter.year,
          companyUid: filter.companyUid
        },
        {
          year: props.year,
          companyUid: props.companyUid
        }
      );

      if (isFilterChanged) {
        props.stateUpdate({
          find: ''
        });
      }
    }
  },
  handleOnSubmit: (props: LeaveCalculationListProps) => (values: ICalculationFormValue, actions: FormikActions<ICalculationFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // fill payload
      const payload: ICalculateLeavePayload = {
        // 
      };

     // set the promise
      promise = new Promise((resolve, reject) => {
        props.leaveCalculationDispatch.createRequest({
          resolve,
          reject,
          companyUid: values.companyUid,
          year: values.year,
          data: payload
        });
      });  
    }
    // handling promise
    promise
      .then((response: boolean) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(lookupMessage.calculation.message.calculateSuccess, {company: values.companyName || values.companyUid, year: values.year})
        });
      })
      .catch((error: any) => {
        let err: IValidationErrorResponse | undefined = undefined;
        
        if (error.id) {
          err = error;
        }
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (err && err.errors) {
          err.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }
        
        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(lookupMessage.calculation.message.calculateFailure)
        });
      });
  }
};

const lifecycles: ReactLifeCycleFunctions<LeaveCalculationListProps, IOwnState> = {
  componentDidMount() {
    // Load company use later
    const { response, isLoading, isExpired } = this.props.lookupCompanyState.list;

    if (!response && !isLoading || isExpired) {
      this.props.lookupCompanyDispatch.loadListRequest({});
    }
  },
  componentDidUpdate(prevProps: LeaveCalculationListProps) {
    const { isExpired } = this.props.leaveCalculationState.all;

    // track any changes in filter props
    const isFilterChanged = !shallowEqual(
      {
        year: this.props.year,
        companyUid: this.props.companyUid,
        find: this.props.find,
        page: this.props.page,
        size: this.props.size
      },
      {
        year: prevProps.year,
        companyUid: prevProps.companyUid,
        find: prevProps.find,
        page: prevProps.page,
        size: prevProps.size
      }
    );

    if (isFilterChanged || isExpired) {
      this.props.handleOnLoadApi();
    }
  }
};

export const LeaveCalculationList = compose(
  withLeaveCalculation,
  withUser,
  withLayout,
  withLookupCompany,
  withMasterPage,
  withRouter,
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles)
)(LeaveCalculationListView);
