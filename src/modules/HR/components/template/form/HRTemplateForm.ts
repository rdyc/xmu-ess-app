import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { IHRTemplatePostPayload, IHRTemplatePutPayload } from '@hr/classes/request';
import { IHRTemplate } from '@hr/classes/response';
// import { IPositionGetListFilter } from '@lookup/classes/filters';
import { WithHRTemplate, withHRTemplate } from '@hr/hoc/withHRTemplate';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
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
  withStateHandlers
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';
import { HRTemplateFormView } from './HRTemplateFormView';

interface IHRTemplateItemFormValue {
  uid?: string;
  measurementUid: string;
  categoryType: string;
  target: string;
  weight: number;
}

export interface IHRTemplateFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
  items: IHRTemplateItemFormValue[];
}

interface IOwnRouteParams {
  templateUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: IHRTemplateFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IHRTemplateFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  // filterLookupPosition: IPositionGetListFilter;
  filterCommonSystem: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
}

interface IOwnHandler {
  // handleSetPositionFilter: (companyUid: string) => void;
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IHRTemplateFormValue, action: FormikActions<IHRTemplateFormValue>) => void;
}

export type HRTemplateFormProps
  = WithHRTemplate
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

const createProps: mapper<HRTemplateFormProps, IOwnState> = (props: HRTemplateFormProps): IOwnState => ({
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

  validationSchema: Yup.object().shape<Partial<IHRTemplateFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.template.field.company))
      .required(),

    positionUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.template.field.position))
      .required(),

    items: Yup.array()
      .of(
        Yup.object().shape({
          measurementUid: Yup.string()
            .label(props.intl.formatMessage(hrMessage.template.field.measurementUid))
            .required(),

          categoryType: Yup.string()
            .label(props.intl.formatMessage(hrMessage.template.field.category))
            .required(),

          target: Yup.string()
            .label(props.intl.formatMessage(hrMessage.template.field.target))
            .required(),

          weight: Yup.number()
            .label(props.intl.formatMessage(hrMessage.template.field.weight))
            .integer()
            .min(0)
            .required(),
        })
      )
      .min(1, props.intl.formatMessage(hrMessage.template.field.itemsMinimum))
  }),

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<HRTemplateFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
};

const handleCreators: HandleCreators<HRTemplateFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HRTemplateFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const templateUid = props.history.location.state.uid;
      const { isLoading } = props.hrTemplateState.detail;

      if (user && templateUid && !isLoading) {
        props.hrTemplateDispatch.loadDetailRequest({
          templateUid
        });
      }
    }
  },
  handleOnSubmit: (props: HRTemplateFormProps) => (values: IHRTemplateFormValue, actions: FormikActions<IHRTemplateFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise(() => undefined);

    if (user) {
      // creating 
      if (props.formMode === FormMode.New) {
        // fill payload 
        const payload: IHRTemplatePostPayload = {
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
          props.hrTemplateDispatch.createRequest({
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
          const payload: IHRTemplatePutPayload = {
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
            props.hrTemplateDispatch.updateRequest({
              templateUid,
              resolve,
              reject,
              data: payload as IHRTemplatePutPayload,
            });
          });
        }
      }
    }

    // handling promise 
    promise
      .then((response: IHRTemplate) => {
        // set submitting status 
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.template.message.createSuccess : hrMessage.template.message.updateSuccess, { uid: response.uid })
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.template.message.createFailure : hrMessage.template.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HRTemplateFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HRTemplateFormProps) {
    // handle template detail response
    const { response: thisResponse } = this.props.hrTemplateState.detail;
    const { response: prevResponse } = prevProps.hrTemplateState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values 
        const initialValues: IHRTemplateFormValue = {
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

export const HRTemplateForm = compose<HRTemplateFormProps, IOwnOption>(
  setDisplayName('HRTemplateForm'),
  withUser,
  withRouter,
  withHRTemplate,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handleCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HRTemplateFormView);
