import { IEmployeeFamilyPostPayload, IEmployeeFamilyPutPayload } from '@account/classes/request/employeeFamily';
import { IEmployeeFamily } from '@account/classes/response/employeeFamily';
import { WithAccountEmployeeFamily, withAccountEmployeeFamily } from '@account/hoc/withAccountEmployeeFamily';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { FamilyFormView } from './FamilyFormView';

export interface IFamilyFormValue {
  uid: string;
  employeeUid: string;
  familyType: string;
  fullName: string;
  genderType: string;
  birthPlace: string;
  birthDate?: string;
}

interface IOwnRouteParams {
  employeeUid: string;
  familyUid: string;  
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IFamilyFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IFamilyFormValue>>>;

  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IFamilyFormValue, actions: FormikActions<IFamilyFormValue>) => void;
}

export type FamilyFormProps
  = WithAccountEmployeeFamily
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

const createProps: mapper<FamilyFormProps, IOwnState> = (props: FamilyFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    // information
    employeeUid: props.match.params.employeeUid,
    uid: 'Auto Generated',
    familyType: '',
    fullName: '',
    genderType: '',
    birthPlace: '',
    birthDate: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IFamilyFormValue>>({
    // information
    familyType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.family.field.familyType))
      .required(),

    fullName: Yup.string()
      .label(props.intl.formatMessage(accountMessage.family.field.fullName))
      .required(),

    genderType: Yup.string()
      .label(props.intl.formatMessage(accountMessage.family.field.genderType))
      .required(),

    birthPlace: Yup.string()
      .label(props.intl.formatMessage(accountMessage.family.field.birthPlace))
      .required(),

    birthDate: Yup.string()
      .label(props.intl.formatMessage(accountMessage.family.field.birthDate)),

  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<FamilyFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<FamilyFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: FamilyFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const employeeUid = props.match.params.employeeUid;
      const familyUid = props.history.location.state.familyUid;
      const { isLoading } = props.accountEmployeeFamilyState.detail;

      if (user && employeeUid && familyUid && !isLoading) {
        props.accountEmployeeFamilyDispatch.loadDetailRequest({
          employeeUid,
          familyUid
        });
      }
    }
  },
  handleOnSubmit: (props: FamilyFormProps) => (values: IFamilyFormValue, actions: FormikActions<IFamilyFormValue>) => {
    const { user } = props.userState;
    const employeeUid = props.match.params.employeeUid;
    let promise = new Promise((resolve, reject) => undefined);

    if (user && employeeUid) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IEmployeeFamilyPostPayload = {
          familyType: values.familyType,
          fullName: values.fullName,
          genderType: values.genderType,
          birthPlace: values.birthPlace,
          birthDate: values.birthDate || ''
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.accountEmployeeFamilyDispatch.createRequest({
            resolve,
            reject,
            employeeUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const familyUid = props.history.location.state.familyUid;

        // must have familyUid
        if (familyUid) {
          const payload: IEmployeeFamilyPutPayload = {
            uid: values.uid,
            familyType: values.familyType,
            fullName: values.fullName,
            genderType: values.genderType,
            birthPlace: values.birthPlace,
            birthDate: values.birthDate || ''
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.accountEmployeeFamilyDispatch.updateRequest({
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
      .then((response: IEmployeeFamily) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createSuccess : accountMessage.shared.message.updateSuccess, { uid: response.uid, state: 'Family' })
        });

        // redirect to detail
        props.history.push(`/account/employee/${employeeUid}/family/${response.uid}`);
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);
        // console.log(error);

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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? accountMessage.shared.message.createFailure : accountMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<FamilyFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: FamilyFormProps) {
    const { response: thisResponse } = this.props.accountEmployeeFamilyState.detail;
    const { response: prevResponse } = prevProps.accountEmployeeFamilyState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IFamilyFormValue = {
            uid: thisResponse.data.uid,
            employeeUid: this.props.match.params.employeeUid,
            familyType: thisResponse.data.familyType,
            fullName: thisResponse.data.fullName,
            genderType: thisResponse.data.genderType,
            birthPlace: thisResponse.data.birthPlace,
            birthDate: thisResponse.data.birthDate || ''
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const FamilyForm = compose<FamilyFormProps, IOwnOption>(
  setDisplayName('FamilyForm'),
  withUser,
  withMasterPage,
  withRouter,
  withAccountEmployeeFamily,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(FamilyFormView);