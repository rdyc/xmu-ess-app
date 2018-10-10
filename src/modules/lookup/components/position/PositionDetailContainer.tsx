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
import { IPositionGetByIdRequest } from '@lookup/classes/queries';
import { IPositionDetail } from '@lookup/classes/response';
import { PositionUserAction } from '@lookup/classes/types';
import { PositionDetailComponent } from '@lookup/components/position';
import { positionGetByIdDispose, positionGetByIdRequest } from '@lookup/store/actions';
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
  positionState: IQuerySingleState<IPositionGetByIdRequest, IPositionDetail>;
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
  
  positionDispatch: {
    getByIdRequest: typeof positionGetByIdRequest;
    getByIdDispose: typeof positionGetByIdDispose;
  };
}

interface RouteParams {
  positionUid: string;
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

class PositionDetail extends React.Component<AllProps, State> {
  public state: State = initialState;

  public componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, positionDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    positionDispatch.getByIdDispose();
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.positionState.response !== this.props.positionState.response) {
      this.generateMenus(nextProps);
    }
  }

  public componentDidMount() {
    const { layoutDispatch, appBarDispatch, intl } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU06',
      title: intl.formatMessage({id: 'position.detail.title'}),
      subTitle : intl.formatMessage({id: 'position.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    appBarDispatch.assignCallback(this.handleMenuClick);

    this.loadData();
  }

  public render () {
    const { isLoading, response } = this.props.positionState;

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
          <PositionDetailComponent {...this.props}  />
        }
        {this.renderDialog(this.state)}
      </div>
    );
  }

  private renderDialog = (state: State) => (
    <Dialog
      fullScreen={state.dialogFullScreen}
      open={state.dialogOpen}
      aria-labelledby="position-detail-dialog-title"
      aria-describedby="position-detail-dialog-description"
    >
      <DialogTitle id="position-detail-dialog-title">
        {state.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="position-detail-dialog-description">
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
    const { layoutState, positionDispatch, match } = this.props;
    
    if (layoutState.user) {
      positionDispatch.getByIdRequest({
        companyUid: layoutState.user.company.uid,
        positionUid: match.params.positionUid
      });
    }
  }

  private generateMenus = (currentProps: AllProps) => {
    const { intl } = currentProps;
    const { response } = currentProps.positionState;
    
    const currentMenus = [
      {
        id: PositionUserAction.Refresh,
        name: intl.formatMessage({id: 'global.action.refresh'}),
        enabled: true,
        visible: true
      },
      {
        id: PositionUserAction.Modify,
        name: intl.formatMessage({id: 'global.action.modify'}),
        enabled: response !== undefined,
        visible: true
      }
    ];

    this.props.appBarDispatch.assignMenus(currentMenus);
  }
  
  private handleMenuClick = (menu: IAppBarMenu): void => {
    switch (menu.id) {
      case PositionUserAction.Refresh:
        this.handlePositionRefresh();
        break;
      
      case PositionUserAction.Modify:
        this.handlePositionModify();
        break;
    
      default:
        break;
    }
  };

  private handlePositionRefresh = () => {
    const { positionDispatch } = this.props;

    positionDispatch.getByIdDispose();
    
    this.loadData();
  };

  private handlePositionModify = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'position.dialog.modifyTitle'}), 
      intl.formatMessage({id: 'position.dialog.modifyDescription'}),
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
    const positionUid = match.params.positionUid;

    this.handleDialogClose();

    history.push('/lookup/position/form/', { uid: positionUid });
  };
}

const mapStateToProps = ({ layout, positionGetById }: IAppState) => ({
  layoutState: layout,
  positionState: positionGetById
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
  
  positionDispatch: {
    getByIdRequest: (request: IPositionGetByIdRequest) => dispatch(positionGetByIdRequest(request)),
    getByIdDispose: () => dispatch(positionGetByIdDispose()),
  },
});

export const PositionDetailContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(PositionDetail)
  )
);