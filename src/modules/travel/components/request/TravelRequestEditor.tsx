// import { FormMode } from '@generic/types';
// import withTravelRequestDetail, {
//   WithTravelRequestDetail,
// } from '@travel/enhancers/request/withTravelRequestDetail';
// import { StateHandler, StateHandlerMap, HandleCreators } from 'recompose';
// import { WithApiTravelRequestDetailHandler } from '@travel/enhancers/request/withApiTravelRequestDetail';
// import { WithUser } from '@layout/hoc/withUser';
// import { WithLayout } from '@layout/hoc/withLayout';
// import { WithAppBar } from '@layout/hoc/withAppBar';
// import { RouteComponentProps } from 'react-router';
// import { InjectedIntlProps } from 'react-intl';

// interface RouteParams {
//   travelUid: string;
// }

// interface State {
//   mode: FormMode;
//   companyUid?: string | undefined;
//   positionUid?: string | undefined;
//   travelUid?: string | undefined;
// }

// interface Updaters extends StateHandlerMap<State> {
//   stateUpdate: StateHandler<State>;
// }

// type AllProps
//   = WithTravelRequestDetail
//   & WithApiTravelRequestDetailHandler
//   & WithUser
//   & WithLayout
//   & WithAppBar
//   & RouteComponentProps<RouteParams>
//   & InjectedIntlProps
//   & Handler
//   & State
//   & Updaters;

//   interface Handler {
//     handleValidate: (payload: ProjectRegistrationFormData) => FormErrors;
//     handleSubmit: (payload: ProjectRegistrationFormData) => void;
//     handleSubmitSuccess: (result: any, dispatch: Dispatch<any>) => void;
//     handleSubmitFail: (errors: FormErrors | undefined, dispatch: Dispatch<any>, submitError: any) => void;
//   }