import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IValidationErrorResponse } from '@layout/interfaces';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { IPositionPostPayload, IPositionPutPayload } from '@lookup/classes/request';
import { IPosition } from '@lookup/classes/response';
import { WithLookupPosition, withLookupPosition } from '@lookup/hoc/withLookupPosition';
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
import { LookupPositionFormView } from './LookupPositionFormView';

export interface IPositionFormValue {
  uid: string;
  companyUid: string;
  name: string;
  description: string;
  inactiveDate?: string;
  isAllowMultiple: boolean;
}

interface IOwnRouteParams {
  positionUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IPositionFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IPositionFormValue>>>;

  filterLookupCompany?: ILookupCompanyGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IPositionFormValue, actions: FormikActions<IPositionFormValue>) => void;
}

export type PositionFormProps
  = WithLookupPosition
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

const createProps: mapper<PositionFormProps, IOwnState> = (props: PositionFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    uid: 'Auto Generated',
    companyUid: '',
    name: '',
    description: '',
    inactiveDate: '',
    isAllowMultiple: false
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IPositionFormValue>>({
    name: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(lookupMessage.position.field.name))
      .required(),

    companyUid: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.position.field.companyUid))
      .required(),

    description: Yup.string()
      .max(200)
      .label(props.intl.formatMessage(lookupMessage.position.field.description)),

    inactiveDate: Yup.string()
      .label(props.intl.formatMessage(lookupMessage.position.field.inactiveDate)),

    isAllowMultiple: Yup.boolean()
      .label(props.intl.formatMessage(lookupMessage.position.field.isAllowMultiple)),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
});

const stateUpdaters: StateUpdaters<PositionFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<PositionFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: PositionFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const positionUid = props.history.location.state.uid;
      const companyUid = props.history.location.state.companyUid;
      const { isLoading } = props.lookupPositionState.detail;

      if (user && companyUid && positionUid && !isLoading) {
        props.lookupPositionDispatch.loadDetailRequest({
          positionUid,
          companyUid
        });
      }
    }
  },
  handleOnSubmit: (props: PositionFormProps) => (values: IPositionFormValue, actions: FormikActions<IPositionFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IPositionPostPayload = {
          name: values.name,
          description: values.description,
          inactiveDate: values.inactiveDate,
          isAllowMultiple: values.isAllowMultiple
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.lookupPositionDispatch.createRequest({
            resolve,
            reject,
            companyUid: values.companyUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const positionUid = props.history.location.state.uid;

        // must have positionUid
        if (positionUid) {
          const payload: IPositionPutPayload = {
            name: values.name,
            description: values.description,
            inactiveDate: values.inactiveDate,
            isAllowMultiple: values.isAllowMultiple
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.lookupPositionDispatch.updateRequest({
              positionUid,
              resolve,
              reject,
              companyUid: values.companyUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IPosition) => {

        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.position.message.createSuccess : lookupMessage.position.message.updateSuccess, { uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/lookup/positions/${response.uid}`, { companyUid: response.companyUid });
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

        // console.log(error.errors);

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? lookupMessage.position.message.createFailure : lookupMessage.position.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<PositionFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: PositionFormProps) {
    const { response: thisResponse } = this.props.lookupPositionState.detail;
    const { response: prevResponse } = prevProps.lookupPositionState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IPositionFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          companyUid: thisResponse.data.companyUid,
          description: thisResponse.data.description || '',
          inactiveDate: thisResponse.data.inactiveDate || '',
          isAllowMultiple: thisResponse.data.isAllowMultiple
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const LookupPositionForm = compose<PositionFormProps, IOwnOption>(
  setDisplayName('LookupPositionForm'),
  withUser,
  withMasterPage,
  withRouter,
  withLookupPosition,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(LookupPositionFormView);