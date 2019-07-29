import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IKPIMeasurementGetListFilter } from '@KPI/classes/filter/measurement';
import { IKPITemplatePostPayload, IKPITemplatePutPayload } from '@KPI/classes/request';
import { IKPITemplate } from '@KPI/classes/response';
import { WithKPITemplate, withKPITemplate } from '@KPI/hoc/withKPITemplate';
import { KPIMessage } from '@KPI/locales/messages/KPIMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { FormikActions } from 'formik';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, witKPIouter } from 'react-router';
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
  measurementUid: string;
  categoryType: string;
  target: string;
  weight: number;
}

export interface IKPITemplateFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
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

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterMeasurement: IKPIMeasurementGetListFilter;
  filterCommonSystem: ISystemListFilter;
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
    items: [{
      uid: '',
      measurementUid: '',
      categoryType: '',
      target: '',
      weight: 0
    }]
  },

  validationSchema: Yup.object().shape<Partial<IKPITemplateFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(KPIMessage.template.field.company))
      .required(),

    positionUid: Yup.string()
      .label(props.intl.formatMessage(KPIMessage.template.field.position))
      .required(),

    items: Yup.array()
      .of(
        Yup.object().shape({
          measurementUid: Yup.string()
            .label(props.intl.formatMessage(KPIMessage.template.field.measurementUid))
            .required(),

          categoryType: Yup.string()
            .label(props.intl.formatMessage(KPIMessage.template.field.category))
            .required(),

          target: Yup.string()
            .label(props.intl.formatMessage(KPIMessage.template.field.target))
            .required(),

          weight: Yup.number()
            .label(props.intl.formatMessage(KPIMessage.template.field.weight))
            .integer()
            .min(0)
            .required(),
        })
      )
      .min(1, props.intl.formatMessage(KPIMessage.template.field.itemsMinimum))
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  },
  filterMeasurement: {
    orderBy: 'measurementType',
    direction: 'ascending'
  }
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
      const templateUid = props.history.location.state.uid;
      const { isLoading } = props.KPITemplateState.detail;

      if (user && templateUid && !isLoading) {
        props.KPITemplateDispatch.loadDetailRequest({
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
          items: []
        };

        // fill payload items
        values.items.forEach(item => payload.items.push({
          measurementUid: item.measurementUid,
          categoryType: item.categoryType,
          target: item.target,
          weight: item.weight
        }));

        promise = new Promise((resolve, reject) => {
          props.KPITemplateDispatch.createRequest({
            resolve,
            reject,
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
            items: []
          };

          // fill payload items
          values.items.forEach(item => payload.items.push({
            uid: item.uid,
            measurementUid: item.measurementUid,
            categoryType: item.categoryType,
            target: item.target,
            weight: item.weight
          }));

          promise = new Promise((resolve, reject) => {
            props.KPITemplateDispatch.updateRequest({
              templateUid,
              resolve,
              reject,
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.template.message.createSuccess : KPIMessage.template.message.updateSuccess, { uid: response.uid })
        });

        props.history.push(`/kpi/templates/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? KPIMessage.template.message.createFailure : KPIMessage.template.message.updateFailure)
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
    const { response: thisResponse } = this.props.KPITemplateState.detail;
    const { response: prevResponse } = prevProps.KPITemplateState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IKPITemplateFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          positionUid: thisResponse.data.positionUid,
          items: []
        };

        if (thisResponse.data.items) {
          // fill template items
          thisResponse.data.items.forEach(item =>
            initialValues.items.push({
              uid: item.uid,
              measurementUid: item.measurementUid,
              categoryType: item.categoryType,
              target: item.target,
              weight: item.weight
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
  witKPIouter,
  withKPITemplate,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(KPITemplateFormView);
