import { FormMode } from '@generic/types';
import { IHrCompetencyCategoryGetListFilter, IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { IHrCompetencyLevelPostPayload, IHrCompetencyLevelPutPayload } from '@hr/classes/request';
import { IHrCompetencyLevel } from '@hr/classes/response';
import { WithHrCompetencyLevel, withHrCompetencyLevel } from '@hr/hoc/withHrCompetencyLevel';
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

import { HrCompetencyLevelFormView } from './HrCompetencyLevelFormView';

export interface ILevelFormValue {
  uid: string;
  level: number;
  description: string;
  clusterUid: string;
  categoryUid: string;
}

interface IOwnRouteParams {
  levelUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ILevelFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ILevelFormValue>>>;

  filterCluster?: IHrCompetencyClusterGetListFilter;
  filterCategory?: IHrCompetencyCategoryGetListFilter;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: ILevelFormValue, actions: FormikActions<ILevelFormValue>) => void;
}

export type HrCompetencyLevelFormProps
  = WithHrCompetencyLevel
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCompetencyLevelFormProps, IOwnState> = (props: HrCompetencyLevelFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    level: 0,
    description: '',
    clusterUid: '',
    categoryUid: ''
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ILevelFormValue>>({
    level: Yup.number()
      .label(props.intl.formatMessage(hrMessage.competency.field.level))
      .required(),
    description: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.description))
      .required(),
    clusterUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'}))
      .required(),
    categoryUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'}))
      .required(),
  }),

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

const stateUpdaters: StateUpdaters<HrCompetencyLevelFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<HrCompetencyLevelFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCompetencyLevelFormProps) => () => {
    if (!isNullOrUndefined(props.history.location.state)) {
      const user = props.userState.user;
      const clusterUid = props.history.location.state.clusterUid;
      const categoryUid = props.history.location.state.categoryUid;
      const levelUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyLevelState.detail;

      if (user && clusterUid && categoryUid && levelUid && !isLoading) {
        props.hrCompetencyLevelDispatch.loadDetailRequest({
          clusterUid,
          categoryUid,
          levelUid
        });
      }
    }
  },
  handleOnSubmit: (props: HrCompetencyLevelFormProps) => (values: ILevelFormValue, actions: FormikActions<ILevelFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyLevelPostPayload = {
          level: values.level,
          description: values.description,
        };

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyLevelDispatch.createRequest({
            resolve,
            reject,
            clusterUid: values.clusterUid,
            categoryUid: values.categoryUid,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const levelUid = props.history.location.state.uid;
        const clusterUid = props.history.location.state.clusterUid;
        const categoryUid = props.history.location.state.categoryUid;

        // must have levelUid
        if (levelUid && clusterUid && categoryUid) {
          const payload: IHrCompetencyLevelPutPayload = {
            level: values.level,
            description: values.description
          };

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyLevelDispatch.updateRequest({
              clusterUid,
              categoryUid,
              levelUid,
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
      .then((response: IHrCompetencyLevel) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Level', uid: response.uid })
        });

        // redirect to detail
        props.history.push(`/hr/competency/level/${response.uid}`);
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

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyLevelFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HrCompetencyLevelFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyLevelState.detail;
    const { response: prevResponse } = prevProps.hrCompetencyLevelState.detail;

    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: ILevelFormValue = {
          uid: thisResponse.data.uid,
          level: thisResponse.data.level,
          description: thisResponse.data.description,
          clusterUid: thisResponse.data.category.clusterUid,
          categoryUid: thisResponse.data.categoryUid
        };

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const HrCompetencyLevelForm = compose<HrCompetencyLevelFormProps, IOwnOption>(
  setDisplayName('HrCompetencyLevelForm'),
  withMasterPage,
  withRouter,
  withHrCompetencyLevel,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyLevelFormView);