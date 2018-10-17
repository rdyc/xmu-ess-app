import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import {
  Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControlLabel,
  Grid,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { WorkflowStep } from '@organization/components';
import { IProjectDetail, IProjectDocument, IProjectSales, IProjectSite } from '@project/classes/response';
import { ProjectUserAction } from '@project/classes/types';
import withApiProjectRegistrationDetail, { WithApiProjectRegistrationDetailHandler } from '@project/enhancers/registration/withApiProjectRegistrationDetail';
import withProjectRegistrationDetail, { WithProjectRegistrationDetail } from '@project/enhancers/registration/withProjectRegistrationDetail';
import * as React from 'react';
import { FormattedMessage, FormattedNumber, InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

interface Handler {
  handleProjectRefresh: () => void;
  handleProjectModify: () => void;
  handleProjectClose: () => void;
  handleProjectReOpen: () => void;
  handleProjectChangeOwner: () => void;
  handleProjectManageSite: () => void;
  handleDialogOpen: (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => void;
  handleDialogClose: () => void;
  handleDialogConfirmed: () => void;
}

interface State {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  dialogTitle?: string | undefined;
  dialogDescription?: string | undefined;
  dialogCancelText: string;
  dialogConfirmedText: string;
}

interface Updaters extends StateHandlerMap<State> {
  stateUpdate: StateHandler<State>;
}

interface RouteParams {
  projectUid: string;
}

type AllProps
  = Handler 
  & WithProjectRegistrationDetail
  & WithApiProjectRegistrationDetailHandler
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams> 
  & InjectedIntlProps
  & State
  & Updaters;

const registrationDetail: React.SFC<AllProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.projectDetailState;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="project-detail-dialog-title"
      aria-describedby="project-detail-dialog-description"
    >
      <DialogTitle id="project-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="project-detail-dialog-description">
          {dialogDescription || 'description'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {dialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {dialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDetail = (project: IProjectDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.infoTitle"/>}
        subheader={<FormattedMessage id="project.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.uid" />}
          value={project.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.status" />}
          value={project.status ? project.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.owner" />}
          value={project.owner ? project.owner.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.customer" />}
          value={project.customer ? project.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.type" />}
          value={project.project ? project.project.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.name" />}
          value={project.name}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.description" />}
          value={project.description || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.contract" />}
          value={project.contractNumber || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.start" />}
          value={intl.formatDate(project.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.end" />}
          value={intl.formatDate(project.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.currency" />}
          value={project.currency ? project.currency.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.rate" />}
          value={intl.formatNumber(project.rate || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.valueUsd" />}
          value={intl.formatNumber(project.valueUsd)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.valueIdr" />}
          value={intl.formatNumber(project.valueIdr || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.hours" />}
          value={intl.formatNumber(project.maxHours)}
        />
      </CardContent>
    </Card>
  );

  const renderDocuments = (title: string, subHeader: string, documents: IProjectDocument[] | undefined) => (
    <Card square>
      <CardHeader 
        title={title}
        subheader={subHeader}
      />
      <CardContent>
        {
          documents &&
          documents.map(item => 
            item.document &&
            <div key={item.uid}>
              <FormControlLabel 
                contentEditable={false}
                key={item.uid}
                label={item.document.value}
                control={<Checkbox checked={item.isAvailable}/>} 
              />
            </div>
          )
        }
      </CardContent>
    </Card>
  );

  const renderSales = (sales: IProjectSales[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.salesTitle" />}
        subheader={<FormattedMessage id="project.salesSubTitle" />}
      />
      <CardContent>
        <List>
        {
          sales.map(item => 
            item.employee &&
            <ListItem 
              disableGutters 
              key={item.employeeUid}
            >
              <ListItemAvatar>
                <Avatar
                  alt={item.employee.fullName} 
                >
                  <PersonIcon/>
                </Avatar>
              </ListItemAvatar>
              <ListItemText
                primary={item.employee.fullName} 
                secondary={item.employee.email}
              />
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
  );

  const renderSites = (sites: IProjectSite[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.siteTitle" />}
        subheader={<FormattedMessage id="project.siteSubTitle" />}
      />
      <CardContent>
        <List>
        {
          sites.map(item => 
            <ListItem disableGutters key={item.uid}>
              <Grid container>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.name} 
                    secondary={item.type ? item.type.value : 'N/A'}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    noWrap 
                    variant="display1" 
                    align="right"
                  >
                    <FormattedNumber 
                      value={item.value} 
                    />
                  </Typography>
                </Grid>
              </Grid>
              
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
  );

  return (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
        </Typography>
      }
      {
        response && 
        <Grid container spacing={24}>
          <Grid item xs={12} sm={12} md={4} xl={3}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
          <Grid item xs={12} sm={12} md={4} xl={3}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                {
                  response &&
                  response.data &&
                  renderDocuments(intl.formatMessage({id: 'project.documentTitle'}), intl.formatMessage({id: 'project.documentSubTitle'}), response.data.documents)
                }
              </Grid>
              <Grid item xs={12}>
                {
                  response &&
                  response.data &&
                  renderDocuments(intl.formatMessage({id: 'project.documentPreSalesTitle'}),  intl.formatMessage({id: 'project.documentPreSalesSubTitle'}), response.data.documentPreSales)
                }
              </Grid>
            </Grid>
          </Grid>
          <Grid item xs={12} sm={12} md={4} xl={3}>
            <Grid container spacing={24}>
              <Grid item xs={12}>
                  {
                    response &&
                    response.data &&
                    response.data.sales &&
                    renderSales(response.data.sales)
                  }
                </Grid>
                <Grid item xs={12}>
                  {
                    response &&
                    response.data &&
                    response.data.sites &&
                    renderSites(response.data.sites)
                  }
                </Grid>
              </Grid>
            </Grid>
          <Grid item xs={12} sm={12} md={8} xl={3}>
            {
              response &&
              response.data &&
              response.data.workflow &&
              response.data.workflow.steps &&
              <WorkflowStep steps={response.data.workflow.steps} />
            }
          </Grid>
        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );
};

const createProps: mapper<AllProps, State> = (props: AllProps): State => ({ 
  dialogFullScreen: false,
  dialogOpen: false,
  dialogCancelText: 'global.action.cancel',
  dialogConfirmedText: 'global.action.ok',
});

const stateUpdaters: StateUpdaters<{}, State, Updaters> = {
  stateUpdate: (prevState: State) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: State) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
    dialogTitle: undefined,
    dialogDescription: undefined,
    dialogCancelText: 'global.action.cancel',
    dialogConfirmedText: 'global.action.ok',
  })
};

const handlerCreators: HandleCreators<AllProps, Handler> = {
  handleProjectRefresh: (props: AllProps) => () => { 
    const { match } = props;

    props.apiRegistrationDetailGet(match.params.projectUid);
  },
  handleProjectModify: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
    });
  },
  handleProjectClose: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.closeTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.closeDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleProjectReOpen: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.reOpenTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.reOpenDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'})
    });
  },
  handleProjectChangeOwner: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.changeOwnerTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.changeOwnerDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.discard'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.continue'}),
    });
  },
  handleProjectManageSite: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'project.dialog.manageSiteTitle'}), 
      dialogDescription: intl.formatMessage({id: 'project.dialog.manageSiteDescription'})
    });
  },
  handleDialogOpen: (props: AllProps) => (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => { 
    const { intl, stateUpdate, dialogCancelText, dialogConfirmedText } = props;

    stateUpdate({ 
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({id: dialogCancelText}),
      dialogConfirmedText: confirmText || intl.formatMessage({id: dialogConfirmedText})
    });
  },
  handleDialogClose: (props: AllProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
  handleDialogConfirmed: (props: AllProps) => () => { 
    const { match, history, stateReset } = props;
    const projectUid = match.params.projectUid;

    stateReset();

    history.push('/project/form/', { uid: projectUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleProjectRefresh, handleProjectModify, 
      handleProjectClose, handleProjectReOpen,
      handleProjectChangeOwner, handleProjectManageSite,
      match, apiRegistrationDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ProjectRegistrationRequest,
      parentUid: AppMenu.ProjectRegistration,
      title: intl.formatMessage({id: 'project.detail.title'}),
      subTitle : intl.formatMessage({id: 'project.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ProjectUserAction.Refresh:
          handleProjectRefresh();
          break;
        
        case ProjectUserAction.Modify:
          handleProjectModify();
          break;
  
        case ProjectUserAction.Close:
          handleProjectClose();
          break;
        
        case ProjectUserAction.ReOpen:
          handleProjectReOpen();
          break;
  
        case ProjectUserAction.ChangeOwner:
          handleProjectChangeOwner();
          break;
  
        case ProjectUserAction.ManageSites:
          handleProjectManageSite();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiRegistrationDetailGet(match.params.projectUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.projectDetailState.response !== this.props.projectDetailState.response) {
      const { intl } = nextProps;
      const { response } = nextProps.projectDetailState;
      const { assignMenus } = nextProps.appBarDispatch;
      
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

      assignMenus(currentMenus);
    }
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();
  }
};

export default compose<AllProps, {}>(
  setDisplayName('ProjectRegistrationDetail'),
  
  withApiProjectRegistrationDetail,
  withLayout,
  withAppBar,
  withProjectRegistrationDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(registrationDetail);