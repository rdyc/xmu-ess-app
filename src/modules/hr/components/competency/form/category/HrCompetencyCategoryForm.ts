import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { IHrCompetencyCategoryPostPayload, IHrCompetencyCategoryPutPayload } from '@hr/classes/request';
import { IHrCompetencyCategory } from '@hr/classes/response';
import { WithHrCompetencyCategory, withHrCompetencyCategory } from '@hr/hoc/withHrCompetencyCategory';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
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

import { HrCompetencyCategoryFormView } from './HrCompetencyCategoryFormView';

export interface ICategoryFormValue {
  uid: string;
  name: string;
  description: string;
  clusterUid: string;
}

interface IOwnRouteParams {
  categoryUid: string;
  clusterUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICategoryFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICategoryFormValue>>>;

  filterCluster?: IHrCompetencyClusterGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ICategoryFormValue, actions: FormikActions<ICategoryFormValue>) => void;
}

export type HrCompetencyCategoryFormProps
  = WithHrCompetencyCategory
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCompetencyCategoryFormProps, IOwnState> = (props: HrCompetencyCategoryFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    name: '',
    description: '',
    clusterUid: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICategoryFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.name))
      .required(),
    description: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.description))
      .required(),
    clusterUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'}))
      .required(),
  }),

  // filter
  filterCluster: {
    orderBy: 'name',
    direction: 'ascending'
  }
});

const stateUpdaters: StateUpdaters<HrCompetencyCategoryFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<HrCompetencyCategoryFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCompetencyCategoryFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const clusterUid = props.history.location.state.clusterUid;
      const categoryUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyCategoryState.detail;

      if (user && clusterUid && categoryUid && !isLoading) {
        props.hrCompetencyCategoryDispatch.loadDetailRequest({
          categoryUid,
          clusterUid
        });
      }
    }
  },
  handleOnSubmit: (props: HrCompetencyCategoryFormProps) => (values: ICategoryFormValue, actions: FormikActions<ICategoryFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyCategoryPostPayload = {
          name: values.name,
          description: values.description,
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyCategoryDispatch.createRequest({
            resolve,
            reject,
            clusterUid: values.clusterUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const categoryUid = props.history.location.state.uid;
        const clusterUid = props.history.location.state.clusterUid;

        // must have categoryUid
        if (categoryUid && clusterUid) {
          const payload: IHrCompetencyCategoryPutPayload = {
            name: values.name,
            description: values.description
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyCategoryDispatch.updateRequest({
              clusterUid,
              categoryUid,
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
      .then((response: IHrCompetencyCategory) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Category', uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/hr/competency/category/${response.uid}`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyCategoryFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HrCompetencyCategoryFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyCategoryState.detail;
    const { response: prevResponse } = prevProps.hrCompetencyCategoryState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ICategoryFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          description: thisResponse.data.description,
          clusterUid: thisResponse.data.clusterUid
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const HrCompetencyCategoryForm = compose<HrCompetencyCategoryFormProps, IOwnOption>(
  setDisplayName('HrCompetencyCategoryForm'),
  withMasterPage,
  withRouter,
  withHrCompetencyCategory,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyCategoryFormView);