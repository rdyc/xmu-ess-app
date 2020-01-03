import { ISystemListFilter } from '@common/classes/filters';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { FormMode } from '@generic/types/FormMode';
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

import { ISystemPostPayload, ISystemPutPayload } from '@common/classes/request';
import { ISystem } from '@common/classes/response';
import { categoryTypeTranslator } from '@common/helper';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { CommonFormView } from './CommonFormView';

export interface ICommonFormValue {
  id: string;
  category: string;
  companyUid?: string;
  parentCode?: string ;
  name: string;
  description: string;
  isActive: boolean;
}

interface OwnRouteParams {
  category: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues: ICommonFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICommonFormValue>>>;
  
  filterLookupCompany: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  setFilterCommonSystem: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICommonFormValue, actions: FormikActions<ICommonFormValue>) => void;
  handleSetFilterCommonSystem: (companyUid: string) => void;
}

export type CommonFormProps
  = WithCommonSystem
  & WithMasterPage
  & WithStyles<typeof styles>
  & RouteComponentProps<OwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CommonFormProps, IOwnState> = (props: CommonFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,

  // form values
  initialValues: {
    id: 'Auto Generated',
    category: props.match.params.category,
    companyUid: '',
    parentCode: '',
    name: '',
    description: '',
    isActive: false,
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICommonFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(commonMessage.system.field.companyUid)),

    parentCode: Yup.string()
      .label(props.intl.formatMessage(commonMessage.system.field.parentCode)),

    name: Yup.string()
      .max(50)
      .label(props.intl.formatMessage(commonMessage.system.field.name))
      .required(),

    description: Yup.string()
      .max(100)
      .label(props.intl.formatMessage(commonMessage.system.field.description)),
      
    isActive: Yup.boolean()
      .label(props.intl.formatMessage(commonMessage.system.field.isActive)),
  }),

  // filter props
  filterLookupCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  
  // filterCommonSystem: {
  //   orderBy: 'value',
  //   direction: 'ascending'
  // },
});

const stateUpdaters: StateUpdaters<CommonFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  setFilterCommonSystem: () => (companyUid: string) => ({
    filterCommonSystem: {
      companyUid,
      orderBy: 'value',
      direction: 'ascending'
    },
  })
};

const handlerCreators: HandleCreators<CommonFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: CommonFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const id = props.history.location.state.id;
      const { isLoading } = props.commonSystemState.detail;

      if (id && !isLoading) {
        props.commonDispatch.systemDetailRequest({
          id,
          category: categoryTypeTranslator(props.match.params.category)
        });
      }
    }
  },
  handleOnSubmit: (props: CommonFormProps) => (values: ICommonFormValue, actions: FormikActions<ICommonFormValue>) => {
    let promise = new Promise(() => undefined);

    if (props.formMode === FormMode.New) {
      // fill payload
      const payload: ISystemPostPayload = {
        companyUid: values.companyUid || '',
        parentCode: values.parentCode || '',
        name: values.name,
        description: values.description,
        isActive: values.isActive,
      };
      
      // set the promise
      promise = new Promise((resolve, reject) => {
        props.commonDispatch.systemCreateRequest({
          resolve,
          reject,
          category: categoryTypeTranslator(props.match.params.category),
          data: payload
        });
      });
    }

    // editing
    if (props.formMode === FormMode.Edit) {
      const id = props.history.location.state.id;

      // must have expenseUid
      if (id) {
        // fill payload
        const payload: ISystemPutPayload = {
          companyUid: values.companyUid || '',
          parentCode: values.parentCode || '',
          name: values.name,
          description: values.description,
          isActive: values.isActive,
        };

        promise = new Promise((resolve, reject) => {
          props.commonDispatch.systemUpdateRequest({
            id, 
            resolve, 
            reject,
            category: categoryTypeTranslator(props.match.params.category),
            data: payload, 
          });
        });
      }
    }

    // handling promise
    promise
      .then((response: ISystem) => {
        console.log(response);
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? commonMessage.system.message.createSuccess : commonMessage.system.message.updateSuccess, { uid: response.type })
        });
       
        props.history.push(`/common/system/${props.match.params.category}/${response.id}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? commonMessage.system.message.createFailure : commonMessage.system.message.updateFailure)
        });
      });
  },
  handleSetFilterCommonSystem: (props: CommonFormProps) => (companyUid: string) => {
    props.setFilterCommonSystem(companyUid);
  },
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CommonFormProps, IOwnState> = {
  // tslint:disable-next-line:no-empty
  componentDidMount() {   
  },
  componentDidUpdate(prevProps: CommonFormProps) {
    // handle project detail response
    const { response } = this.props.commonSystemState.detail;

    if (response !== prevProps.commonSystemState.detail.response) {
      if (response && response.data) {
        // define initial values
        const initialValues: ICommonFormValue = {
          id: response.data.id.toString(),
          category: this.props.match.params.category,
          companyUid: response.data.companyUid || '',
          parentCode: response.data.parentCode || '',
          name: response.data.name,
          description: response.data.description || '',
          isActive: response.data.isActive,
        };

        // set initial values
        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const CommonForm = compose<CommonFormProps, IOwnOption>(
  setDisplayName('CommonForm'),
  withRouter,
  withMasterPage,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CommonFormView);