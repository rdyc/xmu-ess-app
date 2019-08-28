import { IAccountEmployee } from '@account/classes';
import { IEmployeeListFilter } from '@account/classes/filters';
import { FormMode } from '@generic/types';
import { WithHrCompetencyCluster, withHrCompetencyCluster } from '@hr/hoc/withHrCompetencyCluster';
import { DraftType } from '@layout/components/submission/DraftType';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { IPositionGetListFilter } from '@lookup/classes/filters';
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
import { CompetencyAssessmentFormView } from './CompetencyAssessmentFormView';

export interface IResponderEmployee {
  uid?: string;
  employeeUid: string;
  employee?: IAccountEmployee;
}

export interface ICompetencyAssessmentFormValue {
  uid: string;
  year: string;
  companyUid: string;
  positionUid: string;
  employeeUid: string;
  responder: IResponderEmployee[];
}

interface IOwnRouteParams {
  // 
}

interface IOwnOption {
  //
}

interface IOwnState {
  formMode: FormMode;

  initialValues?: ICompetencyAssessmentFormValue;
  // validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<ICompetencyAssessmentFormValue>>>;

  filterCompany?: ILookupCompanyGetListFilter;
  filterPosition?: IPositionGetListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
  // filterResponden?: IEmployeeListFilter;

  saveType: DraftType;
}

interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
  setInitialValues: StateHandler<IOwnState>;
  stateUpdate: StateHandler<IOwnState>;
  handleType: (saveType: DraftType) => IOwnState;
}

interface IOwnHandler {
  handleOnLoadDetail: () => void;
  // handleFilterEmployee: (companyUid: string, positionUid: string) => void;
  handleOnSubmit: (values: ICompetencyAssessmentFormValue, actions: FormikActions<ICompetencyAssessmentFormValue>) => void;
  handleSaveType: (saveType: DraftType) => void;
}

export type CompetencyAssessmentFormProps
  = WithMasterPage
  & WithHrCompetencyCluster
  & WithUser
  & WithStyles<typeof styles>
  & RouteComponentProps<IOwnRouteParams>
  & InjectedIntlProps
  & IOwnOption
  & IOwnState
  & IOwnStateUpdater
  & IOwnHandler;

const createProps: mapper<CompetencyAssessmentFormProps, IOwnState> = (props: CompetencyAssessmentFormProps): IOwnState => ({
  // form props
  formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
  // form values
  initialValues: {
    uid: 'Auto Generated',
    year: '',
    companyUid: '',
    positionUid: '',
    employeeUid: '',
    responder: [],
  },

  // validation props
  // validationSchema: Yup.object().shape<Partial<ICompetencyAssessmentFormValue>>({
  //   year: Yup.string()
  //     .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Year'}))
  //     .required(),
  //   companyUid: Yup.string()
  //     .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Company'}))
  //     .required(),
  //   positionUid: Yup.string()
  //     .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'}))
  //     .required(),
  //   employeeUid: Yup.string()
  //     .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}))
  //     .required(),
  //   responder: Yup.array()
  //     .of(
  //       Yup.object().shape({
  //         employeeUid: Yup.string()
  //           .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}))
  //           .required()
  //       })
  //     )
  //     .min(1, props.intl.formatMessage(hrMessage.competency.field.minCategories)),
  // }),
  filterAccountEmployee: {
    useAccess: true,
    orderBy: 'fullName',
    direction: 'ascending'
  },
  filterCompany: {
    orderBy: 'name',
    direction: 'ascending'
  },
  filterPosition: {
    orderBy: 'name',
    direction: 'ascending'
  },

  saveType: DraftType.draft
});

