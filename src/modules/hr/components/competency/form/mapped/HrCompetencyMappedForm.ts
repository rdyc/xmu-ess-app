import { FormMode } from '@generic/types';
import { IHrCompetencyCategoryGetListFilter, IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { IHrCompetencyMappedPostPayload, IHrCompetencyMappedPutPayload } from '@hr/classes/request';
import { IHrCompetencyMapped } from '@hr/classes/response';
import { WithHrCompetencyMapped, withHrCompetencyMapped } from '@hr/hoc/withHrCompetencyMapped';
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
  withStateHandlers,
} from 'recompose';
import { isNullOrUndefined } from 'util';
import * as Yup from 'yup';

import { HrCompetencyMappedFormView } from './HrCompetencyMappedFormView';

export interface IMappedFormValue {
  uid: string;
  companyUid: string;
  positionUid: string;
  clusterUid: string;
  categoryUid: string;
}

interface IOwnRouteParams {
  mappedUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IMappedFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IMappedFormValue>>>;
  
  filterCompany?: ILookupCompanyGetListFilter;
  filterCluster?: IHrCompetencyClusterGetListFilter;
  filterCategory?: IHrCompetencyCategoryGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IMappedFormValue, actions: FormikActions<IMappedFormValue>) => void;
}

export type HrCompetencyMappedFormProps
  = WithHrCompetencyMapped
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCompetencyMappedFormProps, IOwnState> = (props: HrCompetencyMappedFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    categoryUid: '',
    clusterUid: '',
    companyUid: '',
    positionUid: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IMappedFormValue>>({
    companyUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Company'}))
      .required(),
    positionUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'}))
      .required(),
    clusterUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'}))
      .required(),
    categoryUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'}))
      .required(),
  }),

  // filter
  filterCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },

  // filter
  filterCluster: {
    orderBy: 'name',
    direction: 'ascending'
  },

  filterCategory: {
    orderBy: 'name',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<HrCompetencyMappedFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<HrCompetencyMappedFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCompetencyMappedFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const mappedUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyMappedState.detail;

      if (user && mappedUid && !isLoading) {
        props.hrCompetencyMappedDispatch.loadDetailRequest({
          mappedUid
        });
      }
    }
  },
  handleOnSubmit: (props: HrCompetencyMappedFormProps) => (values: IMappedFormValue, actions: FormikActions<IMappedFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyMappedPostPayload = {
          positionUid: values.positionUid,
          categoryUid: values.categoryUid
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyMappedDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const mappedUid = props.history.location.state.uid;

        // must have mappedUid
        if (mappedUid) {
          const payload: IHrCompetencyMappedPutPayload = {
            positionUid: values.positionUid,
            categoryUid: values.categoryUid
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyMappedDispatch.updateRequest({
              mappedUid,
              resolve,
              reject,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IHrCompetencyMapped) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Mapped', uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/hr/competency/mapped/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyMappedFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HrCompetencyMappedFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyMappedState.detail;
    const { response: prevResponse } = prevProps.hrCompetencyMappedState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IMappedFormValue = {
          uid: thisResponse.data.uid,
          companyUid: thisResponse.data.position.companyUid,
          positionUid: thisResponse.data.positionUid,
          clusterUid: thisResponse.data.category.clusterUid,
          categoryUid: thisResponse.data.categoryUid,
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const HrCompetencyMappedForm = compose<HrCompetencyMappedFormProps, IOwnOption>(
  setDisplayName('HrCompetencyMappedForm'),
  withMasterPage,
  withRouter,
  withHrCompetencyMapped,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyMappedFormView);