import { ISystemListFilter } from '@common/classes/filters';
import { FormMode } from '@generic/types/FormMode';
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

import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { IOrganizationHierarchyPostPayload, IOrganizationHierarchyPutPayload } from '@organization/classes/request/hierarchy';
import { WithOrganizationHierarchy, withOrganizationHierarchy } from '@organization/hoc/withOrganizationHierarchy';
import { IOrganizationHierarchy } from '@organization/interfaces';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { OrganizationHierarchyFormView as OrganizationHierarchyFormView } from './OrganizationHierarchyFormView';

interface IHierarchyItemFormValue {
  uid?: string;
  sequence: number;
  positionUid: string;
  relationType: string;
}

export interface IOrganizationHierarchyFormValue {
  uid: string;
  companyUid: string;
  companyName: string;
  name: string;
  description?: string;
  inactiveDate: string;
  items: IHierarchyItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IOrganizationHierarchyFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IOrganizationHierarchyFormValue>>>;

  filterLookupCompany: ILookupCompanyGetListFilter;
  filterCommonSystem: ISystemListFilter;
  filterLookupPosition: IPositionGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setPositionFilter: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetPositionFilter: (companyUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IOrganizationHierarchyFormValue, actions: FormikActions<IOrganizationHierarchyFormValue>) => void;
}

export type OrganizationHierarchyFormProps
  = WithOrganizationHierarchy
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<OrganizationHierarchyFormProps, IOwnState> = (props: OrganizationHierarchyFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    companyName: '',
    name: '',
    description: '',
    inactiveDate: '',
    items: [{
      uid: '',
      sequence: 1,
      positionUid: '',
      relationType: '',
    }],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IOrganizationHierarchyFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.hierarchy.field.companyUid))
      .required(),

    companyName: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.hierarchy.field.companyUid)),

    name: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(organizationMessage.hierarchy.field.name))
      .required(),

    description: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(organizationMessage.hierarchy.field.description)),

    inactiveDate: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.hierarchy.field.inactiveDate)),

    items: Yup.array()
      .of(
        Yup.object().shape({
          sequence: Yup.number()
            .min(1)
            .max(99)
            .label(props.intl.formatMessage(organizationMessage.hierarchy.field.sequence))
            .required(),

          positionUid: Yup.string()
            .label(props.intl.formatMessage(organizationMessage.hierarchy.field.positionUid))
            .required(),

          relationType: Yup.string()
            .label(props.intl.formatMessage(organizationMessage.hierarchy.field.relationType)),
        })
      )
      .min(1, props.intl.formatMessage(organizationMessage.hierarchy.field.itemsMinimum))
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
  filterLookupPosition: {
    orderBy: 'name',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<OrganizationHierarchyFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setPositionFilter: () => (companyUid: string): Partial<IOwnState> => ({
    filterLookupPosition: {
      companyUid,
      orderBy: 'name',
      direction: 'ascending'
    },
  }),
};

const handlerCreators: HandleCreators<OrganizationHierarchyFormProps, IOwnHandler> = {
  handleSetPositionFilter: (props: OrganizationHierarchyFormProps) => (companyUid: string) => {
    props.setPositionFilter(companyUid);
  },
  handleOnLoadDetail: (props: OrganizationHierarchyFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const hierarchyUid = props.history.location.state.hierarchyUid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.organizationHierarchyState.detail;

      if (companyUid && hierarchyUid && !isLoading) {
        props.organizationHierarchyDispatch.loadDetailRequest({
          hierarchyUid,
          companyUid,
        });
      }
    }
  },
  handleOnSubmit: (props: OrganizationHierarchyFormProps) => (values: IOrganizationHierarchyFormValue, actions: FormikActions<IOrganizationHierarchyFormValue>) => {
    let promise = new Promise(() => undefined);

    // creating
    if (props.formMode === FormMode.New) {
      // fill payload
      const payload: IOrganizationHierarchyPostPayload = {
        name: values.name,
        description: values.description,
        inactiveDate: values.inactiveDate,
        items: [],
      };

      // fill items
      values.items.forEach(item => payload.items && payload.items.push({
        sequence: item.sequence,
        positionUid: item.positionUid,
        relationType: item.relationType !== '' ? item.relationType : null,
      }));
      
      // set the promise
      promise = new Promise((resolve, reject) => {
        props.organizationHierarchyDispatch.createRequest({
          resolve,
          reject,
          companyUid: values.companyUid,
          data: payload
        });
      });
    }

    // editing
    if (props.formMode === FormMode.Edit) {
      const hierarchyUid = props.history.location.state.hierarchyUid;
      const companyUid = props.history.location.state.companyUid;

      // must have expenseUid
      if (hierarchyUid) {
        // fill payload
        const payload: IOrganizationHierarchyPutPayload = {
          name: values.name,
          description: values.description,
          inactiveDate: values.inactiveDate,
          items: [],
        };
  
        // fill items
        values.items.forEach(item => payload.items && payload.items.push({
          itemUid: item.uid,
          sequence: item.sequence,
          positionUid: item.positionUid,
          relationType: item.relationType !== '' ? item.relationType : null,
        }));

        promise = new Promise((resolve, reject) => {
          props.organizationHierarchyDispatch.updateRequest({
            hierarchyUid, 
            companyUid,
            resolve, 
            reject,
            data: payload, 
          });
        });
      }
    }

    // handling promise
    promise
      .then((response: IOrganizationHierarchy) => {
        console.log(response);
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.hierarchy.message.createSuccess : organizationMessage.hierarchy.message.updateSuccess, { uid: response.uid })
        });
       
        props.history.push(`/organization/hierarchy/${response.uid}`, {companyUid: values.companyUid});
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.hierarchy.message.createFailure : organizationMessage.hierarchy.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<OrganizationHierarchyFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {    
  },
  componentDidUpdate(prevProps: OrganizationHierarchyFormProps) {
    // handle project detail response
    const { response } = this.props.organizationHierarchyState.detail;

    if (response !== prevProps.organizationHierarchyState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IOrganizationHierarchyFormValue = {
          uid: response.data.uid,
          companyUid: response.data.companyUid,
          companyName: response.data.company && response.data.company.name || 'N/A',
          name: response.data.name,
          description: response.data.description || '',
          inactiveDate: response.data.inactiveDate || '',
          items: [],
        };

        // fill items
        if (response.data.items) {
          response.data.items.forEach(item => initialValues.items && initialValues.items.push({
            uid: item.uid,
            sequence: item.level,
            positionUid: item.positionUid,
            relationType: item.relationType || '',
          }));
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const OrganizationHierarchyForm = compose<OrganizationHierarchyFormProps, IOwnOption>(
  setDisplayName('OrganizationHierarchyForm'),
  withUser,
  withMasterPage,
  withRouter,
  withOrganizationHierarchy,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(OrganizationHierarchyFormView);