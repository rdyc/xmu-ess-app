// import { IAppState, IQuerySingleState } from '@generic/interfaces';
// import { ConnectedReduxProps } from '@generic/types';
// import { IAppBarMenu, ILayoutState, IView } from '@layout/interfaces';
// import {
//   appBarAssignCallback,
//   appBarAssignMenus,
//   appBarDispose,
//   layoutActionCentreHide,
//   layoutActionCentreShow,
//   layoutChangeView,
//   layoutMoreHide,
//   layoutMoreShow,
//   layoutNavBackHide,
//   layoutNavBackShow,
// } from '@layout/store/actions';
// import { ISystemLimitByIdRequest } from '@lookup/classes/queries';
// import { ISystemLimitDetail } from '@lookup/classes/response/';
// import { SystemLimitUserAction } from '@lookup/classes/types';
// import { SystemLimitDetailComponent } from '@lookup/components/systemLimit';
// import { systemLimitGetByIdDispose, systemLimitGetByIdRequest } from '@lookup/store/actions';
// import {
//   Button,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Typography,
//   WithStyles,
//   withStyles,
// } from '@material-ui/core';
// import styles from '@styles';
// import * as React from 'react';
// import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
// import { connect } from 'react-redux';
// import { RouteComponentProps } from 'react-router';
// import { Dispatch } from 'redux';

// interface PropsFromState extends RouteComponentProps<void> {
//   layoutState: ILayoutState;
//   systemLimitState: IQuerySingleState<ISystemLimitByIdRequest, ISystemLimitDetail>;
// }

// interface PropsFromDispatch {
//   layoutDispatch: {
//     changeView: typeof layoutChangeView;
//     navBackShow: typeof layoutNavBackShow;
//     navBackHide: typeof layoutNavBackHide;
//     actionCentreShow: typeof layoutActionCentreShow;
//     actionCentreHide: typeof layoutActionCentreHide;
//     moreShow: typeof layoutMoreShow;
//     moreHide: typeof layoutMoreHide;
//   };

//   appBarDispatch: {
//     assignCallback: typeof appBarAssignCallback;
//     assignMenus: typeof appBarAssignMenus;
//     dispose: typeof appBarDispose;
//   };
  
//   systemLimitDispatch: {
//     getByIdRequest: typeof systemLimitGetByIdRequest;
//     getByIdDispose: typeof systemLimitGetByIdDispose;
//   };
// }

// interface RouteParams {
//   systemLimitUid: string;
// }

// type AllProps = PropsFromState & 
//                 PropsFromDispatch & 
//                 RouteComponentProps<RouteParams> & 
//                 ConnectedReduxProps & 
//                 InjectedIntlProps & 
//                 WithStyles<typeof styles>;

// const initialState = {
//   dialogFullScreen: false,
//   dialogOpen: false,
//   dialogTitle: 'undefined!',
//   dialogDescription: 'undefined!',
//   dialogCancelText: 'global.action.cancel',
//   dialogConfirmedText: 'global.action.ok',
// };

// type State = Readonly<typeof initialState>;

// class SystemLimitDetail extends React.Component<AllProps, State> {
//   public state: State = initialState;

//   public componentWillUnmount() {
//     const { layoutDispatch, appBarDispatch, systemLimitDispatch } = this.props;

//     layoutDispatch.changeView(null);
//     layoutDispatch.navBackHide();
//     layoutDispatch.moreHide();
//     layoutDispatch.actionCentreHide();

//     appBarDispatch.dispose();

//     systemLimitDispatch.getByIdDispose();
//   }

//   public componentWillReceiveProps(nextProps: AllProps) {
//     if (nextProps.systemLimitState.response !== this.props.systemLimitState.response) {
//       this.generateMenus(nextProps);
//     }
//   }

//   public componentDidMount() {
//     const { layoutDispatch, appBarDispatch, intl } = this.props;

//     layoutDispatch.changeView({
//       menuUid: 'MNU55',
//       title: intl.formatMessage({id: 'systemLimit.detail.title'}),
//       subTitle : intl.formatMessage({id: 'systemLimit.detail.subTitle'})
//     });

//     layoutDispatch.navBackShow();
//     layoutDispatch.moreShow();

//     appBarDispatch.assignCallback(this.handleMenuClick);

//     this.loadData();
//   }

//   public render () {
//     const { isLoading, response } = this.props.systemLimitState;

//     return (
//       <div>
//         {
//           isLoading && 
//           <Typography variant="body2">
//             <FormattedMessage id="global.loading"/>
//           </Typography>
//         }
//         {
//           response && 
//           <SystemLimitDetailComponent {...this.props}  />
//         }
//         {this.renderDialog(this.state)}
//       </div>
//     );
//   }

