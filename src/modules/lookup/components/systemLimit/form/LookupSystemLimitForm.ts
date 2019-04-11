import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { ISystemLimitPostPayload, ISystemLimitPutPayload } from '@lookup/classes/request';
import { ISystemLimit } from '@lookup/classes/response';
import { WithLookupSystemLimit, withLookupSystemLimit } from '@lookup/hoc/withLookupSystemLimit';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
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
import { SystemLimitFormView } from './LookupSystemLimitFormView';

export interface ISystemLimitFormValue {
  uid: string;
  companyUid: string;
  categoryType: string;
  days: number;
}

interface IOwnRouteParams {
  systemLimitUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ISystemLimitFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ISystemLimitFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ISystemLimitFormValue, actions: FormikActions<ISystemLimitFormValue>) => void;
}

export type SystemLimitFormProps
  = WithLookupSystemLimit
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

const createProps: mapper<SystemLimitFormProps, IOwnState> = (props: SystemLimitFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    categoryType: '',
    days: 0
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ISystemLimitFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.systemLimit.field.company))
      .required(),

    categoryType: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.systemLimit.field.category))
      .required(),

    days: Yup.number()
      .label(props.intl.formatMessage(lookupMessage.systemLimit.field.days))
      .integer()
      .min(1)
      .required(),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCommonSystem: {
    orderBy: 'value',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<SystemLimitFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<SystemLimitFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: SystemLimitFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const systemLimitUid = props.history.location.state.uid;
      const { isLoading } = props.systemLimitState.detail;

      if (user && systemLimitUid && !isLoading) {
        props.systemLimitDispatch.loadDetailRequest({
          systemLimitUid,
          companyUid: props.history.location.state.companyUid,
        });
      }
    }
  },
  handleOnSubmit: (props: SystemLimitFormProps) => (values: ISystemLimitFormValue, actions: FormikActions<ISystemLimitFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: ISystemLimitPostPayload = {
          categoryType: values.categoryType,
          days: values.days
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.systemLimitDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const systemLimitUid = props.history.location.state.uid;
        const companyUid = props.history.location.state.companyUid;

        // must have systemlimitUid
        if (systemLimitUid && companyUid) {
          const payload: ISystemLimitPutPayload = {
            categoryType: values.categoryType,
            days: values.days
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.systemLimitDispatch.updateRequest({
              systemLimitUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload as ISystemLimitPutPayload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: ISystemLimit) => {
        console.log(response);

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.systemLimit.message.createSuccess : lookupMessage.systemLimit.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/systemlimits/${response.uid}`, { companyuid: response.companyUid });
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.systemLimit.message.createFailure : lookupMessage.systemLimit.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<SystemLimitFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: SystemLimitFormProps) {
    const { response: thisResponse } = this.props.systemLimitState.detail;
    const { response: prevResponse } = prevProps.systemLimitState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ISystemLimitFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.companyUid,
          categoryType: thisResponse.data.categoryType,
          days: thisResponse.data.days
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const SystemLimitForm = compose<SystemLimitFormProps, IOwnOption>(
  setDisplayName('SystemLimitForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupSystemLimit,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(SystemLimitFormView);