const stateUpdaters: StateUpdaters<CompetencyAssessmentFormProps, IOwnState, IOwnStateUpdater> = {
  setInitialValues: () => (values: any): Partial<IOwnState> => ({
    initialValues: values
  }),
  stateUpdate: (prevState: IOwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  handleType: (staet: IOwnState) => (saveType: DraftType) => ({
    saveType
  })
};

const handlerCreators: HandleCreators<CompetencyAssessmentFormProps, IOwnHandler> = {
  handleSaveType: (props: CompetencyAssessmentFormProps) => (saveType: DraftType) => {
    const { stateUpdate } = props;

    stateUpdate({
      saveType
    });
  },
  handleOnLoadDetail: () => () => {
    // if (!isNullOrUndefined(props.history.location.state)) {
    //   const user = props.userState.user;
    //   const clusterUid = props.history.location.state.uid;
    //   const { isLoading } = props.hrCompetencyClusterState.detail;

    //   if (user && clusterUid && !isLoading) {
    //     props.hrCompetencyClusterDispatch.loadDetailRequest({
    //       clusterUid
    //     });
    //   }
    // }
  },
  // handleFilterEmployee: (props: CompetencyAssessmentFormProps) => (companyUid: string, positionUid: string) => {
  //   console.log(props.filterResponden);
  //   if (companyUid && positionUid) {
  //     const filterResponden: IEmployeeListFilter = {
  //       companyUids: companyUid,
  //       positionUids: positionUid,
  //       orderBy: 'fullName',
  //       direction: 'ascending'
  //     };
  //     props.stateUpdate({
  //       filterResponden
  //     });
  //   } else {
  //     props.stateUpdate({
  //       filterResponden: undefined
  //     });
  //   }
  // },
  handleOnSubmit: (props: CompetencyAssessmentFormProps) => () => {
    console.log('Submit assessment');
    console.log(props.saveType);
    // const { user } = props.userState;
    // let promise = new Promise((resolve, reject) => undefined);

    // if (user) {
    //   // New
    //   if (props.formMode === FormMode.New) {
    //     // fill payload
    //     const payload: IHrCompetencyClusterPostPayload = {
    //       name: values.name,
    //       description: values.description,
    //       categories: []
    //     };

    //     // fill categories
    //     values.categories.forEach(item => payload.categories.push({
    //       name: item.name,
    //       description: item.description
    //     }));

    //     // set the promise
    //     promise = new Promise((resolve, reject) => {
    //       props.hrCompetencyClusterDispatch.createRequest({
    //         resolve,
    //         reject,
    //         data: payload
    //       });
    //     });
    //   }

    //   // Edit
    //   if (props.formMode === FormMode.Edit) {
    //     const clusterUid = props.history.location.state.uid;

    //     // must have clusterUid
    //     if (clusterUid) {
    //       const payload: IHrCompetencyClusterPutPayload = {
    //         name: values.name,
    //         description: values.description,
    //         categories: []
    //       };

    //       // fill categories
    //       values.categories.forEach(item => payload.categories.push({
    //         categoryUid: item.uid,
    //         name: item.name,
    //         description: item.description
    //       }));

    //       // set the promise
    //       promise = new Promise((resolve, reject) => {
    //         props.hrCompetencyClusterDispatch.patchRequest({
    //           clusterUid,
    //           resolve,
    //           reject,
    //           data: payload
    //         });
    //       });
    //     }
    //   }
    // }

    // // handling promise
    // promise
    //   .then((response: IHrCompetencyCluster) => {
        
    //     // set submitting status
    //     actions.setSubmitting(false);

    //     // clear form status
    //     actions.setStatus();

    //     // show flash message
    //     props.masterPage.flashMessage({
    //       message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Cluster', uid: response.uid })
    //     });

    //     // redirect to detail
    //     props.history.push(`/lookup/competencycluster/${response.uid}`);
    //   })
    //   .catch((error: IValidationErrorResponse) => {
    //     // set submitting status
    //     actions.setSubmitting(false);
        
    //     // set form status
    //     actions.setStatus(error);
        
    //     // error on form fields
    //     if (error.errors) {
    //       error.errors.forEach(item => 
    //         actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
    //       );
    //     }

    //     // console.log(error.errors);

    //     // show flash message
    //     props.masterPage.flashMessage({
    //       message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
    //     });
    //   });
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CompetencyAssessmentFormProps, IOwnState> = {
  componentDidMount() {
    //
  },
  componentDidUpdate() {
    // const { response: thisResponse } = this.props.hrCompetencyClusterState.detail;
    // const { response: prevResponse } = prevProps.hrCompetencyClusterState.detail;
    
    // if (thisResponse !== prevResponse) {
    //   if (thisResponse && thisResponse.data) {
    //     // define initial values
    //     const initialValues: ICompetencyAssessmentFormValue = {
    //       uid: thisResponse.data.uid,
    //       name: thisResponse.data.name,
    //       description: thisResponse.data.description,
    //       categories: []
    //     };

    //     // fill categories
    //     thisResponse.data.categories.forEach(item => initialValues.categories.push({
    //       uid: item.uid,
    //       name: item.name,
    //       description: item.description
    //     }));

    //     this.props.setInitialValues(initialValues);
    //   }
    // }
  }
};

export const CompetencyAssessmentForm = compose<CompetencyAssessmentFormProps, IOwnOption>(
  setDisplayName('CompetencyAssessmentForm'),
  withHrCompetencyCluster,
  withMasterPage,
  withRouter,
  withUser,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions),
  withStyles(styles)
)(CompetencyAssessmentFormView);