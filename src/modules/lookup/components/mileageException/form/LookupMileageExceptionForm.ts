import { ISystemListFilter } from '@common/classes/filters';
import { WorkflowStatusType } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { IMileageExceptionPostPayload } from '@lookup/classes/request/mileageException/IMileageExceptionPostPayload';
import { IMileageExceptionPutPayload } from '@lookup/classes/request/mileageException/IMileageExceptionPutPayload';
import { IMileageException } from '@lookup/classes/response';
import { WithLookupMileageException, withLookupMileageException } from '@lookup/hoc/withLookupMileageException';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
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
import { LookupMileageExceptionFormView } from './LookupMileageExceptionFormView';

export interface IMileageExceptionFormValue {
  uid: string;
  companyUid: string;
  roleUid: string;
  siteType: string;
  projectUid: string;
  siteUid: string;
  percentage: number;
  description?: string;
  reason?: string;
  inactiveDate?: string;
}

interface IOwnRouteParams {
  mileageExceptionUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IMileageExceptionFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IMileageExceptionFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IMileageExceptionFormValue, actions: FormikActions<IMileageExceptionFormValue>) => void;
}

export type MileageExceptionFormProps
  = WithLookupMileageException
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

const createProps: mapper<MileageExceptionFormProps, IOwnState> = (props: MileageExceptionFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    roleUid: '',
    siteType: '',
    projectUid: '',
    siteUid: '',
    percentage: 0,
    description: '',
    reason: '',
    inactiveDate: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IMileageExceptionFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.company))
      .required(),

    roleUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.role))
      .required(),

    siteType: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.site))
      .required(),

    projectUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.projectUid))
      .required(),

    siteUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.projectSite))
      .required(),

    percentage: Yup.number()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.percentage))
      .integer()
      .min(1)
      .required(),

    description: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.description))
      .max(200),
    
    reason: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.reason))
      .max(100),

    inactiveDate: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.mileageException.field.inActiveDate))
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },

  filterProject: {
    activeOnly: true,
    statusTypes: WorkflowStatusType.Approved
  }
});

const stateUpdaters: StateUpdaters<MileageExceptionFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<MileageExceptionFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: MileageExceptionFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const mileageExceptionUid = props.history.location.state.uid;
      const { isLoading } = props.mileageExceptionState.detail;

      if (user && mileageExceptionUid && !isLoading) {
        props.mileageExceptionDispatch.loadDetailRequest({
          mileageExceptionUid
        });
      }
    }
  },
  handleOnSubmit: (props: MileageExceptionFormProps) => (values: IMileageExceptionFormValue, actions: FormikActions<IMileageExceptionFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IMileageExceptionPostPayload = {
          roleUid: values.roleUid,
          siteType: values.siteType,
          projectUid: values.projectUid,
          siteUid: values.siteUid,
          percentage: values.percentage,
          description: values.description || '',
          reason: values.reason || '',
          inactiveDate: values.inactiveDate || ''
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.mileageExceptionDispatch.createRequest({
            resolve,
            reject,
            data: payload as IMileageExceptionPostPayload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const mileageExceptionUid = props.history.location.state.uid;

        // must have mileageExceptionUid
        if (mileageExceptionUid) {

          const payload: IMileageExceptionPutPayload = {
            roleUid: values.roleUid,
            siteType: values.siteType,
            projectUid: values.projectUid,
            siteUid: values.siteUid,
            percentage: values.percentage,
            description: values.description || '',
            reason: values.reason || '',
            inactiveDate: values.inactiveDate || ''
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.mileageExceptionDispatch.updateRequest({
              mileageExceptionUid,
              resolve,
              reject,
              data: payload as IMileageExceptionPutPayload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IMileageException) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.mileageException.message.createSuccess : lookupMessage.mileageException.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/mileageexceptions/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.mileageException.message.createFailure : lookupMessage.mileageException.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<MileageExceptionFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: MileageExceptionFormProps) {
    const { response: thisResponse } = this.props.mileageExceptionState.detail;
    const { response: prevResponse } = prevProps.mileageExceptionState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IMileageExceptionFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.role.companyUid,
          roleUid: thisResponse.data.roleUid,
          siteType: thisResponse.data.siteType || '',
          projectUid: thisResponse.data.projectUid || '',
          siteUid: thisResponse.data.siteUid || '',
          percentage: thisResponse.data.percentage,
          description: thisResponse.data.description || '',
          reason: thisResponse.data.reason || '',
          inactiveDate: thisResponse.data.inactiveDate || ''
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LookupMileageExceptionForm = compose<MileageExceptionFormProps, IOwnOption>(
  setDisplayName('LookupMileageExceptionForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupMileageException,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupMileageExceptionFormView);