//   private renderDialog = (state: State) => (
//     <Dialog
//       fullScreen={state.dialogFullScreen}
//       open={state.dialogOpen}
//       aria-labelledby="systemLimit-detail-dialog-title"
//       aria-describedby="systemLimit-detail-dialog-description"
//     >
//       <DialogTitle id="systemLimit-detail-dialog-title">
//         {state.dialogTitle}
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText id="systemLimit-detail-dialog-description">
//           {state.dialogDescription}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={this.handleDialogClose} color="primary">
//           {state.dialogCancelText}
//         </Button>
//         <Button onClick={this.handleDialogConfirmed} color="primary" autoFocus>
//           {state.dialogConfirmedText}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   private loadData = (): void => {
//     const { layoutState, systemLimitDispatch, match } = this.props;
    
//     if (layoutState.user) {
//       systemLimitDispatch.getByIdRequest({
//         companyUid:  layoutState.user.company.uid,
//         systemLimitUid: match.params.systemLimitUid
//       });
//     }
//   }

//   private generateMenus = (currentProps: AllProps) => {
//     const { intl } = currentProps;
//     const { response } = currentProps.systemLimitState;
    
//     const currentMenus = [
//       {
//         id: SystemLimitUserAction.Refresh,
//         name: intl.formatMessage({id: 'global.action.refresh'}),
//         enabled: true,
//         visible: true
//       },
//       {
//         id: SystemLimitUserAction.Modify,
//         name: intl.formatMessage({id: 'global.action.modify'}),
//         enabled: response !== undefined,
//         visible: true
//       }
//     ];

//     this.props.appBarDispatch.assignMenus(currentMenus);
//   }
  
//   private handleMenuClick = (menu: IAppBarMenu): void => {
//     switch (menu.id) {
//       case SystemLimitUserAction.Refresh:
//         this.handleSystemLimitRefresh();
//         break;
      
//       case SystemLimitUserAction.Modify:
//         this.handleSystemLimitModify();
//         break;
    
//       default:
//         break;
//     }
//   };

//   private handleSystemLimitRefresh = () => {
//     const { systemLimitDispatch } = this.props;

//     systemLimitDispatch.getByIdDispose();
    
//     this.loadData();
//   };

//   private handleSystemLimitModify = () => {
//     const { intl } = this.props;

//     this.handleDialogOpen(
//       intl.formatMessage({id: 'systemLimit.dialog.modifyTitle'}), 
//       intl.formatMessage({id: 'systemLimit.dialog.modifyDescription'}),
//       intl.formatMessage({id: 'global.action.disaggree'}),
//       intl.formatMessage({id: 'global.action.aggree'}),
//     );
//   };  

//   private handleDialogOpen = (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
//     const { intl } = this.props;

//     this.setState({ 
//       dialogFullScreen: fullScreen || false,
//       dialogOpen: true,
//       dialogTitle: title,
//       dialogDescription: description,
//       dialogCancelText: cancelText || intl.formatMessage({id: this.state.dialogCancelText}),
//       dialogConfirmedText: confirmText || intl.formatMessage({id: this.state.dialogConfirmedText})
//     });
//   };

//   private handleDialogClose = () => {
//     this.setState(initialState);
//   };

//   private handleDialogConfirmed = () => {
//     const { match, history } = this.props;
//     const systemLimitUid = match.params.systemLimitUid;

//     this.handleDialogClose();

//     history.push('/lookup/systemLimit/form/', { uid: systemLimitUid });
//   };
// }

// const mapStateToProps = ({ layout, systemLimitGetById }: IAppState) => ({
//   layoutState: layout,
//   systemLimitState: systemLimitGetById
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   layoutDispatch: {
//     changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
//     navBackShow: () => dispatch(layoutNavBackShow()),
//     navBackHide: () => dispatch(layoutNavBackHide()),
//     actionCentreShow: () => dispatch(layoutActionCentreShow()),
//     actionCentreHide: () => dispatch(layoutActionCentreHide()),
//     moreShow: () => dispatch(layoutMoreShow()),
//     moreHide: () => dispatch(layoutMoreHide()),
//   },

//   appBarDispatch: {
//     assignCallback: (callback: (menu: IAppBarMenu) => void) => dispatch(appBarAssignCallback(callback)),
//     assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
//     dispose: () => dispatch(appBarDispose()),
//   },
  
//   systemLimitDispatch: {
//     getByIdRequest: (request: ISystemLimitByIdRequest) => dispatch(systemLimitGetByIdRequest(request)),
//     getByIdDispose: () => dispatch(systemLimitGetByIdDispose()),
//   },
// });

// export const SystemLimitDetailContainer = connect(
//   mapStateToProps, 
//   mapDispatchToProps
// )(
//   withStyles(styles)(
//     injectIntl(SystemLimitDetail)
//   )
// );