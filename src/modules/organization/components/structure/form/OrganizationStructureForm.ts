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
import * as Yup from 'yup';

import { withMasterPage, WithMasterPage } from '@layout/hoc/withMasterPage';
import { IPositionGetListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { IOrganizationStructurePostPayload, IOrganizationStructurePutPayload } from '@organization/classes/request/structure';
import { IStructure } from '@organization/classes/response/structure';
import { WithOrganizationStructure, withOrganizationStructure } from '@organization/hoc/withOrganizationStructure';
import { organizationMessage } from '@organization/locales/messages/organizationMessage';
import { OrganizationHierarchyFormView as OrganizationStructureFormView } from './OrganizationStructureFormView';

interface IStructureItemFormValue {
  structureItemUid?: string;
  positionUid: string;
  start: string;
  end: string;
}

export interface IOrganizationStructureFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
  description?: string;
  inactiveDate: string;
  reportTo: IStructureItemFormValue[];
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IOrganizationStructureFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IOrganizationStructureFormValue>>>;

  filterLookupCompany: ILookupCompanyGetListFilter;
  filterLookupPosition: IPositionGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setPositionFilter: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleSetPositionFilter: (companyUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IOrganizationStructureFormValue, actions: FormikActions<IOrganizationStructureFormValue>) => void;
}

export type OrganizationStructureFormProps
  = WithOrganizationStructure
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<OrganizationStructureFormProps, IOwnState> = (props: OrganizationStructureFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    positionUid: '',
    description: '',
    inactiveDate: '',
    reportTo: [{
      structureItemUid: '',
      positionUid: '',
      start: '',
      end: '',
    }],
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IOrganizationStructureFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.structure.field.companyUid))
      .required(),

    positionUid: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.hierarchy.field.positionUid))
      .required(),

    description: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(organizationMessage.structure.field.description)),

    inactiveDate: Yup.string()
      .label(props.intl.formatMessage(organizationMessage.structure.field.inactiveDate)),

    reportTo: Yup.array()
      .of(
        Yup.object().shape({
          positionUid: Yup.string()
            .label(props.intl.formatMessage(organizationMessage.structure.field.positionUid))
            .required(),

          start: Yup.string()
            .label(props.intl.formatMessage(organizationMessage.structure.field.start))
            .required(),

          end: Yup.string()
            .label(props.intl.formatMessage(organizationMessage.structure.field.end)),
        })
      )
      .min(1, props.intl.formatMessage(organizationMessage.structure.field.itemsMinimum))
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterLookupPosition: {
    orderBy: 'name',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<OrganizationStructureFormProps, IOwnState, IOwnStateUpdater> = {
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

const handlerCreators: HandleCreators<OrganizationStructureFormProps, IOwnHandler> = {
  handleSetPositionFilter: (props: OrganizationStructureFormProps) => (companyUid: string) => {
    props.setPositionFilter(companyUid);
  },
  handleOnLoadDetail: (props: OrganizationStructureFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const structureUid = props.history.location.state.structureUid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.organizationStructureState.detail;

      if (companyUid && structureUid && !isLoading) {
        props.organizationStructureDispatch.loadDetailRequest({
          structureUid,
          companyUid,
        });
      }
    }
  },
  handleOnSubmit: (props: OrganizationStructureFormProps) => (values: IOrganizationStructureFormValue, actions: FormikActions<IOrganizationStructureFormValue>) => {
    let promise = new Promise(() => undefined);

    // creating
    if (props.formMode === FormMode.New) {
      // fill payload
      const payload: IOrganizationStructurePostPayload = {
        positionUid: values.positionUid,
        description: values.description,
        inactiveDate: values.inactiveDate,
        reportTo: [],
      };

      // fill items
      values.reportTo.forEach(item => payload.reportTo && payload.reportTo.push({
        positionUid: item.positionUid,
        start: item.start,
        end: item.end,
      }));
      
      // set the promise
      promise = new Promise((resolve, reject) => {
        props.organizationStructureDispatch.createRequest({
          resolve,
          reject,
          companyUid: values.companyUid,
          data: payload
        });
      });
    }

    // editing
    if (props.formMode === FormMode.Edit) {
      const structureUid = props.history.location.state.structureUid;
      const companyUid = props.history.location.state.companyUid;

      // must have expenseUid
      if (structureUid) {
        // fill payload
        const payload: IOrganizationStructurePutPayload = {
          positionUid: values.positionUid,
          description: values.description,
          inactiveDate: values.inactiveDate,
          reportTo: [],
        };
  
        // fill items
        values.reportTo.forEach(item => payload.reportTo && payload.reportTo.push({
          structureItemUid: item.structureItemUid,
          positionUid: item.positionUid,
          start: item.start,
          end: item.end,
        }));

        promise = new Promise((resolve, reject) => {
          props.organizationStructureDispatch.updateRequest({
            structureUid, 
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
      .then((response: IStructure) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.structure.message.createSuccess : organizationMessage.structure.message.updateSuccess, { uid: response.uid })
        });
       
        props.history.push(`/organization/structure/${response.uid}`, {companyUid: values.companyUid});
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? organizationMessage.structure.message.createFailure : organizationMessage.structure.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<OrganizationStructureFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {    
  },
  componentDidUpdate(prevProps: OrganizationStructureFormProps) {
    // handle project detail response
    const { response } = this.props.organizationStructureState.detail;

    if (response !== prevProps.organizationStructureState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: IOrganizationStructureFormValue = {
          uid: response.data.uid,
          companyUid: response.data.companyUid,
          positionUid: response.data.positionUid,
          description: response.data.description || '',
          inactiveDate: response.data.inactiveDate || '',
          reportTo: [],
        };

        // fill items
        if (response.data.reportTo) {
          response.data.reportTo.forEach(item => initialValues.reportTo && initialValues.reportTo.push({
            structureItemUid: item.uid,
            positionUid: item.positionUid,
            start: item.start,
            end: item.end || '',
          }));
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const OrganizationStructureForm = compose<OrganizationStructureFormProps, IOwnOption>(
  setDisplayName('OrganizationStructureForm'),
  withUser,
  withMasterPage,
  withRouter,
  withOrganizationStructure,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(OrganizationStructureFormView);