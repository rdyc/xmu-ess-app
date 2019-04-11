import { ISystemListFilter } from '@common/classes/filters';
import { ProjectType } from '@common/classes/types';
import { AppRole } from '@constants/AppRole';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { withOidc, WithOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { GlobalFormat } from '@layout/types';
import { ILookupCustomerGetListFilter } from '@lookup/classes/filters/customer';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectAssignmentGetListFilter } from '@project/classes/filters/assignment';
import styles from '@styles';
import { ITimesheetPostPayload, ITimesheetPutPayload } from '@timesheet/classes/request/entry';
import { ITimesheet } from '@timesheet/classes/response';
import { withTimesheetEntry, WithTimesheetEntry } from '@timesheet/hoc/withTimesheetEntry';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import { FormikActions } from 'formik';
import * as moment from 'moment';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { TimesheetEntryFormView } from './TimesheetEntryFormView';

export interface ITimesheetEntryFormValue {
  uid: string;
  activityType: string;
  customerUid: string;
  projectUid: string;
  siteUid: string;
  date: string;
  start: string;
  end: string;
  description: string;
}

interface IOwnRouteParams {
  timesheetUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  isAdmin: boolean;

  filterLookupCustomer?: ILookupCustomerGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  filterProject?: IProjectAssignmentGetListFilter;
  
  initialValues?: ITimesheetEntryFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ITimesheetEntryFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setIsAdmin: StateHandler<IOwnState>;
  setProjectFilter: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetProjectFilter: (customerUid: string, values: ITimesheetEntryFormValue) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ITimesheetEntryFormValue, actions: FormikActions<ITimesheetEntryFormValue>) => void;
}

export type TimesheetEntryFormProps
  = WithTimesheetEntry
  & WithUser
  & WithOidc
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<TimesheetEntryFormProps, IOwnState> = (props: TimesheetEntryFormProps): IOwnState => ({
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  isAdmin: false,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    activityType: '',
    customerUid: '',
    projectUid: '',
    siteUid: '',
    date: '',
    start: '',
    end: '',
    description: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ITimesheetEntryFormValue>>({
    activityType: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.activityType))
      .required(),

    customerUid: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.customerUid))
      .required(),

    projectUid: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.projectUid))
      .required(),

    siteUid: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.projectUid))
      .required(),

    date: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.projectUid))
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.projectUid))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.projectUid))
      .required(),

    description: Yup.string()
      .label(props.intl.formatMessage(timesheetMessage.entry.field.projectUid))
      .max(200)
      .required(),
  }),

  // filter props
  filterLookupCustomer: {
    companyUid: props.userState.user && props.userState.user.company.uid,
    orderBy: 'name',
    direction: 'ascending'
  },
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<TimesheetEntryFormProps, IOwnState, IOwnStateUpdater> = {
  setIsAdmin: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    isAdmin: !state.isAdmin
  }),
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setProjectFilter: (state: IOwnState) => (filterProject: IProjectAssignmentGetListFilter) => ({
    filterProject
  }),
};

const handlerCreators: HandleCreators<TimesheetEntryFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: TimesheetEntryFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const timesheetUid = props.history.location.state.uid;
      const { isLoading } = props.timesheetEntryState.detail;

      if (user && timesheetUid && !isLoading) {
        props.timesheetEntryDispatch.loadDetailRequest({
          timesheetUid
        });
      }
    }
  },
  handleSetProjectFilter: (props: TimesheetEntryFormProps) => (customerUid: string, values: ITimesheetEntryFormValue) => {
    const { user } = props.userState;

    const filterProject: IProjectAssignmentGetListFilter = {
      customerUid,
      employeeUid: user && user.uid,
      projectTypes: values.activityType === 'SAT02' ? ProjectType.PreSales : 
                    values.activityType === 'SAT04' ? ProjectType.Maintenance :
                    [ProjectType.Project, ProjectType.ExtraMiles, ProjectType.NonProject].join(',')
    };

    props.setProjectFilter(filterProject);
  },
  handleOnSubmit: (props: TimesheetEntryFormProps) => (values: ITimesheetEntryFormValue, actions: FormikActions<ITimesheetEntryFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // create
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ITimesheetPostPayload = {
          activityType: values.activityType,
          customerUid: values.customerUid,
          projectUid: values.projectUid,
          siteUid: values.siteUid,
          date: values.date,
          start: values.start,
          end: values.end,
          description: values.description
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.timesheetEntryDispatch.createRequest({
            resolve,
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload
          });
        });
      }
      
      // modify
      if (props.formMode === FormMode.Edit) {
        const timesheetUid = props.history.location.state.uid;

        // must have timesheetUid
        if (timesheetUid) {
          const payload: ITimesheetPutPayload = {
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            activityType: values.activityType,
            customerUid: values.customerUid,
            projectUid: values.projectUid,
            siteUid: values.siteUid,
            date: values.date,
            start: values.start,
            end: values.end,
            description: values.description
          };

          // set the promise edit
          promise = new Promise((resolve, reject) => {
            props.timesheetEntryDispatch.updateRequest({
              timesheetUid,
              resolve,
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ITimesheet) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? timesheetMessage.entry.message.createSuccess : timesheetMessage.entry.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/timesheet/requests/${response.uid}`);        
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        
        // set form status
        actions.setStatus(error);
        
        // error on form fields
        if (error.errors) {
          error.errors.forEach(item => 
            actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? timesheetMessage.entry.message.createFailure : timesheetMessage.entry.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<TimesheetEntryFormProps, IOwnState> = {
  componentDidMount() {
    // checking admin status
    const { user } = this.props.oidcState;
    let isAdmin: boolean = false;

    if (user) {
      const role: string | string[] | undefined = user.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          isAdmin = role.indexOf(AppRole.Admin) !== -1;
        } else {
          isAdmin = role === AppRole.Admin;
        }
      }

      if (isAdmin) {
        this.props.setIsAdmin();
      }
    }
  },
  componentDidUpdate(prevProps: TimesheetEntryFormProps) {
    const { response: thisResponse } = this.props.timesheetEntryState.detail;
    const { response: prevResponse } = prevProps.timesheetEntryState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        const start = this.props.intl.formatDate(thisResponse.data.start, GlobalFormat.TimeDate);
        const end = this.props.intl.formatDate(thisResponse.data.end, GlobalFormat.TimeDate);

        const initialValues: ITimesheetEntryFormValue = {
          uid: thisResponse.data.uid,
          activityType: thisResponse.data.activityType,
          customerUid: thisResponse.data.customerUid,
          projectUid: thisResponse.data.projectUid,
          siteUid: thisResponse.data.siteUid,
          date: thisResponse.data.date,
          start: moment(start).toISOString(true),
          end: moment(end).toISOString(true),
          description: thisResponse.data.description || ''
        };

        this.props.handleSetProjectFilter(thisResponse.data.customerUid, initialValues);
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const TimesheetEntryForm = compose<TimesheetEntryFormProps, IOwnOption>(
  setDisplayName('TimesheetEntryForm'),
  withUser,
  withOidc,
  withMasterPage,
  withRouter,
  withTimesheetEntry,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(TimesheetEntryFormView);