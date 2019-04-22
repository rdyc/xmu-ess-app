import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyPostPayload, ILookupCompanyPutPayload } from '@lookup/classes/request/company';
import { ICompany } from '@lookup/classes/response';
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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { LookupCompanyFormView } from './LookupCompanyFormView';

export interface ICompanyFormValue {
  uid: string;
  code: string;
  name: string;
}

interface IOwnRouteParams {
  companyUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICompanyFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompanyFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICompanyFormValue, actions: FormikActions<ICompanyFormValue>) => void;
}

export type CompanyFormProps
  = WithLookupCompany
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

const createProps: mapper<CompanyFormProps, IOwnState> = (props: CompanyFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    code: '',
    name: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICompanyFormValue>>({
    code: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.company.field.code))
      .min(3)
      .max(3)
      .required(),

    name: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.company.field.name))
      .max(100)
      .required(),
  })
});

const stateUpdaters: StateUpdaters<CompanyFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<CompanyFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: CompanyFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const companyUid = props.history.location.state.uid;
      const { isLoading } = props.lookupCompanyState.detail;

      if (user && companyUid && !isLoading) {
        props.lookupCompanyDispatch.loadDetailRequest({
          companyUid
        });
      }
    }
  },
  handleOnSubmit: (props: CompanyFormProps) => (values: ICompanyFormValue, actions: FormikActions<ICompanyFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ILookupCompanyPostPayload = {
          code: values.code,
          name: values.name
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupCompanyDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const companyUid = props.history.location.state.uid;

        // must have companyUid
        if (companyUid) {
          const payload: ILookupCompanyPutPayload = {
            code: values.code,
            name: values.name
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupCompanyDispatch.updateRequest({
              companyUid,
              resolve,
              reject,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ICompany) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.company.message.createSuccess : lookupMessage.company.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/company/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.company.message.createFailure : lookupMessage.company.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompanyFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: CompanyFormProps) {
    const { response: thisResponse } = this.props.lookupCompanyState.detail;
    const { response: prevResponse } = prevProps.lookupCompanyState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ICompanyFormValue = {
          uid: thisResponse.data.uid,
          code: thisResponse.data.code,
          name: thisResponse.data.name
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LookupCompanyForm = compose<CompanyFormProps, IOwnOption>(
  setDisplayName('LookupCompanyForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupCompany,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupCompanyFormView);