import { ISystemListFilter } from '@common/classes/filters';
import { FormMode } from '@generic/types/FormMode';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { WithStyles, withStyles } from '@material-ui/core';
import { IProjectSitePatchPayload } from '@project/classes/request/site';
import { WithProjectRegistration, withProjectRegistration } from '@project/hoc/withProjectRegistration';
import { WithProjectSite, withProjectSite } from '@project/hoc/withProjectSite';
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

import { ProjectSiteFormView } from './ProjectSiteFormView';

interface IProjectSiteItemValue {
  uid?: string;
  name: string;
  value: number;
  siteType: string;
}

export interface IProjectSiteFormValue {
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
  sites: IProjectSiteItemValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;
  projectUid: string;

  initialValues: IProjectSiteFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IProjectSiteFormValue>>>;

  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IProjectSiteFormValue, actions: FormikActions<IProjectSiteFormValue>) => void;
}

export type ProjectSiteFormProps
  = WithProjectRegistration
  & WithProjectSite
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<ProjectSiteFormProps, IOwnState> = (props: ProjectSiteFormProps): IOwnState => ({
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
    maxHours: 0,
    sites: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IProjectSiteFormValue>>({
    sites: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .label(props.intl.formatMessage(projectMessage.site.field.name))
            .max(50)
            .required(),

          siteType: Yup.string()
            .label(props.intl.formatMessage(projectMessage.site.field.siteType))
            .required(),

          value: Yup.number()
            .label(props.intl.formatMessage(projectMessage.site.field.value))
            .min(0)
            .integer()
            .required()
        })
      )
      .min(1, props.intl.formatMessage(projectMessage.site.field.itemsMinimum))
  }),

  // filter props
  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<ProjectSiteFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<ProjectSiteFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: ProjectSiteFormProps) => () => {
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
  handleOnSubmit: (props: ProjectSiteFormProps) => (values: IProjectSiteFormValue, actions: FormikActions<IProjectSiteFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // editing
      if (props.formMode === FormMode.Edit) {
        // must have projectUid
        if (props.projectUid) {
          
          // fill payload
          const payload: IProjectSitePatchPayload = {
            sites: []
          };

          // fill sites payload
          values.sites.forEach(item => payload.sites.push({
            uid: item.uid,
            siteType: item.siteType,
            name: item.name,
            value: item.value
          }));

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.projectSiteDispatch.patchRequest({
              resolve, 
              reject,
              companyUid: user.company.uid,
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
          message: props.intl.formatMessage(projectMessage.site.message.patchSuccess)
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
          message: props.intl.formatMessage(projectHourMessage.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<ProjectSiteFormProps, IOwnState> = {
  componentDidUpdate(prevProps: ProjectSiteFormProps) {
    // handle project detail response
    const { response } = this.props.projectRegisterState.detail;

    if (response !== prevProps.projectRegisterState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IProjectSiteFormValue = {
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
          maxHours: response.data.maxHours,
          sites: []
        };

        // fill sites
        response.data.sites.forEach(item => {
          initialValues.sites.push({
            uid: item.uid,
            siteType: item.siteType || '',
            name: item.name,
            value: item.value
          });
        });

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const ProjectSiteForm = compose<ProjectSiteFormProps, IOwnOption>(
  setDisplayName('ProjectSiteForm'),
  withUser,
  withRouter,
  withProjectRegistration,
  withProjectSite,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(ProjectSiteFormView);