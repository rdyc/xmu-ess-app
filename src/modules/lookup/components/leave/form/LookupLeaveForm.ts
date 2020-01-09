import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ILookupLeavePostPayload, ILookupLeavePutPayload } from '@lookup/classes/request';
import { ILeaveItems } from '@lookup/classes/request/leave/ILeaveItems';
import { ILookupLeave } from '@lookup/classes/response';
import { WithLookupLeave, withLookupLeave } from '@lookup/hoc/withLookupLeave';
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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';

import { LeaveFormView } from './LookupLeaveFormView';

export interface ILeaveFormValue {
  uid?: string;
  companyUid: string;
  categoryType: string;
  year: string;
  name: string;
  allocation: number;
  isWithinHoliday: boolean;
  items: ILeaveItems[];
}

interface IOwnRouteParams {
  leaveUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ILeaveFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ILeaveFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ILeaveFormValue, actions: FormikActions<ILeaveFormValue>) => void;
}

export type LeaveFormProps
  = WithLookupLeave
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<LeaveFormProps, IOwnState> = (props: LeaveFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    categoryType: '',
    year: '',
    name: '',
    allocation: 0,
    isWithinHoliday: false,
    items: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ILeaveFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.leave.field.company))
      .required(),

    categoryType: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.leave.field.category))
      .required(),

    year: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.leave.field.year))
      .required(),

    name: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.leave.field.name))
      .max(50)
      .required(),

    allocation: Yup.number()
      .integer()
      .label(props.intl.formatMessage(lookupMessage.leave.field.allocation))
      .required(),

    isWithinHoliday: Yup.boolean()
      .label(props.intl.formatMessage(lookupMessage.leave.field.isWithinHoliday)),

    items: Yup.array()
      .of(
        Yup.object().shape({
          leaveDate: Yup.string()	
            .label(props.intl.formatMessage(lookupMessage.leave.field.leaveDate))	
            .required(),
          leaveDescription: Yup.string()	
            .label(props.intl.formatMessage(lookupMessage.leave.field.leaveDescription))	
            .required()	
        })
      )
      .min(1, props.intl.formatMessage(lookupMessage.leave.field.minLeave)),	
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<LeaveFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<LeaveFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: LeaveFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const leaveUid = props.history.location.state.uid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.lookupLeaveState.detail;

      if (user && leaveUid && !isLoading) {
        props.lookupLeaveDispatch.loadDetailRequest({
          leaveUid,
          companyUid,
        });
      }
    }
  },
  handleOnSubmit: (props: LeaveFormProps) => (values: ILeaveFormValue, actions: FormikActions<ILeaveFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILookupLeavePostPayload = {
          categoryType: values.categoryType,
          year: Number(values.year),
          name: values.name,
          allocation: values.allocation,
          isWithinHoliday: values.isWithinHoliday,
          items: values.items
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupLeaveDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const leaveUid = props.history.location.state.uid;
        const companyUid = props.history.location.state.companyUid;

        // must have leaveUid
        if (leaveUid && companyUid) {
          const payload: ILookupLeavePutPayload = {
            categoryType: values.categoryType,
            year: Number(values.year),
            name: values.name,
            allocation: values.allocation,
            isWithinHoliday: values.isWithinHoliday,
            items: values.items
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupLeaveDispatch.updateRequest({
              leaveUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload as ILookupLeavePutPayload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ILookupLeave) => {
        console.log(response);

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.leave.message.createSuccess : lookupMessage.leave.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/leaves/config/${response.uid}`, { companyUid: response.companyUid });
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.leave.message.createFailure : lookupMessage.leave.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<LeaveFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: LeaveFormProps) {
    const { response: thisResponse } = this.props.lookupLeaveState.detail;
    const { response: prevResponse } = prevProps.lookupLeaveState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ILeaveFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          categoryType: thisResponse.data.categoryType,
          year: thisResponse.data.year.toString(),
          name: thisResponse.data.name,
          allocation: thisResponse.data.allocation,
          isWithinHoliday: thisResponse.data.isWithinHoliday,
          items: []
        };

        thisResponse.data.dates.forEach(item => initialValues.items.push({
          uid: item.uid,
          leaveDate: item.leaveDate,
          leaveDescription: item.leaveDescription
        }));

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LeaveForm = compose<LeaveFormProps, IOwnOption>(
  setDisplayName('LeaveForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupLeave,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LeaveFormView);