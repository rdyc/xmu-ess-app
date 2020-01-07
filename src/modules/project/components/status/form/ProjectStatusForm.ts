import { ISystemListFilter } from '@common/classes/filters';
import { WorkflowStatusType } from '@common/classes/types';
import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectStatusPutPayload } from '@project/classes/request/status';
import { WithAllowedStatusType, withAllowedStatusType } from '@project/hoc/withAllowedStatusType';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectStatus, withProjectStatus } from '@project/hoc/withProjectStatus';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { projectStatusMessage } from '@project/locales/messages/projectStatusMessage';
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

import { ProjectStatusFormView } from './ProjectStatusFormView';

export interface IProjectStatusFormValue {
  statusType: string;
  projectUid: string;
  childProjectUid?: string;
  ownerEmployeeUid: string;
  customerUid: string;
  projectType: string;
  contractNumber?: string;
  name: string;
  description?: string;
  start: string;
  end: string;
  currencyType: string;
  rate: number;
  valueUsd: number;
  valueIdr: number;
  maxHours: number;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  projectUid: string;
  statusTypes?: string[];

  initialValues: IProjectStatusFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectStatusFormValue>>>;

  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setAllowedStatusTypes: StateHandler<IOwnState>;
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IProjectStatusFormValue, actions: FormikActions<IProjectStatusFormValue>) => void;
}

export type ProjectStatusFormProps
  = WithProjectRegistration
  & WithProjectStatus
  & WithAllowedStatusType
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectStatusFormProps, IOwnState> = (props: ProjectStatusFormProps): IOwnState => ({
  // form props
  formMode: FormMode.Edit,
  projectUid: props.history.location.state.uid,

  // form values
  initialValues: {
    statusType: '',
    projectUid: '',
    ownerEmployeeUid: '',
    customerUid: '',
    projectType: '',
    contractNumber: '',
    name: '',
    description: '',
    start: '',
    end: '',
    currencyType: '',
    rate: 0,
    valueUsd: 0,
    valueIdr: 0,
    maxHours: 0
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IProjectStatusFormValue>>({
    statusType: Yup.string()
      .label(props.intl.formatMessage(projectMessage.registration.field.statusType))
      .required()
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<ProjectStatusFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setAllowedStatusTypes: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    statusTypes: values
  })
};

const handlerCreators: HandleCreators<ProjectStatusFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ProjectStatusFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const { isLoading } = props.projectRegisterState.detail;

      if (user && props.projectUid && !isLoading) {
        props.projectRegisterDispatch.loadDetailRequest({
          projectUid: props.projectUid,
          companyUid: user.company.uid,
          positionUid: user.position.uid
        });
      }
    }
  },
  handleOnSubmit: (props: ProjectStatusFormProps) => (values: IProjectStatusFormValue, actions: FormikActions<IProjectStatusFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // editing
      if (props.formMode === FormMode.Edit) {
        // must have projectUid
        if (props.projectUid) {
          
          // fill payload
          const payload: IProjectStatusPutPayload = {
            statusType: values.statusType
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.projectStatusDispatch.updateRequest({
              resolve, 
              reject,
              companyUid: user.company.uid,
              positionUid: user.position.uid,
              projectUid: props.projectUid, 
              data: payload, 
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: boolean) => {
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();
        
        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(projectStatusMessage.updateSuccess, {
            status: values.statusType === WorkflowStatusType.Closed ? 'closed' : 're-opened'
          })
        });
       
        // redirect to detail
        props.history.push(`/project/requests/${props.projectUid}`);
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
          message: props.intl.formatMessage(projectStatusMessage.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectStatusFormProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectStatusFormProps) {
    // handle project detail response
    const { response } = this.props.projectRegisterState.detail;

    if (response !== prevProps.projectRegisterState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IProjectStatusFormValue = {
          statusType: response.data.statusType,
          projectUid: response.data.uid,
          childProjectUid: response.data.childProjectUid,
          ownerEmployeeUid: response.data.owner && response.data.owner.fullName || response.data.ownerEmployeeUid,
          customerUid: response.data.customer && response.data.customer.name || response.data.customerUid,
          projectType: response.data.project && response.data.project.value || response.data.projectType,
          contractNumber: response.data.contractNumber || 'N/A',
          name: response.data.name,
          description: response.data.description || 'N/A',
          start: response.data.start,
          end: response.data.end,
          currencyType: response.data.currency && response.data.currency.value || response.data.currencyType,
          rate: response.data.rate,
          valueUsd: response.data.valueUsd,
          valueIdr: response.data.valueIdr,
          maxHours: response.data.maxHours
        };

        // set initial values
        this.props.setInitialValues(initialValues);

        // set allowed status types
        this.props.setAllowedStatusTypes(this.props.allowedStatusTypes(response.data.statusType));
      }
    }
  }
};

export const ProjectStatusForm = compose<ProjectStatusFormProps, IOwnOption>(
  setDisplayName('ProjectStatusForm'),
  withUser,
  withRouter,
  withProjectRegistration,
  withProjectStatus,
  withAllowedStatusType,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectStatusFormView);