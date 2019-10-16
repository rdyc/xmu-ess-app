import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ICurrencyListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ILookupDiemPostPayload, ILookupDiemPutPayload } from '@lookup/classes/request/diem';
import { IDiem } from '@lookup/classes/response';
import { WithLookupDiem, withLookupDiem } from '@lookup/hoc/withLookupDiem';
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
  withStateHandlers 
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { LookupDiemFormView } from './LookupDiemFormView';

export interface IDiemFormValue {
  uid: string;
  companyUid: string;
  currencyUid: string;
  projectType: string;
  destinationType: string;
  value: number;
}

interface IOwnRouteParams {
  diemUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IDiemFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IDiemFormValue>>>;

  filterCommonSystem: ISystemListFilter;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterLookupCurrency?: ICurrencyListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IDiemFormValue, actions: FormikActions<IDiemFormValue>) => void;
}

export type DiemFormProps
  = WithLookupDiem
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

const createProps: mapper<DiemFormProps, IOwnState> = (props: DiemFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values 
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    currencyUid: '',
    projectType: '',
    destinationType: '',
    value: 0,
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IDiemFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.lookupDiem.field.company))
      .required(),

    currencyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.lookupDiem.field.currency))
      .required(),

    projectType: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.lookupDiem.field.project))
      .required(),

    destinationType: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.lookupDiem.field.destination))
      .required(),

    value: Yup.number()
      .min(0)
      .label(props.intl.formatMessage(lookupMessage.lookupDiem.field.value))
      .required(),
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterLookupCurrency: {
    orderBy: undefined,
    direction: undefined
  },
});

const stateUpdaters: StateUpdaters<DiemFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<DiemFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: DiemFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const diemUid = props.history.location.state.uid;
      const companyUid = props.history.location.state.company;
      const { isLoading } = props.lookupDiemState.detail;

      if (user && companyUid && diemUid && !isLoading) {
        props.lookupDiemDispatch.loadDetailRequest({
          diemUid,
          companyUid
        });
      }
    }
  },
  handleOnSubmit: (props: DiemFormProps) => (values: IDiemFormValue, actions: FormikActions<IDiemFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILookupDiemPostPayload = {
          currencyUid: values.currencyUid,
          projectType: values.projectType,
          destinationType: values.destinationType,
          value: values.value
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupDiemDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const diemUid = props.history.location.state.uid;

        // must have customerUid
        if (diemUid) {
          const payload: ILookupDiemPutPayload = {
            currencyUid: values.currencyUid,
            projectType: values.projectType,
            destinationType: values.destinationType,
            value: values.value
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupDiemDispatch.updateRequest({
              diemUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IDiem) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.lookupDiem.message.createSuccess : lookupMessage.lookupDiem.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/diemvalues/${response.uid}`, { company: response.companyUid });
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.lookupDiem.message.createFailure : lookupMessage.lookupDiem.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<DiemFormProps, IOwnState> = {
  componentDidMount() {
    // 
  },
  componentDidUpdate(prevProps: DiemFormProps) {
    const { response: thisResponse } = this.props.lookupDiemState.detail;
    const { response: prevResponse } = prevProps.lookupDiemState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IDiemFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          currencyUid: thisResponse.data.currencyUid,
          projectType: thisResponse.data.projectType,
          destinationType: thisResponse.data.destinationType,
          value: thisResponse.data.value  
        };

        this.props.setInitialValues(initialValues);
      }

    }
  }
};

export const LookupDiemForm = compose<DiemFormProps, IOwnOption>(
  setDisplayName('LookupDiemForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupDiem,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupDiemFormView);