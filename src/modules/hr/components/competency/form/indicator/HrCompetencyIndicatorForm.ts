// import { FormMode } from '@generic/types';
// import { IHrCompetencyCategoryGetListFilter, IHrCompetencyClusterGetListFilter, IHrCompetencyLevelGetListFilter } from '@hr/classes/filters';
// import { IHrCompetencyIndicatorPostPayload, IHrCompetencyIndicatorPutPayload } from '@hr/classes/request';
// import { IHrCompetencyIndicator } from '@hr/classes/response';
// import { WithHrCompetencyIndicator, withHrCompetencyIndicator } from '@hr/hoc/withHrCompetencyIndicator';
// import { hrMessage } from '@hr/locales/messages/hrMessage';
// import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import { IValidationErrorResponse } from '@layout/interfaces';
// import { WithStyles, withStyles } from '@material-ui/core';
// import styles from '@styles';
// import { FormikActions } from 'formik';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   setDisplayName,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';
// import { isNullOrUndefined } from 'util';
// import * as Yup from 'yup';

// import { HrCompetencyIndicatorFormView } from './HrCompetencyIndicatorFormView';

// export interface IIndicatorFormValue {
//   uid: string;
//   description: string;
//   clusterUid: string;
//   categoryUid: string;
//   levelUid: string;
// }

// interface IOwnRouteParams {
//   indicatorUid: string;
// }

// interface IOwnOption {

// }

// interface IOwnState {
//   formMode: FormMode;

//   initialValues?: IIndicatorFormValue;
//   validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<IIndicatorFormValue>>>;

//   filterCluster?: IHrCompetencyClusterGetListFilter;
//   filterCategory?: IHrCompetencyCategoryGetListFilter;
//   filterLevel?: IHrCompetencyLevelGetListFilter;
// }

// interface IOwnStateUpdater extends StateHandlerMap<IOwnState> {
//   setInitialValues: StateHandler<IOwnState>;
// }

// interface IOwnHandler {
//   handleOnLoadDetail: () => void;
//   handleOnSubmit: (values: IIndicatorFormValue, actions: FormikActions<IIndicatorFormValue>) => void;
// }

// export type HrCompetencyIndicatorFormProps
//   = WithHrCompetencyIndicator
//   & WithMasterPage
//   & WithUser
//   & WithStyles<typeof styles>
//   & RouteComponentProps<IOwnRouteParams>
//   & InjectedIntlProps
//   & IOwnOption
//   & IOwnState
//   & IOwnStateUpdater
//   & IOwnHandler;

// const createProps: mapper<HrCompetencyIndicatorFormProps, IOwnState> = (props: HrCompetencyIndicatorFormProps): IOwnState => ({
//   // form props
//   formMode: isNullOrUndefined(props.history.location.state) ? FormMode.New : FormMode.Edit,
  
//   // form values
//   initialValues: {
//     uid: 'Auto Generated',
//     description: '',
//     clusterUid: '',
//     categoryUid: '',
//     levelUid: ''
//   },

//   // validation props
//   validationSchema: Yup.object().shape<Partial<IIndicatorFormValue>>({
//     description: Yup.string()
//       .label(props.intl.formatMessage(hrMessage.competency.field.description))
//       .required(),
//     clusterUid: Yup.string()
//       .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Cluster'}))
//       .required(),
//     categoryUid: Yup.string()
//       .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Category'}))
//       .required(),
//     levelUid: Yup.string()
//       .label(props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Level'}))
//       .required(),
//   }),

//   // filter
//   filterCluster: {
//     orderBy: 'name',
//     direction: 'ascending'
//   },

//   filterCategory: {
//     orderBy: 'name',
//     direction: 'ascending'
//   },

//   filterLevel: {
//     orderBy: 'level',
//     direction: 'ascending'
//   }
// });

// const stateUpdaters: StateUpdaters<HrCompetencyIndicatorFormProps, IOwnState, IOwnStateUpdater> = {
//   setInitialValues: (state: IOwnState) => (values: any): Partial<IOwnState> => ({
//     initialValues: values
//   })
// };

// const handlerCreators: HandleCreators<HrCompetencyIndicatorFormProps, IOwnHandler> = {
//   handleOnLoadDetail: (props: HrCompetencyIndicatorFormProps) => () => {
//     if (!isNullOrUndefined(props.history.location.state)) {
//       const user = props.userState.user;
//       const clusterUid = props.history.location.state.clusterUid;
//       const categoryUid = props.history.location.state.categoryUid;
//       const levelUid = props.history.location.state.levelUid;
//       const indicatorUid = props.history.location.state.uid;
//       const { isLoading } = props.hrCompetencyIndicatorState.detail;

//       if (user && clusterUid && categoryUid && levelUid && indicatorUid && !isLoading) {
//         props.hrCompetencyIndicatorDispatch.loadDetailRequest({
//           clusterUid,
//           categoryUid,
//           levelUid,
//           indicatorUid
//         });
//       }
//     }
//   },
//   handleOnSubmit: (props: HrCompetencyIndicatorFormProps) => (values: IIndicatorFormValue, actions: FormikActions<IIndicatorFormValue>) => {
//     const { user } = props.userState;
//     let promise = new Promise((resolve, reject) => undefined);

//     if (user) {
//       // New
//       if (props.formMode === FormMode.New) {
//         // fill payload
//         const payload: IHrCompetencyIndicatorPostPayload = {
//           description: values.description,
//         };

//         // set the promise
//         promise = new Promise((resolve, reject) => {
//           props.hrCompetencyIndicatorDispatch.createRequest({
//             resolve,
//             reject,
//             clusterUid: values.clusterUid,
//             categoryUid: values.categoryUid,
//             levelUid: values.levelUid,
//             data: payload
//           });
//         });
//       }

//       // Edit
//       if (props.formMode === FormMode.Edit) {
//         const levelUid = props.history.location.state.uid;
//         const clusterUid = props.history.location.state.clusterUid;
//         const categoryUid = props.history.location.state.categoryUid;
//         const indicatorUid = props.history.location.state.indicatorUid;

//         // must have levelUid
//         if (levelUid && clusterUid && categoryUid && indicatorUid) {
//           const payload: IHrCompetencyIndicatorPutPayload = {
//             description: values.description
//           };

//           // set the promise
//           promise = new Promise((resolve, reject) => {
//             props.hrCompetencyIndicatorDispatch.updateRequest({
//               clusterUid,
//               categoryUid,
//               levelUid,
//               indicatorUid,
//               resolve,
//               reject,
//               data: payload
//             });
//           });
//         }
//       }
//     }

//     // handling promise
//     promise
//       .then((response: IHrCompetencyIndicator) => {
        
//         // set submitting status
//         actions.setSubmitting(false);

//         // clear form status
//         actions.setStatus();

//         // show flash message
//         props.masterPage.flashMessage({
//           message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createSuccess : hrMessage.shared.message.updateSuccess, {state: 'Indicator', uid: response.uid })
//         });

//         // redirect to detail
//         props.history.push(`/hr/competency/indicator/${response.uid}`);
//       })
//       .catch((error: IValidationErrorResponse) => {
//         // set submitting status
//         actions.setSubmitting(false);
        
//         // set form status
//         actions.setStatus(error);
        
//         // error on form fields
//         if (error.errors) {
//           error.errors.forEach(item => 
//             actions.setFieldError(item.field, props.intl.formatMessage({id: item.message}))
//           );
//         }

//         // console.log(error.errors);

//         // show flash message
//         props.masterPage.flashMessage({
//           message: props.intl.formatMessage(props.formMode === FormMode.New ? hrMessage.shared.message.createFailure : hrMessage.shared.message.updateFailure)
//         });
//       });
//   }
// };

// const lifeCycleFunctions: ReactLifeCycleFunctions<HrCompetencyIndicatorFormProps, IOwnState> = {
//   componentDidMount() {
//     //
//   },
//   componentDidUpdate(prevProps: HrCompetencyIndicatorFormProps) {
//     const { response: thisResponse } = this.props.hrCompetencyIndicatorState.detail;
//     const { response: prevResponse } = prevProps.hrCompetencyIndicatorState.detail;

//     if (thisResponse !== prevResponse) {
//       if (thisResponse && thisResponse.data) {
//         // define initial values
//         const initialValues: IIndicatorFormValue = {
//           uid: thisResponse.data.uid,
//           description: thisResponse.data.description,
//           clusterUid: thisResponse.data.level.category.clusterUid,
//           categoryUid: thisResponse.data.level.categoryUid,
//           levelUid: thisResponse.data.levelUid
//         };

//         this.props.setInitialValues(initialValues);
//       }
//     }
//   }
// };

// export const HrCompetencyIndicatorForm = compose<HrCompetencyIndicatorFormProps, IOwnOption>(
//   setDisplayName('HrCompetencyIndicatorForm'),
//   withMasterPage,
//   withRouter,
//   withHrCompetencyIndicator,
//   withUser,
//   injectIntl,
//   withStateHandlers(createProps, stateUpdaters),
//   withHandlers(handlerCreators),
//   lifecycle(lifeCycleFunctions),
//   withStyles(styles)
// )(HrCompetencyIndicatorFormView);