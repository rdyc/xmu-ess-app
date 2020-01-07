import { IEmployeeEducationPostPayload, IEmployeeEducationPutPayload } from '@account/classes/request/employeeEducation';
import { IEmployeeEducation } from '@account/classes/response/employeeEducation';
import { WithAccountEmployeeEducation, withAccountEmployeeEducation } from '@account/hoc/withAccountEmployeeEducation';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
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
  withStateHandlers,
} from 'recompose';
import * as Yup from 'yup';
import { EducationFormView } from './EducationFormView';

export interface IEducationFormValue {
  uid: string;
  employeeUid: string;
  degreeType: string;
  institution: string;
  major: string;
  start: string;
  end?: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  educationUid: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IEducationFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IEducationFormValue>>>;

  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IEducationFormValue, actions: FormikActions<IEducationFormValue>) => void;
}

export type EducationFormProps
  = WithAccountEmployeeEducation
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

const createProps: mapper<EducationFormProps, IOwnState> = (props: EducationFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    uid: 'Auto Generated',
    degreeType: '',
    institution: '',
    major: '',
    start: '',
    end: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IEducationFormValue>>({
    // information
    degreeType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.education.field.degree))
      .required(),

    institution: Yup.string()
      .label(props.intl.formatMessage(accountMessage.education.field.institution))
      .max(50)
      .required(),

    major: Yup.string()
      .label(props.intl.formatMessage(accountMessage.education.field.major))
      .max(50)
      .required(),

    start: Yup.string()
      .label(props.intl.formatMessage(accountMessage.education.field.start))
      .required(),

    end: Yup.string()
      .label(props.intl.formatMessage(accountMessage.education.field.end))
      .required(),

  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<EducationFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<EducationFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: EducationFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const educationUid = props.history.location.state.educationUid;
      const { isLoading } = props.accountEmployeeEducationState.detail;

      if (user && employeeUid && educationUid && !isLoading) {
        props.accountEmployeeEducationDispatch.loadDetailRequest({
          employeeUid,
          educationUid
        });
      }
    }
  },
  handleOnSubmit: (props: EducationFormProps) => (values: IEducationFormValue, actions: FormikActions<IEducationFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeEducationPostPayload = {
          degreeType: values.degreeType,
          institution: values.institution,
          major: values.major,
          start: Number(values.start),
          end: Number(values.end)
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeEducationDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const educationUid = props.history.location.state.educationUid;

        // must have educationUid
        if (educationUid) {
          const payload: IEmployeeEducationPutPayload = {
            uid: values.uid,
            degreeType: values.degreeType,
            institution: values.institution,
            major: values.major,
            start: Number(values.start),
            end: Number(values.end)
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeEducationDispatch.updateRequest({
              resolve,
              reject,
              employeeUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IEmployeeEducation) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Education' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/education/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<EducationFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: EducationFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeEducationState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeEducationState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IEducationFormValue = {
            uid: thisResponse.data.uid,
            employeeUid: this.props.match.params.employeeUid,
            degreeType: thisResponse.data.degreeType,
            institution: thisResponse.data.institution,
            major: thisResponse.data.major,
            start: thisResponse.data.start.toString(),
            end: thisResponse.data.end ? thisResponse.data.end.toString() : ''
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const EducationForm = compose<EducationFormProps, IOwnOption>(
  setDisplayName('EducationForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeEducation,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(EducationFormView);