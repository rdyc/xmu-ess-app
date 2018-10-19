// import AppMenu from '@constants/AppMenu';
// import { FormMode } from '@generic/types';
// import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
// import { WithLayout, withLayout } from '@layout/hoc/withLayout';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import { Typography } from '@material-ui/core';
// import { ITimesheetPutPayload } from '@timesheet/classes/request';
// import {
//   RequestFormContainer,
//   TimesheetFormData,
// } from '@timesheet/components/request/forms/RequestFormContainer';
// import withApiTimesheetDetail, {
//   WithApiTimesheetDetailHandler,
// } from '@timesheet/enhancers/request/withApiTimesheetDetail';
// import withTimesheetDetail, {
//   WithTimesheetDetail,
// } from '@timesheet/enhancers/request/withTimesheetDetail';
// import * as React from 'react';
// import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps } from 'react-router';
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
// import { Dispatch } from 'redux';
// import { FormErrors } from 'redux-form';
// import { isNullOrUndefined, isObject } from 'util';

// interface RouteParams {
//   timesheetUid: string;
// }

// interface State {
//   mode: FormMode;
//   companyUid?: string | undefined;
//   positionUid?: string | undefined;
//   timesheetUid?: string | undefined;
// }

// interface Updaters extends StateHandlerMap<State> {
//   stateUpdate: StateHandler<State>;
// }

// type AllProps
//   = WithTimesheetDetail
//   & WithApiTimesheetDetailHandler
//   & WithUser
//   & WithLayout
//   & WithAppBar
//   & RouteComponentProps<RouteParams>
//   & InjectedIntlProps
//   & Handler
//   & State
//   & Updaters;

// interface Handler {
//   handleValidate: (payload: TimesheetFormData) => FormErrors;
//   handleSubmit: (payload: TimesheetFormData) => void;
//   handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
//   handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
// }

// const requestEditor: React.SFC<AllProps> = props => {
//   const { mode, handleValidate, handleSubmit, handleSubmitSuccess, handleSubmitFail } = props;
//   const { isLoading, response } = props.timesheetDetailState;

//   const renderForm = (formData: TimesheetFormData) => (
//     <RequestFormContainer 
//       initialValues={formData}
//       validate={handleValidate}
//       onSubmit={handleSubmit} 
//       onSubmitSuccess={handleSubmitSuccess}
//       onSubmitFail={handleSubmitFail}
//     />
//   );

//   // init form values
//   const initialValues: TimesheetFormData = {
//     information: {
//       activityType: undefined,
//       customerUid: undefined,
//       projectUid: undefined,
//       siteUid: undefined,
//       date: undefined,
//       start: undefined,
//       end: undefined,
//       notes: undefined
//     },
//   };

//   // New
//   if (mode === FormMode.New) {
//     return renderForm(initialValues);
//   }

//   // Modify
//   if (mode === FormMode.Edit) {
//     if (isLoading && !response) {
//       return (
//         <Typography variant="body2">
//           <FormattedMessage id="global.loading"/>
//         </Typography>
//       );
//     }
    
//     if (!isLoading && response && response.data) {
//       // todo: replace values with response data

//       return renderForm(initialValues);
//     }
//   }

//   return null;
// };

// const handlerCreators: HandleCreators<AllProps, Handler> = {
//   handleValidate: (props: AllProps) => (payload: TimesheetFormData) => { 
//     const errors = {
//       information: {}
//     };
  
//     const requiredFields = [
//       'activityType', 'customerUid', 'projectUid', 'siteUid', 'date', 'start', 'end', 'notes'
//     ];
  
//     requiredFields.forEach(field => {
//       if (!payload.information[field] || isNullOrUndefined(payload.information[field])) {
//         errors.information[field] = props.intl.formatMessage({id: `timesheet.field.information.${field}.required`});
//       }
//     });
    
//     return errors;
//   },
//   handleSubmit: (props: AllProps) => (payload: TimesheetFormData) => { 
//     const { mode, timesheetUid, apiRequestDetailPost, apiRequestDetailPut } = props;
//     const { user } = props.userState;

