// import { IAppState, IQueryCollectionState } from '@generic/interfaces';
// import { ConnectedReduxProps, SortDirection } from '@generic/types';
// import { ILayoutState, IListBarCallback, ICollectionValue, IListBarState, IView } from '@layout/interfaces';
// import {
//   layoutActionCentreHide,
//   layoutActionCentreShow,
//   layoutChangeView,
//   layoutModeListOff,
//   layoutModeListOn,
//   layoutModeSearchOff,
//   layoutModeSearchOn,
//   layoutMoreHide,
//   layoutMoreShow,
//   layoutSearchHide,
//   layoutSearchShow,
//   listBarAssignCallbacks,
//   listBarAssignFields,
//   listBarChangeDirection,
//   listBarChangeOrder,
//   listBarChangeSize,
//   listBarDispose,
// } from '@layout/store/actions';
// import { ILeaveAllRequest } from '@lookup/classes/queries';
// import { ILeave } from '@lookup/classes/response';
// import { LeaveField } from '@lookup/classes/types';
// import { LeaveListComponent } from '@lookup/components/leave';
// import { leaveGetAllRequest } from '@lookup/store/actions';
// import { Paper, Typography, WithStyles, withStyles } from '@material-ui/core';
// import styles from '@styles';
// import * as React from 'react';
// import { InjectedIntlProps, injectIntl } from 'react-intl';
// import { connect } from 'react-redux';
// import { RouteComponentProps } from 'react-router';
// import { Dispatch } from 'redux';

// interface PropsFromState extends RouteComponentProps<void> {
//   layoutState: ILayoutState;
//   listBarState: IListBarState;
//   leaveState: IQueryCollectionState<ILeaveAllRequest, ILeave>;
// }

// interface PropsFromDispatch {
//   layoutDispatch: {
//     changeView: typeof layoutChangeView;
//     modeSearchOn: typeof layoutModeSearchOn;
//     modeSearchOff: typeof layoutModeSearchOff;
//     modeListOn: typeof layoutModeListOn;
//     modeListOff: typeof layoutModeListOff;
//     searchShow: typeof layoutSearchShow;
//     searchHide: typeof layoutSearchHide;
//     actionCentreShow: typeof layoutActionCentreShow;
//     actionCentreHide: typeof layoutActionCentreHide;
//     moreShow: typeof layoutMoreShow;
//     moreHide: typeof layoutMoreHide;
//   };
  
//   listBarDispatch: {
//     assignCallbacks: typeof listBarAssignCallbacks,
//     assignFields: typeof listBarAssignFields;
//     changeOrder: typeof listBarChangeOrder;
//     changeDirection: typeof listBarChangeDirection;
//     changeSize: typeof listBarChangeSize;
//     dispose: typeof listBarDispose;
//   };  

//   leaveDispatch: {
//     getAllRequest: typeof leaveGetAllRequest;
//   };
// }

// type AllProps = PropsFromState & 
//                 PropsFromDispatch & 
//                 ConnectedReduxProps & 
//                 InjectedIntlProps & 
//                 WithStyles<typeof styles>;

// class LeaveList extends React.Component<AllProps> {
//   public state = {
//     orderBy: this.props.listBarState.orderBy || '',
//     direction: this.props.listBarState.direction || 'descending',
//     page: this.props.listBarState.page || 1,
//     size: this.props.listBarState.size || 10
//   };

//  public componentWillUnmount() {
//     const { layoutDispatch, listBarDispatch } = this.props;

//     layoutDispatch.changeView(null);
//     layoutDispatch.modeListOff();
//     layoutDispatch.searchHide();
//     layoutDispatch.modeSearchOff();
//     layoutDispatch.actionCentreHide();
//     layoutDispatch.moreHide();

//     listBarDispatch.dispose();
//   }

//   public componentDidMount() {
//     const { layoutDispatch, leaveState, listBarDispatch, intl } = this.props;

//     layoutDispatch.changeView({
//       menuUid: 'MNU48',
//       title: intl.formatMessage({id: 'leave.title'}),
//       subTitle : intl.formatMessage({id: 'leave.subTitle'})
//     });

//     layoutDispatch.modeListOn();
//     layoutDispatch.searchShow();
//     layoutDispatch.actionCentreShow();

//     listBarDispatch.assignCallbacks({
//       onNextCallback: this.handleOnNextCallback,
//       onPrevCallback: this.handleOnPrevCallback,
//       onSyncCallback: this.handleOnSyncCallback,
//       onOrderCallback: this.handleOnOrderCallback,
//       onDirectionCallback: this.handleOnSortCallback,
//       onAddCallback: this.handleOnPrevCallback,
//       onSizeCallback: this.handleOnSizeCallback,
//     });

//     const items = Object.keys(LeaveField).map(key => ({ id: key, name: LeaveField[key] }));

//     listBarDispatch.assignFields(items);

//     if (leaveState.response === undefined) {
//       this.loadData();
//     }
//   }

//   public render () {
//     const { isLoading, response } = this.props.leaveState;

//     return (
//       <Paper 
//         square 
//         elevation={1}
//       >
//         {
//           isLoading && 
//           !response &&
//           <Typography variant="body2">loading</Typography>
//         }
//         {
//           response && 
//           <LeaveListComponent {...this.props}  />
//         }
//       </Paper>
//     );
//   }

//   private loadData = () => {
//     const { layoutState, leaveDispatch } = this.props;

//     if (layoutState.user) {
//       leaveDispatch.getAllRequest({
//         filter: {
//           find: undefined,
//           findBy: undefined,
//           direction: this.state.direction,
//           orderBy: this.state.orderBy,
//           page: this.state.page,
//           size: this.state.size,
//         }
//       }); 
//     }
//   }

//   private handleOnNextCallback = () => this.setPaging(true);

//   private handleOnPrevCallback = () => this.setPaging(false);

//   private handleOnSyncCallback = () => {
//     this.state.page = 1;

//     this.loadData();
//   }

//   private handleOnOrderCallback = (field: ICollectionValue) => {
//     this.state.page = 1;
//     this.state.orderBy = field.id;

//     this.loadData();
//   }

//   private handleOnSortCallback = (direction: SortDirection) => {
//     this.state.page = 1;
//     this.state.direction = direction;

//     this.loadData();
//   }

//   private handleOnSizeCallback = (size: number) => {
//     this.state.page = 1;
//     this.state.size = size;

//     this.loadData();
//   }

//   private setPaging = (isNext: boolean) => {
//     const { response } = this.props.leaveState;

//     if (response && response.metadata) {
//       if (isNext) {
//         this.state.page = response.metadata.paginate.current + 1;          
//       } else {
//         this.state.page = response.metadata.paginate.current - 1;
//       }
      
//       this.loadData();
//     }
//   }
// }

// const mapStateToProps = ({ layout, listBar, leaveGetAll }: IAppState) => ({
//   layoutState: layout,
//   listBarState: listBar,
//   leaveState: leaveGetAll
// });

// const mapDispatchToProps = (dispatch: Dispatch) => ({
//   layoutDispatch: {
//     changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
//     modeSearchOn: () => dispatch(layoutModeSearchOn()),
//     modeSearchOff: () => dispatch(layoutModeSearchOff()),
//     modeListOn: () => dispatch(layoutModeListOn()),
//     modeListOff: () => dispatch(layoutModeListOff()),
//     searchShow: () => dispatch(layoutSearchShow()),
//     searchHide: () => dispatch(layoutSearchHide()),
//     actionCentreShow: () => dispatch(layoutActionCentreShow()),
//     actionCentreHide: () => dispatch(layoutActionCentreHide()),
//     moreShow: () => dispatch(layoutMoreShow()),
//     moreHide: () => dispatch(layoutMoreHide()),
//   },

//   listBarDispatch: {
//     assignCallbacks: (callbacks: IListBarCallback) => dispatch(listBarAssignCallbacks(callbacks)),
//     assignFields: (fields: ICollectionValue[]) => dispatch(listBarAssignFields(fields)),
//     changeOrder: (name: string) => dispatch(listBarChangeOrder(name)),
//     changeSize: (size: number) => dispatch(listBarChangeSize(size)),
//     changeDirection: (direction: SortDirection) => dispatch(listBarChangeDirection(direction)),
//     dispose: () => dispatch(listBarDispose())
//   },

//   leaveDispatch: {
//     getAllRequest: (request: ILeaveAllRequest) => dispatch(leaveGetAllRequest(request)),
//   }
// });

// export const LeaveListContainer = connect(
//   mapStateToProps, 
//   mapDispatchToProps
// )(
//   withStyles(styles)(
//     injectIntl(LeaveList)
//   )
// );