import { ISystemListFilter } from '@common/classes/filters';
import { LeaveType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILeaveRequestPostPayload, ILeaveRequestPutPayload } from '@leave/classes/request';
import { ILeave } from '@leave/classes/response';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { ILookupLeaveGetListFilter } from '@lookup/classes/filters';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
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

import { LeaveRequestFormView } from './LeaveRequestFormView';

export interface ILeaveRequestFormValue {
  uid: string;
  leaveType: string;
  regularType: string;
  start: string;
  end: string;
  address: string;
  contactNumber: string;
  reason: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: ILeaveRequestFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ILeaveRequestFormValue>>>;

  filterLookupLeave?: ILookupLeaveGetListFilter;
  filterCommonSystem: ISystemListFilter;

  holidayList: string[];
  isHoliday: boolean;
  holidayCheck: boolean;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setFilterLeave: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  setHoliday: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleFilterLeave: (values: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ILeaveRequestFormValue, actions: FormikActions<ILeaveRequestFormValue>) => void;
}

export type LeaveRequestFormProps
  = WithLeaveRequest
  & WithCommonSystem
  & WithLookupHoliday
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<LeaveRequestFormProps, IOwnState> = (props: LeaveRequestFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    leaveType: '',
    regularType: '',
    start: '',
    end: '',
    address: '',
    contactNumber: '',
    reason: '',
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ILeaveRequestFormValue>>({
    leaveType: Yup.string()
      .label(props.intl.formatMessage(leaveMessage.request.field.leaveType))
      .required(),

    regularType: Yup.string()
      .when('leaveType', {
        is: (leaveType: string) => leaveType === LeaveType.CutiKhusus,
        then: Yup.string().required()
      })
      .label(props.intl.formatMessage(leaveMessage.request.field.regularType)),

    start: Yup.string()
      .label(props.intl.formatMessage(leaveMessage.request.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(leaveMessage.request.field.end))
      .required(),

    address: Yup.string()
      .label(props.intl.formatMessage(leaveMessage.request.field.address))
      .required()
      .max(100),

    contactNumber: Yup.string()
      .label(props.intl.formatMessage(leaveMessage.request.field.contactNumber))
      .required()
      .max(15),

    reason: Yup.string()
      .label(props.intl.formatMessage(leaveMessage.request.field.reason))
      .required()
      .max(50)
  }),

  // filter props
  filterLookupLeave: {
    companyUid: props.userState.user && props.userState.user.company.uid,
    categoryType: 'LVC02',
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },

  holidayList: [],
  isHoliday: false,
  holidayCheck: false

});

const stateUpdaters: StateUpdaters<LeaveRequestFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setFilterLeave: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterLookupLeave: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setHoliday: (state: IOwnState, props: LeaveRequestFormProps) => (isHoliday?: boolean): Partial<IOwnState> => ({
    isHoliday,
    holidayCheck: true
  })
};

const handlerCreators: HandleCreators<LeaveRequestFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: LeaveRequestFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const leaveUid = props.history.location.state.uid;
      const { isLoading } = props.leaveRequestState.detail;

      if (user && leaveUid && !isLoading) {
        props.leaveRequestDispatch.loadDetailRequest({
          leaveUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleFilterLeave: (props: LeaveRequestFormProps) => (values: string) => {
    const filter: ILookupLeaveGetListFilter = {
      orderBy: 'name',
      direction: 'ascending',
      companyUid: props.userState.user && props.userState.user.company.uid,
      categoryType: values
    };

    props.setFilterLeave(filter);
  },
  handleOnSubmit: (props: LeaveRequestFormProps) => (values: ILeaveRequestFormValue, actions: FormikActions<ILeaveRequestFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // creating
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILeaveRequestPostPayload = {
          leaveType: values.leaveType,
          regularType: values.regularType === '' ? undefined : values.regularType,
          start: values.start,
          end: values.end,
          address: values.address,
          contactNumber: values.contactNumber,
          reason: values.reason,
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.leaveRequestDispatch.createRequest({
            resolve,
            reject,
            companyUid: user.company.uid,
            positionUid: user.position.uid,
            data: payload
          });
        });
      }

      // editing
      if (props.formMode === FormMode.Edit) {
        const leaveUid = props.history.location.state.uid;

        // must have leaveUid
        if (leaveUid) {
          // fill payload
          const payload: ILeaveRequestPutPayload = {
            uid: leaveUid,
            leaveType: values.leaveType,
            regularType: values.regularType === '' ? undefined : values.regularType,
            start: values.start,
            end: values.end,
            address: values.address,
            contactNumber: values.contactNumber,
            reason: values.reason,
          };

          promise = new Promise((resolve, reject) => {
            props.leaveRequestDispatch.updateRequest({
              leaveUid,
              resolve,
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              data: payload as ILeaveRequestPutPayload,
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ILeave) => {
        console.log(response);

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? leaveMessage.request.message.createSuccess : leaveMessage.request.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/leave/requests/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);

        // set form status
        actions.setStatus(error);

        // error on form fields
        if (error.errors) {
          error.errors.forEach(item =>
            actions.setFieldError(item.field, props.intl.formatMessage({ id: item.message }))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? leaveMessage.request.message.createFailure : leaveMessage.request.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<LeaveRequestFormProps, IOwnState> = {
  componentDidMount() {
    const { loadListRequest } = this.props.lookupHolidayDispatch;
    const { user } = this.props.userState;

    if (user) {
      loadListRequest({
        filter: {
          companyUid: user.company.uid,
        }
      });
    }
  },

  componentWillUpdate(nextProps: LeaveRequestFormProps) {
    const { response } = this.props.lookupHolidayState.list;

    if (response && response.data && this.props.holidayList.length === 0) {
      const year = new Date().getFullYear();
      response.data.map(holiday => {
        if (holiday.date) {
          if (moment(holiday.date).year() === year) {
            this.props.holidayList.push(holiday.date.substring(0, 10));
          }
        }
      });
    }
  },

  componentDidUpdate(prevProps: LeaveRequestFormProps) {

    // handle leave detail response
    const { response } = this.props.leaveRequestState.detail;

    if (response !== prevProps.leaveRequestState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: ILeaveRequestFormValue = {
          uid: response.data.uid,
          leaveType: response.data.leaveType,
          regularType: response.data.regular ? response.data.regular.leaveUid : '',
          start: response.data.start,
          end: response.data.end,
          address: response.data.address,
          contactNumber: response.data.contactNumber,
          reason: response.data.reason,
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }

    console.log(this.props.holidayList);
  }
};

export const LeaveRequestForm = compose<LeaveRequestFormProps, IOwnOption>(
  setDisplayName('LeaveRequestForm'),
  withUser,
  withRouter,
  withLeaveRequest,
  withCommonSystem,
  withLookupHoliday,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LeaveRequestFormView);