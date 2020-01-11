import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIOpenPostPayload, IKPIOpenPutPayload } from '@kpi/classes/request/open';
import { IKPIOpenDetail } from '@kpi/classes/response/open';
import { WithKPIOpen, withKPIOpen } from '@kpi/hoc/withKPIOpen';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
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
import * as Yup from 'yup';
import { KPIOpenFormView } from './KPIOpenFormView';

export interface IKPIOpenFormValue {
  uid: string;
  year: string;
  period: string;
  date: string;
}

interface IOwnRouteParams {
  openUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IKPIOpenFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPIOpenFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPIOpenFormValue, action: FormikActions<IKPIOpenFormValue>) => void;
}

export type KPIOpenFormProps
  = WithKPIOpen
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

const createProps: mapper<KPIOpenFormProps, IOwnState> = (props: KPIOpenFormProps): IOwnState => ({
  // form props 
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    year: '',
    period: '',
    date: '',
  },

  validationSchema: Yup.object().shape<Partial<IKPIOpenFormValue>>({
    year: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.open.field.year))
      .required(),
      
    period: Yup.string()
    .label(props.intl.formatMessage(kpiMessage.open.field.period))
    .required(),
      
    date: Yup.string()
    .label(props.intl.formatMessage(kpiMessage.open.field.date))
    .required(),
  }),
});

const stateUpdaters: StateUpdaters<KPIOpenFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPIOpenFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPIOpenFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const OpenUid = props.history.location.state.uid;
      const { isLoading } = props.kpiOpenState.detail;

      if (user && OpenUid && !isLoading) {
        props.kpiOpenDispatch.loadDetailRequest({
          openUid: OpenUid
        });
      }
    }
  },
  handleOnSubmit: (props: KPIOpenFormProps) => (values: IKPIOpenFormValue, actions: FormikActions<IKPIOpenFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IKPIOpenPostPayload = {
          year: parseInt(values.year, 10),
          period: parseInt(values.period, 10),
          date: values.date,
        };

        promise = new Promise((resolve, reject) => {
          props.kpiOpenDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // editing 
      if (props.formMode === FormMode.Edit) {
        const openUid = props.history.location.state.uid;

        // must have categoryUid
        if (openUid) {

          // fill payload 
          const payload: IKPIOpenPutPayload = {
            year: parseInt(values.year, 10),
            period: parseInt(values.period, 10),
            date: values.date,
          };

          promise = new Promise((resolve, reject) => {
            props.kpiOpenDispatch.updateRequest({              
              openUid,
              resolve,
              reject,              
              data: payload as IKPIOpenPutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IKPIOpenDetail) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.open.message.createSuccess : kpiMessage.open.message.updateSuccess)
        });

        props.history.push(`/kpi/opens/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.open.message.createFailure : kpiMessage.open.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPIOpenFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPIOpenFormProps) {
    // handle category detail response
    const { response: thisResponse } = this.props.kpiOpenState.detail;
    const { response: prevResponse } = prevProps.kpiOpenState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPIOpenFormValue = {
          uid: thisResponse.data.uid,
          year: thisResponse.data.year.toString(),
          period: thisResponse.data.period.toString(),
          date: thisResponse.data.date,
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const KPIOpenForm = compose<KPIOpenFormProps, IOwnOption>(
  setDisplayName('KPIOpenForm'),
  withUser,
  withRouter,
  withKPIOpen,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPIOpenFormView);
