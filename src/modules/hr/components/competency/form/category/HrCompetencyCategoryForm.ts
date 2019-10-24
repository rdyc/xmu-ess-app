import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
import { IHrCompetencyCategoryPostPayload, IHrCompetencyCategoryPutPayload } from '@hr/classes/request';
import { IHrCompetencyCategory, IHrCompetencyIndicatorList } from '@hr/classes/response';
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

export interface ICategoryLevelFormValue {
  uid?: string;
  level: number;
  description: string;
  indicators: IHrCompetencyIndicatorList[];
}

export interface ICategoryIndicatorFormValue {
  uid?: string;
  description: string;
}

export interface ICategoryFormValue {
  clusterUid: string;
  categoryUid: string;
  levels: ICategoryLevelFormValue[];
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
  // filterCategories?: IHrCompetencyCategoryGetListFilter;
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
    clusterUid: '',
    categoryUid: '',
    levels: []
  },

  // validation props
  validationSchema: Yup.object().shape<Partial<ICategoryFormValue>>({
    clusterUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.cluster))
      .required(),
    categoryUid: Yup.string()
      .label(props.intl.formatMessage(hrMessage.competency.field.category))
      .required(),
    levels: Yup.array()
      .of(
        Yup.object().shape({
          level: Yup.number()
            .label(props.intl.formatMessage(hrMessage.competency.field.level))
            .required(),
          description: Yup.string()
            .label(props.intl.formatMessage(hrMessage.competency.field.description))
            .required(),
          indicators: Yup.array()
            .of(
              Yup.object().shape({
                description: Yup.string()
                  .label(props.intl.formatMessage(hrMessage.competency.field.description))
                  .required(),
              })
            )
            .min(1, props.intl.formatMessage(hrMessage.competency.field.minIndicators))
        })
      )
      .min(1, props.intl.formatMessage(hrMessage.competency.field.minLevels))
  }),

  // filter
  filterCluster: {
    orderBy: 'name',
    direction: 'ascending'
  },

  // filterCategories: {
  //   orderBy: 'name',
  //   direction: 'ascending'
  // }
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
          levels: []
        };

        // fill levels
        values.levels.forEach(item => payload.levels.push({
          level: item.level,
          description: item.description,
          indicators: item.indicators
        }));

        // set the promise
        promise = new Promise((resolve, reject) => {
          props.hrCompetencyCategoryDispatch.createRequest({
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
        const categoryUid = props.history.location.state.uid;
        const clusterUid = props.history.location.state.clusterUid;

        // must have categoryUid
        if (categoryUid && clusterUid) {
          const payload: IHrCompetencyCategoryPutPayload = {
            levels: []
          };

          // fill levels
          values.levels.forEach(item => payload.levels.push({
            uid: item.uid || '',
            level: item.level,
            description: item.description,
            indicators: item.indicators
          }));

          // set the promise
          promise = new Promise((resolve, reject) => {
            props.hrCompetencyCategoryDispatch.patchRequest({
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
          message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Category', type: 'name', uid: response.name })
        });
        const clusterUid = props.history.location.state.clusterUid;

        // redirect to detail
        props.history.push(`/hr/competency/category/${response.uid}`, {clusterUid});
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
          categoryUid: thisResponse.data.uid,
          clusterUid: thisResponse.data.competencyUid,
          levels: []
        };

        // fill levels
        thisResponse.data.levels.forEach(item =>
          initialValues.levels.push({
            uid: item.uid,
            level: item.level,
            description: item.description,
            indicators: item.indicators
          })  
        );
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