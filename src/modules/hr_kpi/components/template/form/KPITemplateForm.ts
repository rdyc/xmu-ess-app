import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { IKPITemplatePostPayload, IKPITemplatePutPayload } from '@kpi/classes/request';
import { IKPITemplate } from '@kpi/classes/response';
import { WithKPITemplate, withKPITemplate } from '@kpi/hoc/withKPITemplate';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
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
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { KPITemplateFormView } from './KPITemplateFormView';

interface IKPITemplateItemFormValue {
  uid?: string;
  isOpen: boolean;
  categoryUid: string;
  categoryValue: string;
  categoryName: string;
  measurementUid: string;
  measurementValue: string;
  measurementType: string;
  target: string;
  weight: number;
  threshold?: number;
  amount: number;
}

export interface IKPITemplateFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
  name: string;
  note: string;
  totalWeight: number;
  items: IKPITemplateItemFormValue[];
}

interface IOwnRouteParams {
  templateUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IKPITemplateFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IKPITemplateFormValue>>>;

  filterLookupCompany: ILookupCompanyGetListFilter;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // handleSetPositionFilter: (companyUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IKPITemplateFormValue, action: FormikActions<IKPITemplateFormValue>) => void;
}

export type KPITemplateFormProps
  = WithKPITemplate
  & WithCommonSystem
  & WithUser
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & WithWidth
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<KPITemplateFormProps, IOwnState> = (props: KPITemplateFormProps): IOwnState => ({
  // form props 
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    positionUid: '',
    name: '',
    note: '',
    totalWeight: 0,
    items: []
  },

  validationSchema: Yup.object().shape<Partial<IKPITemplateFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.template.field.companyUid))
      .required(),

    positionUid: Yup.string()
      .label(props.intl.formatMessage(kpiMessage.template.field.positionUid))
      .required(),

    name: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(kpiMessage.template.field.name))
      .required(),

    totalWeight: Yup.number()
      .min(100)
      .max(100)
      .label(props.intl.formatMessage(kpiMessage.template.field.totalWeight)),

    items: Yup.array()
      .of(
        Yup.object().shape({
          categoryUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.template.field.categoryUid))
            .required(),

          isOpen: Yup.boolean(),

          categoryValue: Yup.string(),
            
          categoryName: Yup.string()
          .max(100)
          .label(props.intl.formatMessage(kpiMessage.template.field.categoryName))
          .required(),

          measurementUid: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.template.field.measurementUid))
            .required(),

          measurementValue: Yup.string(),

          measurementType: Yup.string(),

          target: Yup.string()
            .label(props.intl.formatMessage(kpiMessage.template.field.target))
            .required(),

          weight: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.template.field.weight))
            .integer()
            .min(0)
            .required(),

          threshold: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.template.field.threshold))
            .integer(),

          amount: Yup.number()
            .label(props.intl.formatMessage(kpiMessage.template.field.amount))
            .integer()
            .min(0)
            .required(),
        })
      )
      .min(1, props.intl.formatMessage(kpiMessage.template.field.itemsMinimum))
  }),

  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterKPICategory: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterKPIMeasurement: {
    orderBy: 'description',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<KPITemplateFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<KPITemplateFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: KPITemplateFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const companyUid = props.history.location.state.companyUid;
      const positionUid = props.history.location.state.positionUid;
      const templateUid = props.history.location.state.uid;
      const { isLoading } = props.kpiTemplateState.detail;

      if (user && templateUid && !isLoading) {
        props.kpiTemplateDispatch.loadDetailRequest({
          companyUid,
          positionUid,
          templateUid
        });
      }
    }
  },
  handleOnSubmit: (props: KPITemplateFormProps) => (values: IKPITemplateFormValue, actions: FormikActions<IKPITemplateFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IKPITemplatePostPayload = {
          companyUid: values.companyUid,
          positionUid: values.positionUid,
          name: values.name,
          note: values.note,
          items: []
        };

        // fill payload items
        values.items.forEach(item => payload.items.push({
          uid: item.uid,
          categoryUid: item.categoryUid,
          categoryName: item.categoryName,
          measurementUid: item.measurementUid,
          target: item.target,
          weight: item.weight,
          threshold: item.threshold,
          amount: item.amount,
        }));

        promise = new Promise((resolve, reject) => {
          props.kpiTemplateDispatch.createRequest({
            resolve,
            reject,
            companyUid: payload.companyUid,
            positionUid: payload.positionUid,
            data: payload
          });
        });
      }

      // editing 
      if (props.formMode === FormMode.Edit) {
        const templateUid = props.history.location.state.uid;

        // must have templateUid
        if (templateUid) {

          // fill payload 
          const payload: IKPITemplatePutPayload = {
            companyUid: values.companyUid,
            positionUid: values.positionUid,
            name: values.name,
            note: values.note,
            items: []
          };

          // fill payload items
          values.items.forEach(item => payload.items.push({
            uid: item.uid,
            categoryUid: item.categoryUid,
            categoryName: item.categoryName,
            measurementUid: item.measurementUid,
            target: item.target,
            weight: item.weight,
            threshold: item.threshold,
            amount: item.amount,
          }));

          promise = new Promise((resolve, reject) => {
            props.kpiTemplateDispatch.updateRequest({
              templateUid,
              resolve,
              reject,
              companyUid: payload.companyUid,
              positionUid: payload.positionUid,
              data: payload as IKPITemplatePutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IKPITemplate) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.template.message.createSuccess : kpiMessage.template.message.updateSuccess)
        });

        props.history.push(`/kpi/templates/${response.uid}`, {companyUid: response.companyUid, positionUid: response.positionUid});
      })
      .catch((error: IValidationErrorResponse) => {
        // set submitting status
        actions.setSubmitting(false);

        // set form status
        actions.setStatus(error);

        // error on form fields
        if (error.errors) {
          error.errors.forEach(item =>
            actions.setFieldError(item.field, props.intl.formatMessage({ id: item.message }))
          );
        }

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? kpiMessage.template.message.createFailure : kpiMessage.template.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<KPITemplateFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: KPITemplateFormProps) {
    // handle template detail response
    const { response: thisResponse } = this.props.kpiTemplateState.detail;
    const { response: prevResponse } = prevProps.kpiTemplateState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPITemplateFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          positionUid: thisResponse.data.positionUid,
          name: thisResponse.data.name,
          note: thisResponse.data.note || '',
          totalWeight: thisResponse.data.items && thisResponse.data.items.reduce((a, b) => a + b.weight, 0) || 0,
          items: []
        };

        if (thisResponse.data.items) {
          // fill template items
          thisResponse.data.items.forEach(item =>
            initialValues.items.push({
              uid: item.uid,
              isOpen: false,
              categoryUid: item.categoryUid,
              categoryValue: item.category && item.category.name || '',
              categoryName: item.categoryName,
              measurementUid: item.measurementUid,
              measurementValue: item.measurement && item.measurement.description || '',
              measurementType: item.measurement && item.measurement.measurementType || '',
              target: item.target,
              weight: item.weight,
              threshold: item.threshold || 0,
              amount: item.amount,
            })
          );
        }

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const KPITemplateForm = compose<KPITemplateFormProps, IOwnOption>(
  setDisplayName('KPITemplateForm'),
  withUser,
  withRouter,
  withKPITemplate,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withWidth(),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPITemplateFormView);
