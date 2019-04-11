import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectHourPutPayload } from '@project/classes/request/hour';
import { WithProjectHour, withProjectHour } from '@project/hoc/withProjectHour';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { projectHourMessage } from '@project/locales/messages/projectHourMessage';
import { projectMessage } from '@project/locales/messages/projectMessage';
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

import { ProjectHourFormView as ProjectHourFormView } from './ProjectHourFormView';

export interface IProjectHourFormValue {
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

  initialValues: IProjectHourFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectHourFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IProjectHourFormValue, actions: FormikActions<IProjectHourFormValue>) => void;
}

export type ProjectHourFormProps
  = WithProjectRegistration
  & WithProjectHour
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectHourFormProps, IOwnState> = (props: ProjectHourFormProps): IOwnState => ({
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
  validationSchema: Yup.object().shape<Partial<IProjectHourFormValue>>({
    maxHours: Yup.number()
      .label(props.intl.formatMessage(projectMessage.registration.field.maxHours))
      .min(0)
      .required()
  })
});

const stateUpdaters: StateUpdaters<ProjectHourFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<ProjectHourFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ProjectHourFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
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
  handleOnSubmit: (props: ProjectHourFormProps) => (values: IProjectHourFormValue, actions: FormikActions<IProjectHourFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // editing
      if (props.formMode === FormMode.Edit) {
        // must have projectUid
        if (props.projectUid) {
          
          // fill payload
          const payload: IProjectHourPutPayload = {
            hours: values.maxHours
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.projectHourDispatch.updateRequest({
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
          message: props.intl.formatMessage(projectHourMessage.updateSuccess)
        });
       
        // redirect to detail
        props.history.push(`/project/requests/${props.projectUid}`);
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

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(projectHourMessage.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectHourFormProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectHourFormProps) {
    // handle project detail response
    const { response } = this.props.projectRegisterState.detail;

    if (response !== prevProps.projectRegisterState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IProjectHourFormValue = {
          statusType: response.data.status && response.data.status.value || response.data.statusType,
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
      }
    }
  }
};

export const ProjectHourForm = compose<ProjectHourFormProps, IOwnOption>(
  setDisplayName('ProjectHourForm'),
  withUser,
  withRouter,
  withProjectRegistration,
  withProjectHour,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectHourFormView);