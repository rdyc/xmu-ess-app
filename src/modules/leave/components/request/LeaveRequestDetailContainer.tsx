import { WorkflowStatusType } from '@common/classes/types';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import { IAppBarMenu, ILayoutState, IView } from '@layout/interfaces';
import {
  appBarAssignCallback,
  appBarAssignMenus,
  appBarDispose,
  layoutActionCentreHide,
  layoutActionCentreShow,
  layoutChangeView,
  layoutMoreHide,
  layoutMoreShow,
  layoutNavBackHide,
  layoutNavBackShow,
} from '@layout/store/actions';
import { ILeaveRequestGetByIdRequest } from '@leave/classes/queries';
import { ILeaveRequestDetail } from '@leave/classes/response';
import { LeaveRequestUserAction } from '@leave/classes/types';
import { LeaveRequestDetailComponent } from '@leave/components/request/LeaveRequestDetailComponent';
import { leaveRequestGetByIdDispose, leaveRequestGetByIdRequest } from '@leave/store/actions';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
  WithStyles,
  withStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  leaveRequestState: IQuerySingleState<ILeaveRequestGetByIdRequest, ILeaveRequestDetail>;
}

interface PropsFromDispatch {
  layoutDispatch: {
    changeView: typeof layoutChangeView;
    navBackShow: typeof layoutNavBackShow;
    navBackHide: typeof layoutNavBackHide;
    actionCentreShow: typeof layoutActionCentreShow;
    actionCentreHide: typeof layoutActionCentreHide;
    moreShow: typeof layoutMoreShow;
    moreHide: typeof layoutMoreHide;
  };

  appBarDispatch: {
    assignCallback: typeof appBarAssignCallback;
    assignMenus: typeof appBarAssignMenus;
    dispose: typeof appBarDispose;
  };
  
  leaveRequestDispatch: {
    getByIdRequest: typeof leaveRequestGetByIdRequest;
    getByIdDispose: typeof leaveRequestGetByIdDispose;
  };
}

interface RouteParams {
  leaveRequestUid: string;
}

type AllProps = PropsFromState & 
                PropsFromDispatch & 
                RouteComponentProps<RouteParams> & 
                ConnectedReduxProps & 
                InjectedIntlProps & 
                WithStyles<typeof styles>;

const initialState = {
  dialogFullScreen: false,
  dialogOpen: false,
  dialogTitle: 'undefined!',
  dialogDescription: 'undefined!',
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
};

type State = Readonly<typeof initialState>;

