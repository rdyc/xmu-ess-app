// import { FormMode } from '@generic/types';
// import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
// import { WithLayout, withLayout } from '@layout/hoc/withLayout';
// import { WithUser, withUser } from '@layout/hoc/withUser';
// import { layoutMessage } from '@layout/locales/messages';
// import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import {
//   compose,
//   HandleCreators,
//   lifecycle,
//   mapper,
//   ReactLifeCycleFunctions,
//   StateHandler,
//   StateHandlerMap,
//   StateUpdaters,
//   withHandlers,
//   withStateHandlers,
// } from 'recompose';
// import { Dispatch } from 'redux';
// import { FormErrors } from 'redux-form';
// import { isNullOrUndefined, isObject } from 'util';
// import { WithAccountEmployee } from '@account/hoc/withAccountEmployee';

// interface OwnHandlers {
//   handleValidate: (payload: SystemLimitFormData) => FormErrors;
//   handleSubmit: (payload: SystemLimitFormData) => void;
//   handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
//   handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
// }

// interface OwnRouteParams {
//   employeeUid: string;
// }

// interface OwnState {
//   formMode: FormMode;
//   employeeUid?: string | undefined;

//   companyUid?: string | undefined;

//   submitDialogTitle: string;
//   submitDialogContentText: string;
//   submitDialogCancelText: string;
//   submitDialogConfirmedText: string;
// }

// interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
//   stateUpdate: StateHandler<OwnState>;
// }

// export type AccountEmployeeEditorProps
//   = WithAccountEmployee
//   & WithUser
//   & WithLayout
//   & WithAppBar
//   & RouteComponentProps<OwnRouteParams>
//   & InjectedIntlProps
//   & OwnHandlers
//   & OwnState
//   & OwnStateUpdaters;

// const handlerCreators: HandleCreators<AccountEmployeeEditorProps, OwnHandlers> = {
//   handleValidate: (props: AccountEmployeeEditorProps) => (formData: SystemLimitFormData) => { 
//     const errors = {
//       information: {}
//     };
  
//     const requiredFields = [
//       'categoryType', 'days'
//     ];
  
//     requiredFields.forEach(field => {
//       if (!formData.information[field] || isNullOrUndefined(formData.information[field])) {
//         errors.information[field] = props.intl.formatMessage(lookupMessage.systemLimit.fieldFor(field, 'fieldRequired'));
//       }
//     });
    
//     return errors;
//   },
//   handleSubmit: (props: AccountEmployeeEditorProps) => (formData: SystemLimitFormData) => { 
//     const { formMode, systemLimitUid, intl } = props;
//     const { user } = props.userState;
//     const { createRequest, updateRequest } = props.systemLimitDispatch;

//     if (!user) {
//       return Promise.reject('user was not found');
//     }

//     const payload = {
//       ...formData.information
//     };

//     // creating
//     if (formMode === FormMode.New) {
//       return new Promise((resolve, reject) => {
//         createRequest({
//           resolve, 
//           reject,
//           companyUid: payload.companyUid ? payload.companyUid : '',
//           data: payload as ISystemLimitPostPayload
//         });
//       });
//     }

//     // update checking
//     if (!systemLimitUid) {
//       const message = intl.formatMessage(lookupMessage.systemLimit.message.emptyProps);

//       return Promise.reject(message);
//     }

//     if (formMode === FormMode.Edit) {
//       return new Promise((resolve, reject) => {
//         updateRequest({
//           resolve, 
//           reject,
//           systemLimitUid,
//           companyUid: payload.companyUid ? payload.companyUid : '',
//           data: payload as ISystemLimitPutPayload, 
//         });
//       });
//     }

//     return null;
//   },
//   handleSubmitSuccess: (props: AccountEmployeeEditorProps) => (response: ISystemLimit) => {
//     const { formMode, intl, history } = props;
//     const { alertAdd } = props.layoutDispatch;
    
//     let message: string = '';

//     if (formMode === FormMode.New) {
//       message = intl.formatMessage(lookupMessage.systemLimit.message.createSuccess, { uid: response.uid });
//     }

//     if (formMode === FormMode.Edit) {
//       message = intl.formatMessage(lookupMessage.systemLimit.message.updateSuccess, { uid: response.uid });
//     }

//     alertAdd({
//       message,
//       time: new Date()
//     });

//     history.push(`/lookup/systemlimits/${response.uid}`, { companyuid: response.companyUid });
//   },
//   handleSubmitFail: (props: AccountEmployeeEditorProps) => (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => {
//     const { formMode, intl } = props;
//     const { alertAdd } = props.layoutDispatch;
    
//     if (errors) {
//       // validation errors from server (400: Bad Request)
//       alertAdd({
//         time: new Date(),
//         message: isObject(submitError) ? submitError.message : submitError
//       });
//     } else {
//       // another errors from server
//       let message: string = '';

//       if (formMode === FormMode.New) {
//         message = intl.formatMessage(lookupMessage.systemLimit.message.createFailure);
//       }

//       if (formMode === FormMode.Edit) {
//         message = intl.formatMessage(lookupMessage.systemLimit.message.updateFailure);
//       }

//       alertAdd({
//         message,
//         time: new Date(),
//         details: isObject(submitError) ? submitError.message : submitError
//       });
//     }
//   }
// };