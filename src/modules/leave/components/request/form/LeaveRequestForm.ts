import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types/FormMode';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILeaveRequestPostPayload, ILeaveRequestPutPayload } from '@leave/classes/request';
import { ILeave } from '@leave/classes/response';
import { WithLeaveRequest, withLeaveRequest } from '@leave/hoc/withLeaveRequest';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { ILookupLeaveGetListFilter } from '@lookup/classes/filters';
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
import { WithLeaveGetEnd, withLeaveGetEnd } from '@leave/hoc/withLeaveGetEnd';

export interface ILeaveRequestFormValue {
  uid: string;
  leaveType: string;
  regularType?: string;
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
  endValue: string;
  // isRequestor: boolean;

  initialValues: ILeaveRequestFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ILeaveRequestFormValue>>>;

  filterCommonSystem: ISystemListFilter;
  filterLookupLeave?: ILookupLeaveGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  // setIsRequestor: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
  setFilterLeave: StateHandler<IOwnState>;
  setEndValue: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleFilterLeave: (values: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ILeaveRequestFormValue, actions: FormikActions<ILeaveRequestFormValue>) => void;
}

export type LeaveRequestFormProps
  = WithLeaveRequest
  & WithCommonSystem
  & WithLeaveGetEnd
  & WithUser
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
  endValue: '',
  // isRequestor: true,

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
      .required(props.intl.formatMessage(leaveMessage.request.fieldFor('leaveType', 'fieldRequired'))),

    start: Yup.string()
      .required(props.intl.formatMessage(leaveMessage.request.fieldFor('start', 'fieldRequired'))),

    end: Yup.string()
      .required(props.intl.formatMessage(leaveMessage.request.fieldFor('end', 'fieldRequired'))),

    address: Yup.string()
      .required(props.intl.formatMessage(leaveMessage.request.fieldFor('address', 'fieldRequired'))),

    contactNumber: Yup.string()
      .required(props.intl.formatMessage(leaveMessage.request.fieldFor('contactNumber', 'fieldRequired'))),

    reason: Yup.string()
      .required(props.intl.formatMessage(leaveMessage.request.fieldFor('reason', 'fieldRequired'))),
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<LeaveRequestFormProps, IOwnState, IOwnStateUpdater> = {
  // setIsRequestor: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
  //   isRequestor: !state.isRequestor
  // }),
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setFilterLeave: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    filterLookupLeave: values
  }),
  setEndValue: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    endValue: values
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

          // requestor is updating the request
          if (props.isRequestor) {
            // fill payload
            const payload: ILeaveRequestPutPayload = {
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
    }

    // handling promise
    promise
      .then((response: ILeave) => {
        console.log(response);

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // todo: redirecting
        /* 
        if (formMode === FormMode.New) {
          message = intl.formatMessage(leaveMessage.request.message.createSuccess, { uid: response.uid });
        }

        if (formMode === FormMode.Edit) {
          message = intl.formatMessage(leaveMessage.request.message.updateSuccess, { uid: response.uid });
        }

        alertAdd({
          message,
          time: new Date()
        });
        */

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
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<LeaveRequestFormProps, IOwnState> = {
  componentDidUpdate(prevProps: LeaveRequestFormProps) {

    // handle leave detail response
    const { response } = this.props.leaveRequestState.detail;

    if (response !== prevProps.leaveRequestState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: ILeaveRequestFormValue = {
          uid: response.data.uid,
          leaveType: response.data.leaveType,
          regularType: response.data.regularType,
          start: response.data.start,
          end: response.data.end,
          address: response.data.address,
          contactNumber: response.data.contactNumber,
          reason: response.data.reason,
        };

        // set initial values
        this.props.setInitialValues(initialValues);

        // update isRequestor status
        if (this.props.userState.user && response.data.changes) {
          if (this.props.userState.user.uid !== response.data.changes.createdBy) {
            this.props.setIsRequestor();
          }
        }
      }
    }
  }
};

export const LeaveRequestForm = compose<LeaveRequestFormProps, IOwnOption>(
  setDisplayName('LeaveRequestForm'),
  withUser,
  withRouter,
  withLeaveRequest,
  withCommonSystem,
  withLeaveGetEnd,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LeaveRequestFormView);