class LeaveRequestDetailContainer extends React.Component<AllProps, State> {
  state: State = initialState;

  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, leaveRequestDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    leaveRequestDispatch.getByIdDispose();
  }

  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.leaveRequestState.response !== this.props.leaveRequestState.response) {
      this.generateMenus(nextProps);
    }
  }

  componentDidMount() {
    const { layoutDispatch, appBarDispatch, intl } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU16',
      title: intl.formatMessage({id: 'leaveRequest.detail.title'}),
      subTitle : intl.formatMessage({id: 'leaveRequest.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    appBarDispatch.assignCallback(this.handleMenuClick);

    this.loadData();
  }

  generateMenus = (currentProps: AllProps) => {
    const { intl } = currentProps;
    const { response } = currentProps.leaveRequestState;

    const isStatusTypeEquals = (statusTypes: string[]): boolean => {
      let result = false;

      if (response && response.data) {
        result = statusTypes.indexOf(response.data.statusType) !== -1;
      }

      return result;
    };

    const currentMenus = [
      {
        id: LeaveRequestUserAction.Refresh,
        name: intl.formatMessage({id: 'global.action.refresh'}),
        enabled: true,
        visible: true
      },
      {
        id: LeaveRequestUserAction.Modify,
        name: intl.formatMessage({id: 'leaveRequest.action.modify'}),
        enabled: response !== undefined,
        visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
      },
    ];
    this.props.appBarDispatch.assignMenus(currentMenus);
  }

    handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case LeaveRequestUserAction.Refresh:
          this.handleLeaveRequestRefresh();
          break;
        
        case LeaveRequestUserAction.Modify:
          this.handleLeaveRequestModify();
          break;

        default:
          break;
      }
    };

    handleLeaveRequestRefresh = () => {
      const { leaveRequestDispatch } = this.props;
  
      leaveRequestDispatch.getByIdDispose();
      
      this.loadData();
    };
  
    handleLeaveRequestModify = () => {
      const { intl } = this.props;
  
      this.handleDialogOpen(
        intl.formatMessage({id: 'leave.dialog.modifyTitle'}), 
        intl.formatMessage({id: 'leave.dialog.modifyDescription'}),
        intl.formatMessage({id: 'global.action.disaggree'}),
        intl.formatMessage({id: 'global.action.aggree'}),
      );
    };

    handleDialogOpen = (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
      const { intl } = this.props;
  
      this.setState({ 
        dialogFullScreen: fullScreen || false,
        dialogOpen: true,
        dialogTitle: title,
        dialogDescription: description,
        dialogCancelText: cancelText || intl.formatMessage({id: this.state.dialogCancelText}),
        dialogConfirmedText: confirmText || intl.formatMessage({id: this.state.dialogConfirmedText})
      });
    };
  
    handleDialogClose = () => {
      this.setState(initialState);
    };
  
    handleDialogConfirmed = () => {
      const { match, history } = this.props;
      const leaveRequestUid = match.params.leaveRequestUid;
  
      this.handleDialogClose();
  
      history.push('/leave/form/', { uid: leaveRequestUid });
    };
  
    loadData = (): void => {
      const { layoutState, leaveRequestDispatch, match } = this.props;
      
      if (layoutState.user) {
        leaveRequestDispatch.getByIdRequest({
          companyUid: layoutState.user.company.uid,
          positionUid: layoutState.user.position.uid,
          leaveRequestUid: match.params.leaveRequestUid
        });
      }
    }

    renderDialog = (state: State) => (
      <Dialog
        fullScreen={state.dialogFullScreen}
        open={state.dialogOpen}
        aria-labelledby="leaveRequest-detail-dialog-title"
        aria-describedby="leaveRequest-detail-dialog-description"
      >
        <DialogTitle id="leaveRequest-detail-dialog-title">
          {state.dialogTitle}
        </DialogTitle>
        <DialogContent>
          <DialogContentText id="leaveRequest-detail-dialog-description">
            {state.dialogDescription}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={this.handleDialogClose} color="primary">
            {state.dialogCancelText}
          </Button>
          <Button onClick={this.handleDialogConfirmed} color="primary" autoFocus>
            {state.dialogConfirmedText}
          </Button>
        </DialogActions>
      </Dialog>
    );
  
    render () {
      const { isLoading, response } = this.props.leaveRequestState;
  
      return (
        <div>
          {
            isLoading && 
            <Typography variant="body2">
              <FormattedMessage id="global.loading"/>
            </Typography>
          }
          {
            response && 
            <LeaveRequestDetailComponent {...this.props}  />
          }
          {this.renderDialog(this.state)}
        </div>
      );
    }
  }
  
const mapStateToProps = ({ layout, leaveRequestGetById }: IAppState) => ({
    layoutState: layout,
    leaveRequestState: leaveRequestGetById
  });
  
const mapDispatchToProps = (dispatch: Dispatch) => ({
    layoutDispatch: {
      changeView: (page: IView | null) => dispatch(layoutChangeView(page)),
      navBackShow: () => dispatch(layoutNavBackShow()),
      navBackHide: () => dispatch(layoutNavBackHide()),
      actionCentreShow: () => dispatch(layoutActionCentreShow()),
      actionCentreHide: () => dispatch(layoutActionCentreHide()),
      moreShow: () => dispatch(layoutMoreShow()),
      moreHide: () => dispatch(layoutMoreHide()),
    },
  
    appBarDispatch: {
      assignCallback: (callback: (menu: IAppBarMenu) => void) => dispatch(appBarAssignCallback(callback)),
      assignMenus: (menus: IAppBarMenu[]) => dispatch(appBarAssignMenus(menus)),
      dispose: () => dispatch(appBarDispose()),
    },
    
    leaveRequestDispatch: {
      getByIdRequest: (request: ILeaveRequestGetByIdRequest) => dispatch(leaveRequestGetByIdRequest(request)),
      getByIdDispose: () => dispatch(leaveRequestGetByIdDispose()),
    },
  });
  
export default connect(
    mapStateToProps, 
    mapDispatchToProps
  )(
    withStyles(styles)(
      injectIntl(LeaveRequestDetailContainer)
  )
);
    