//     if (!user) {
//       return Promise.reject('user was not found');
//     }

//     const putPayload: ITimesheetPutPayload = ({
//       activityType: payload.information.activityType || 'n/a',
//       customerUid: payload.information.customerUid || 'n/a',
//       projectUid: payload.information.projectUid || 'n/a',
//       siteUid: payload.information.siteUid || 'n/a',
//       date: payload.information.date || 'n/a',
//       start: payload.information.start || 'n/a',
//       end: payload.information.end || 'n/a',
//       notes: payload.information.notes || 'n/a',
//     });

//     console.log(putPayload);

//     if (mode === FormMode.New) {
//       return new Promise((resolve, reject) => {
//         apiRequestDetailPost(timesheetUid, putPayload, resolve, reject);
//       });
//     }

//     if (!timesheetUid) {
//       return Promise.reject('timesheet uid was not found');
//     }

//     if (mode === FormMode.Edit) {
//       return new Promise((resolve, reject) => {
//         apiRequestDetailPut(timesheetUid, putPayload, resolve, reject);
//       });
//     }

//     return null;
//   },
//   handleSubmitSuccess: (props: AllProps) => (result: any, dispatch: Dispatch<any>) => {
//     // console.log(result);
//     // console.log(dispatch);
//     const { alertAdd } = props.layoutDispatch;

//     alertAdd({
//       time: new Date(),
//       message: 'Success bro!!!'
//     });
//   },
//   handleSubmitFail: (props: AllProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
//     const { alertAdd } = props.layoutDispatch;
    
//     if (submitError) {
//       alertAdd({
//         time: new Date(),
//         message: isObject(submitError) ? submitError.message : submitError
//       });
//     }
//   }
// };

// const createProps: mapper<AllProps, State> = (props: AllProps): State => ({ 
//   mode: FormMode.New
// });

// const stateUpdaters: StateUpdaters<{}, State, Updaters> = {
//   stateUpdate: (prevState: State) => (newState: any) => ({
//     ...prevState,
//     ...newState
//   })
// };

// const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
//   componentDidMount() {
//     const { layoutDispatch, intl, history, stateUpdate, apiRequestDetailGet } = this.props;
//     const { user } = this.props.userState;
    
//     const view = {
//       title: 'timesheet.form.newTitle',
//       subTitle: 'timesheet.form.newSubTitle',
//     };

//     if (user) {
//       stateUpdate({ 
//         companyUid: user.company.uid,
//         positionUid: user.position.uid
//       });
//     }

//     if (!isNullOrUndefined(history.location.state)) {
//       view.title = 'timesheet.form.editTitle';
//       view.subTitle = 'timesheet.form.editSubTitle';

//       stateUpdate({ 
//         mode: FormMode.Edit,
//         timesheetUid: history.location.state.uid
//       });

//       apiRequestDetailGet(history.location.state.uid);
//     }

//     layoutDispatch.changeView({
//       uid: AppMenu.TimesheetHistory,
//       parentUid: AppMenu.Timesheet,
//       title: intl.formatMessage({id: view.title}),
//       subTitle : intl.formatMessage({id: view.subTitle})
//     });

//     layoutDispatch.navBackShow(); 
//   },
//   componentWillUnmount() {
//     const { layoutDispatch, appBarDispatch } = this.props;

//     layoutDispatch.changeView(null);
//     layoutDispatch.navBackHide();
//     layoutDispatch.moreHide();
//     layoutDispatch.actionCentreHide();

//     appBarDispatch.dispose();
//   }
// };

// export default compose<AllProps, {}>(
//   setDisplayName('TimesheetEditor'),
  
//   withUser,
//   withLayout,
//   withAppBar,
//   withTimesheetDetail,
//   withApiTimesheetDetail,
//   injectIntl,

//   withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters),
//   withHandlers<AllProps, Handler>(handlerCreators),

//   lifecycle<AllProps, {}>(lifecycles),
// )(requestEditor);