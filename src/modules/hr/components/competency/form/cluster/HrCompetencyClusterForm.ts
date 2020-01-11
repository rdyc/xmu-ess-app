import { FormMode } from '@generic/types';
import { IHrCompetencyClusterPostPayload, IHrCompetencyClusterPutPayload } from '@hr/classes/request';
import { IHrCompetencyCluster } from '@hr/classes/response';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
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
import * as Yup from 'yup';

import { HrCompetencyClusterFormView } from './HrCompetencyClusterFormView';

export interface IClusterCategoryFormValue {
  uid?: string;
  name: string;
  description: string;
}

export interface IClusterFormValue {
  uid: string;
  name: string;
  description: string;
  categories: IClusterCategoryFormValue[];
}

interface IOwnRouteParams {
  clusterUid: string;
}

interface IOwnOption {

}

interface IOwnState {
  formMode: FormMode;

  initialValues?: IClusterFormValue;
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IClusterFormValue>>>;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  handleOnSubmit: (values: IClusterFormValue, actions: FormikActions<IClusterFormValue>) => void;
}

export type HrCompetencyClusterFormProps
  = WithHrCompetencyCluster
  & WithMasterPage
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<HrCompetencyClusterFormProps, IOwnState> = (props: HrCompetencyClusterFormProps): IOwnState => ({
  // form props
  formMode: (props.history.location.state === undefined || props.history.location.state === null) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    name: '',
    description: '',
    categories: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<IClusterFormValue>>({
    name: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.name))
      .required(),
    description: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.name))
      .required(),

    categories: Yup.array()
      .of(
        Yup.object().shape({
          name: Yup.string()
            .label(props.intl.formatMessage(hrMessage.competency.field.name))
            .required(),
          description: Yup.string()
            .label(props.intl.formatMessage(hrMessage.competency.field.description))
            .required()
        })
      )
      .min(1, props.intl.formatMessage(hrMessage.competency.field.minCategories))
  })
});

const stateUpdaters: StateUpdaters<HrCompetencyClusterFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
    initialValues: values
  })
};

const handlerCreators: HandleCreators<HrCompetencyClusterFormProps, IOwnHandler> = {
  handleOnLoadDetail: (props: HrCompetencyClusterFormProps) => () => {
    const { history } = props;

    if (!(history.location.state === undefined || history.location.state === null)) {
      const user = props.userState.user;
      const clusterUid = props.history.location.state.uid;
      const { isLoading } = props.hrCompetencyClusterState.detail;

      if (user && clusterUid && !isLoading) {
        props.hrCompetencyClusterDispatch.loadDetailRequest({
          clusterUid
        });
      }
    }
  },
  handleOnSubmit: (props: HrCompetencyClusterFormProps) => (values: IClusterFormValue, actions: FormikActions<IClusterFormValue>) => {
    const { user } = props.userState;
    let promise = new Promise((resolve, reject) => undefined);

    if (user) {
      // New
      if (props.formMode === FormMode.New) {
        // fill payload
        const payload: IHrCompetencyClusterPostPayload = {
          name: values.name,
          description: values.description,
          categories: []
        };

        // fill categories
        values.categories.forEach(item => payload.categories.push({
          name: item.name,
          description: item.description
        }));

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyClusterDispatch.createRequest({
            resolve,
            reject,
            data: payload
          });
        });
      }

      // Edit
      if (props.formMode === FormMode.Edit) {
        const clusterUid = props.history.location.state.uid;

        // must have clusterUid
        if (clusterUid) {
          const payload: IHrCompetencyClusterPutPayload = {
            name: values.name,
            description: values.description,
            categories: []
          };

          // fill categories
          values.categories.forEach(item => payload.categories.push({
            categoryUid: item.uid,
            name: item.name,
            description: item.description
          }));

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyClusterDispatch.patchRequest({
              resolve,
              reject,
              clusterUid,
              data: payload
            });
          });
        }
      }
    }

    // handling promise
    promise
      .then((response: IHrCompetencyCluster) => {
        
        // set submitting status
        actions.setSubmitting(false);

        // clear form status
        actions.setStatus();

        // show flash message
        props.masterPage.flashMessage({
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Cluster', type: 'name', uid: response.name })
        });

        props.hrCompetencyClusterDispatch.loadListRequest({
          filter: {
            orderBy: 'name',
            direction: 'ascending'
          }
        });
        
        // redirect to detail
        props.history.push(`/hr/competency/cluster/${response.uid}`);
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
        });
      });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyClusterFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate(prevProps: HrCompetencyClusterFormProps) {
    const { response: thisResponse } = this.props.hrCompetencyClusterState.detail;
    const { response: prevResponse } = prevProps.hrCompetencyClusterState.detail;
    
    if (thisResponse !== prevResponse) {
      if (thisResponse && thisResponse.data) {
        // define initial values
        const initialValues: IClusterFormValue = {
          uid: thisResponse.data.uid,
          name: thisResponse.data.name,
          description: thisResponse.data.description,
          categories: []
        };

        // fill categories
        thisResponse.data.categories.forEach(item => initialValues.categories.push({
          uid: item.uid,
          name: item.name,
          description: item.description
        }));

        this.props.setInitialValues(initialValues);
      }
    }
  }
};

export const HrCompetencyClusterForm = compose<HrCompetencyClusterFormProps, IOwnOption>(
  setDisplayName('HrCompetencyClusterForm'),
  withMasterPage,
  withRouter,
  withHrCompetencyCluster,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(HrCompetencyClusterFormView);