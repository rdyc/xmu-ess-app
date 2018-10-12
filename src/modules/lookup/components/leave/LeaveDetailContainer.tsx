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
import { ILeaveByIdRequest } from '@lookup/classes/queries';
import { ILeaveDetail } from '@lookup/classes/response';
import { LeaveUserAction } from '@lookup/classes/types';
import { LeaveDetailComponent } from '@lookup/components/leave';
import { leaveGetByIdDispose, leaveGetByIdRequest } from '@lookup/store/actions';
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
  leaveState: IQuerySingleState<ILeaveByIdRequest, ILeaveDetail>;
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
  
  leaveDispatch: {
    getByIdRequest: typeof leaveGetByIdRequest;
    getByIdDispose: typeof leaveGetByIdDispose;
  };
}

interface RouteParams {
  leaveUid: string;
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

class LeaveDetail extends React.Component<AllProps, State> {
  public state: State = initialState;

  public componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, leaveDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    leaveDispatch.getByIdDispose();
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.leaveState.response !== this.props.leaveState.response) {
      this.generateMenus(nextProps);
    }
  }

  public componentDidMount() {
    const { layoutDispatch, appBarDispatch, intl } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU48',
      title: intl.formatMessage({id: 'leave.detail.title'}),
      subTitle : intl.formatMessage({id: 'leave.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    appBarDispatch.assignCallback(this.handleMenuClick);

    this.loadData();
  }

  public render () {
    const { isLoading, response } = this.props.leaveState;

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
          <LeaveDetailComponent {...this.props}  />
        }
        {this.renderDialog(this.state)}
      </div>
    );
  }

  private renderDialog = (state: State) => (
    <Dialog
      fullScreen={state.dialogFullScreen}
      open={state.dialogOpen}
      aria-labelledby="leave-detail-dialog-title"
      aria-describedby="leave-detail-dialog-description"
    >
      <DialogTitle id="leave-detail-dialog-title">
        {state.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="leave-detail-dialog-description">
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

  private loadData = (): void => {
    const { layoutState, leaveDispatch, match } = this.props;
    
    if (layoutState.user) {
      leaveDispatch.getByIdRequest({
        companyUid: layoutState.user.company.uid,
        leaveUid: match.params.leaveUid
      });
    }
  }

  private generateMenus = (currentProps: AllProps) => {
    const { intl } = currentProps;
    const { response } = currentProps.leaveState;

    const currentMenus = [
      {
        id: LeaveUserAction.Refresh,
        name: intl.formatMessage({id: 'global.action.refresh'}),
        enabled: true,
        visible: true
      },
      {
        id: LeaveUserAction.Modify,
        name: intl.formatMessage({id: 'leave.action.modify'}),
        enabled: response !== undefined,
        visible: true
      },
    ];

    this.props.appBarDispatch.assignMenus(currentMenus);
  }

  private handleMenuClick = (menu: IAppBarMenu): void => {
    switch (menu.id) {
      case LeaveUserAction.Refresh:
        this.handleLeaveRefresh();
        break;
      
      case LeaveUserAction.Modify:
        this.handleLeaveModify();
        break;
    
      default:
        break;
    }
  };

  private handleLeaveRefresh = () => {
    const { leaveDispatch } = this.props;

    leaveDispatch.getByIdDispose();
    
    this.loadData();
  };

  private handleLeaveModify = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'leave.dialog.modifyTitle'}), 
      intl.formatMessage({id: 'leave.dialog.modifyDescription'}),
      intl.formatMessage({id: 'global.action.disaggree'}),
      intl.formatMessage({id: 'global.action.aggree'}),
    );
  }; 

  private handleDialogOpen = (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
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

  private handleDialogClose = () => {
    this.setState(initialState);
  };

  private handleDialogConfirmed = () => {
    const { match, history } = this.props;
    const leaveUid = match.params.leaveUid;

    this.handleDialogClose();

    history.push('/leave/form/', { uid: leaveUid });
  };
}

const mapStateToProps = ({ layout, leaveGetById }: IAppState) => ({
  layoutState: layout,
  leaveState: leaveGetById
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
  
  leaveDispatch: {
    getByIdRequest: (request: ILeaveByIdRequest) => dispatch(leaveGetByIdRequest(request)),
    getByIdDispose: () => dispatch(leaveGetByIdDispose()),
  },
});

export const LeaveDetailContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(LeaveDetail)
  )
);
