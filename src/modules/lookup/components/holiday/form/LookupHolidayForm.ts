import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ILookupHolidayPostPayload, ILookupHolidayPutPayload } from '@lookup/classes/request';
import { ILookupHoliday } from '@lookup/classes/response';
import { WithLookupHoliday, withLookupHoliday } from '@lookup/hoc/withLookupHoliday';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';

import { HolidayFormView } from './LookupHolidayFormView';

export interface IHolidayFormValue {
  uid?: string;
  companyUid: string;
  description: string;
  date: string;
}

interface IOwnRouteParams {
  holidayUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IHolidayFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IHolidayFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IHolidayFormValue, actions: FormikActions<IHolidayFormValue>) => void;
}

export type HolidayFormProps
  = WithLookupHoliday
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HolidayFormProps, IOwnState> = (props: HolidayFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    description: '',
    date: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IHolidayFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.holiday.field.company))
      .required(),

    description: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.holiday.field.description))
      .required(),

   date: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.holiday.field.date))
      .required(),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<HolidayFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<HolidayFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HolidayFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const holidayUid = props.history.location.state.uid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.lookupHolidayState.detail;

      if (user && holidayUid && !isLoading) {
        props.lookupHolidayDispatch.loadDetailRequest({
          holidayUid,
          companyUid
        });
      }
    }
  },
  handleOnSubmit: (props: HolidayFormProps) => (values: IHolidayFormValue, actions: FormikActions<IHolidayFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILookupHolidayPostPayload = {
          description: values.description,
          date: values.date
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupHolidayDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const holidayUid = props.history.location.state.uid;
        const companyUid = props.history.location.state.companyUid;

        // must have holidayUid
        if (holidayUid && companyUid) {
          const payload: ILookupHolidayPutPayload = {
            description: values.description,
            date: values.date
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupHolidayDispatch.updateRequest({
              holidayUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload as ILookupHolidayPutPayload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ILookupHoliday) => {
        console.log(response);

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.holiday.message.createSuccess : lookupMessage.holiday.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/holidays/${response.uid}`, { companyUid: response.companyUid });
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.holiday.message.createFailure : lookupMessage.holiday.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HolidayFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HolidayFormProps) {
    const { response: thisResponse } = this.props.lookupHolidayState.detail;
    const { response: prevResponse } = prevProps.lookupHolidayState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IHolidayFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          description: thisResponse.data.description,
          date: thisResponse.data.date
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const HolidayForm = compose<HolidayFormProps, IOwnOption>(
  setDisplayName('HolidayForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupHoliday,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HolidayFormView);