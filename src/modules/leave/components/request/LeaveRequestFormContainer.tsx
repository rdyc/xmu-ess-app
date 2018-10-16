// import { LeaveRequestType } from '@common/classes/types';
// import { IAppState, IQuerySingleState } from '@generic/interfaces';
// import { ConnectedReduxProps, FormMode } from '@generic/types';
// import { IAlert, ILayoutState, IView } from '@layout/interfaces';
// import { layoutAlertAdd, layoutChangeView, layoutNavBackHide, layoutNavBackShow } from '@layout/store/actions';
// import { Typography, WithStyles, withStyles } from '@material-ui/core';
// import { ILeaveRequestGetByIdRequest, ILeaveRequestPutRequest } from '@leave/classes/queries';
// import { ILeaveRequestPutPayload } from '@leave/classes/request';
// import { ILeaveRequest, ILeaveRequestDetail } from '@leave/classes/response';
// import LeaveRequestFormComponent from '@leave/components/request/LeaveRequestFormComponent';
// import { leaveRequestGetByIdDispose, leaveRequestGetByIdRequest, leaveRequestPutDispose, leaveRequestPutRequest } from '@leave/store/actions';
// import styles from '@styles';
// import * as React from 'react';
// import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
// import { connect } from 'react-redux';
// import { RouteComponentProps } from 'react-router';
// import { Dispatch } from 'redux';
// import { FormErrors } from 'redux-form';
// import { isNullOrUndefined } from 'util';

// interface PropsFromState extends RouteComponentProps<void> {
//   layoutState: ILayoutState;
//   leaveRequestGetState: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
//   leaveRequestPutState: IQuerySingleState<ILeaveRequestPutRequest, ILeaveRequest>;
// }

// interface PropsFromDispatch {
//   layoutDispatch: {
//     changeView: typeof layoutChangeView;
//     navBackShow: typeof layoutNavBackShow;
//     navBackHide: typeof layoutNavBackHide;
//     alertAdd: typeof layoutAlertAdd;
//   };

//   leaveRequestDispatch: {
//     getByIdRequest: typeof leaveRequestGetByIdRequest;
//     getByIdDispose: typeof leaveRequestGetByIdDispose;
//     putRequest: typeof leaveRequestPutRequest;
//     putDispose: typeof leaveRequestPutDispose;
//   };
// }

// interface RouteParams {
//   leaveRequestUid: string;
// }

// type AllProps = PropsFromState & 
//                 PropsFromDispatch & 
//                 RouteComponentProps<RouteParams> & 
//                 ConnectedReduxProps & 
//                 InjectedIntlProps & 
//                 WithStyles<typeof styles>;

// const initialState = {
//   mode: FormMode.New,
//   companyUid: '',
//   positionUid: '',
//   leaveRequestUid: ''
// };

// type State = Readonly<typeof initialState>;