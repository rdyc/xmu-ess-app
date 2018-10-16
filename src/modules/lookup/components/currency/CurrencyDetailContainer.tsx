// import AppMenu from '@constants/AppMenu';
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
// import { ICurrencyByIdRequest } from '@lookup/classes/queries';
// import { ICurrencyDetail } from '@lookup/classes/response/';
// import { CurrencyUserAction } from '@lookup/classes/types';
// import { CurrencyDetailComponent } from '@lookup/components/currency';
// import { currencyGetByIdDispose, currencyGetByIdRequest } from '@lookup/store/actions';
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
//   currencyState: IQuerySingleState<ICurrencyByIdRequest, ICurrencyDetail>;
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
  
//   currencyDispatch: {
//     getByIdRequest: typeof currencyGetByIdRequest;
//     getByIdDispose: typeof currencyGetByIdDispose;
//   };
// }

// interface RouteParams {
//   currencyUid: string;
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

// class CurrencyDetail extends React.Component<AllProps, State> {
//   public state: State = initialState;

//   public componentWillUnmount() {
//     const { layoutDispatch, appBarDispatch, currencyDispatch } = this.props;

//     layoutDispatch.changeView(null);
//     layoutDispatch.navBackHide();
//     layoutDispatch.moreHide();
//     layoutDispatch.actionCentreHide();

//     appBarDispatch.dispose();

//     currencyDispatch.getByIdDispose();
//   }

//   public componentWillReceiveProps(nextProps: AllProps) {
//     if (nextProps.currencyState.response !== this.props.currencyState.response) {
//       this.generateMenus(nextProps);
//     }
//   }

//   public componentDidMount() {
//     const { layoutDispatch, appBarDispatch, intl } = this.props;

//     layoutDispatch.changeView({
//       menuUid: AppMenu.Lookup,
//       title: intl.formatMessage({id: 'lookup.currency.title'}),
//       subTitle : intl.formatMessage({id: 'lookup.currency.subTitle'})
//     });

//     layoutDispatch.navBackShow();
//     layoutDispatch.moreShow();

//     appBarDispatch.assignCallback(this.handleMenuClick);

//     this.loadData();
//   }

//   public render () {
//     const { isLoading, response } = this.props.currencyState;

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
//           <CurrencyDetailComponent {...this.props}  />
//         }
//         {this.renderDialog(this.state)}
//       </div>
//     );
//   }

//   private renderDialog = (state: State) => (
//     <Dialog
//       fullScreen={state.dialogFullScreen}
//       open={state.dialogOpen}
//       aria-labelledby="currency-detail-dialog-title"
//       aria-describedby="currency-detail-dialog-description"
//     >
//       <DialogTitle id="currency-detail-dialog-title">
//         {state.dialogTitle}
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText id="currency-detail-dialog-description">
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
//     const { layoutState, currencyDispatch, match } = this.props;
    
//     if (layoutState.user) {
//       currencyDispatch.getByIdRequest({
//         currencyUid: match.params.currencyUid
//       });
//     }
//   }

//   private generateMenus = (currentProps: AllProps) => {
//     const { intl } = currentProps;
//     const { response } = currentProps.currencyState;
    
//     const currentMenus = [
//       {
//         id: CurrencyUserAction.Refresh,
//         name: intl.formatMessage({id: 'global.action.refresh'}),
//         enabled: true,
//         visible: true
//       },
//       {
//         id: CurrencyUserAction.Modify,
//         name: intl.formatMessage({id: 'global.action.modify'}),
//         enabled: response !== undefined,
//         visible: true
//       }
//     ];

//     this.props.appBarDispatch.assignMenus(currentMenus);
//   }
  
//   private handleMenuClick = (menu: IAppBarMenu): void => {
//     switch (menu.id) {
//       case CurrencyUserAction.Refresh:
//         this.handleCurrencyRefresh();
//         break;
      
//       case CurrencyUserAction.Modify:
//         this.handleCurrencyModify();
//         break;
    
//       default:
//         break;
//     }
//   };

//   private handleCurrencyRefresh = () => {
//     const { currencyDispatch } = this.props;

//     currencyDispatch.getByIdDispose();
    
//     this.loadData();
//   };

//   private handleCurrencyModify = () => {
//     const { intl } = this.props;

//     this.handleDialogOpen(
//       intl.formatMessage({id: 'currency.dialog.modifyTitle'}), 
//       intl.formatMessage({id: 'currency.dialog.modifyDescription'}),
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
//     const currencyUid = match.params.currencyUid;

//     this.handleDialogClose();

//     history.push('/currency/form/', { uid: currencyUid });
//   };
// }

// const mapStateToProps = ({ layout, currencyGetById }: IAppState) => ({
//   layoutState: layout,
//   currencyState: currencyGetById
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
  
//   currencyDispatch: {
//     getByIdRequest: (request: ICurrencyByIdRequest) => dispatch(currencyGetByIdRequest(request)),
//     getByIdDispose: () => dispatch(currencyGetByIdDispose()),
//   },
// });

// export const CurrencyDetailContainer = connect(
//   mapStateToProps, 
//   mapDispatchToProps
// )(
//   withStyles(styles)(
//     injectIntl(CurrencyDetail)
//   )
// );