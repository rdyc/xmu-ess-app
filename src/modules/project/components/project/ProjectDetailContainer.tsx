import { WorkflowStatusType } from '@common/classes/types';
import { IAppState, IQuerySingleState } from '@generic/interfaces';
import { ConnectedReduxProps } from '@generic/types';
import withUser, { WithUser } from '@layout/hoc/withUser';
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
import { IProjectGetByIdRequest } from '@project/classes/queries';
import { IProjectDetail } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import { ProjectDetailComponent } from '@project/components/project';
import { projectGetByIdDispose, projectGetByIdRequest } from '@project/store/actions';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  projectState: IQuerySingleState<IProjectGetByIdRequest, IProjectDetail>;
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
  
  projectDispatch: {
    getByIdRequest: typeof projectGetByIdRequest;
    getByIdDispose: typeof projectGetByIdDispose;
  };
}

interface RouteParams {
  projectUid: string;
}

type AllProps 
  = PropsFromState 
  & PropsFromDispatch 
  & RouteComponentProps<RouteParams> 
  & ConnectedReduxProps 
  & InjectedIntlProps 
  & WithStyles<typeof styles> 
  & WithUser;

const initialState = {
  dialogFullScreen: false,
  dialogOpen: false,
  dialogTitle: 'undefined!',
  dialogDescription: 'undefined!',
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
};

type State = Readonly<typeof initialState>;

class ProjectDetail extends React.Component<AllProps, State> {
  public state: State = initialState;

  public componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, projectDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    projectDispatch.getByIdDispose();
  }

  public componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.projectState.response !== this.props.projectState.response) {
      this.generateMenus(nextProps);
    }
  }

  public componentDidMount() {
    const { layoutDispatch, appBarDispatch, intl } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU19',
      title: intl.formatMessage({id: 'project.detail.title'}),
      subTitle : intl.formatMessage({id: 'project.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    appBarDispatch.assignCallback(this.handleMenuClick);

    this.loadData();
  }

  public render () {
    const { isLoading, response } = this.props.projectState;

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
          <ProjectDetailComponent {...this.props}  />
        }
        {this.renderDialog(this.state)}
      </div>
    );
  }

  private renderDialog = (state: State) => (
    <Dialog
      fullScreen={state.dialogFullScreen}
      open={state.dialogOpen}
      aria-labelledby="project-detail-dialog-title"
      aria-describedby="project-detail-dialog-description"
    >
      <DialogTitle id="project-detail-dialog-title">
        {state.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="project-detail-dialog-description">
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
    const { userState, projectDispatch, match } = this.props;
    
    if (userState.user) {
      projectDispatch.getByIdRequest({
        companyUid: userState.user.company.uid,
        positionUid: userState.user.position.uid,
        projectUid: match.params.projectUid
      });
    }
  }

  private generateMenus = (currentProps: AllProps) => {
    const { intl } = currentProps;
    const { response } = currentProps.projectState;

    const isStatusTypeEquals = (statusTypes: string[]): boolean => {
      let result = false;

      if (response && response.data) {
        result = statusTypes.indexOf(response.data.statusType) !== -1;
      }

      return result;
    };

    const currentMenus = [
      {
        id: ProjectUserAction.Refresh,
        name: intl.formatMessage({id: 'global.action.refresh'}),
        enabled: true,
        visible: true
      },
      {
        id: ProjectUserAction.Modify,
        name: intl.formatMessage({id: 'project.action.modify'}),
        enabled: response !== undefined,
        visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
      },
      {
        id: ProjectUserAction.Close,
        name: intl.formatMessage({id: 'project.action.close'}),
        enabled: true,
        visible: isStatusTypeEquals([WorkflowStatusType.Approved, WorkflowStatusType.ReOpened])
      },
      {
        id: ProjectUserAction.ReOpen,
        name: intl.formatMessage({id: 'project.action.reOpen'}),
        enabled: true,
        visible: isStatusTypeEquals([WorkflowStatusType.Closed])
      },
      {
        id: ProjectUserAction.ChangeOwner,
        name: intl.formatMessage({id: 'project.action.changeOwner'}),
        enabled: true,
        visible: isStatusTypeEquals([WorkflowStatusType.Approved])
      },
      {
        id: ProjectUserAction.ManageSites,
        name: intl.formatMessage({id: 'project.action.manageSite'}),
        enabled: true,
        visible: false
      }
    ];

    this.props.appBarDispatch.assignMenus(currentMenus);
  }
  
  private handleMenuClick = (menu: IAppBarMenu): void => {
    switch (menu.id) {
      case ProjectUserAction.Refresh:
        this.handleProjectRefresh();
        break;
      
      case ProjectUserAction.Modify:
        this.handleProjectModify();
        break;

      case ProjectUserAction.Close:
        this.handleProjectClose();
        break;
      
      case ProjectUserAction.ReOpen:
        this.handleProjectReOpen();
        break;

      case ProjectUserAction.ChangeOwner:
        this.handleProjectChangeOwner();
        break;

      case ProjectUserAction.ManageSites:
        this.handleProjectManageSite();
        break;
    
      default:
        break;
    }
  };

  private handleProjectRefresh = () => {
    const { projectDispatch } = this.props;

    projectDispatch.getByIdDispose();
    
    this.loadData();
  };

  private handleProjectModify = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'project.dialog.modifyTitle'}), 
      intl.formatMessage({id: 'project.dialog.modifyDescription'}),
      intl.formatMessage({id: 'global.action.disaggree'}),
      intl.formatMessage({id: 'global.action.aggree'}),
    );
  };  

  private handleProjectClose = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'project.dialog.closeTitle'}), 
      intl.formatMessage({id: 'project.dialog.closeDescription'}),
      intl.formatMessage({id: 'global.action.discard'}),
      intl.formatMessage({id: 'global.action.continue'}),
    );
  };

  private handleProjectReOpen = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'project.dialog.reOpenTitle'}), 
      intl.formatMessage({id: 'project.dialog.reOpenDescription'}),
      intl.formatMessage({id: 'global.action.discard'}),
      intl.formatMessage({id: 'global.action.continue'})
    );
  };

  private handleProjectChangeOwner = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'project.dialog.changeOwnerTitle'}), 
      intl.formatMessage({id: 'project.dialog.changeOwnerDescription'}),
      intl.formatMessage({id: 'global.action.discard'}),
      intl.formatMessage({id: 'global.action.continue'}),
    );
  };

  private handleProjectManageSite = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({id: 'project.dialog.manageSiteTitle'}), 
      intl.formatMessage({id: 'project.dialog.manageSiteDescription'})
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
    const projectUid = match.params.projectUid;

    this.handleDialogClose();

    history.push('/project/form/', { uid: projectUid });
  };
}

const mapStateToProps = ({ layout, projectGetById }: IAppState) => ({
  layoutState: layout,
  projectState: projectGetById
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
  
  projectDispatch: {
    getByIdRequest: (request: IProjectGetByIdRequest) => dispatch(projectGetByIdRequest(request)),
    getByIdDispose: () => dispatch(projectGetByIdDispose()),
  },
});

export const ProjectDetailContainer = connect(
  mapStateToProps, 
  mapDispatchToProps
)(
  withStyles(styles)(
    withUser(
      injectIntl(ProjectDetail)
    )
  )
);