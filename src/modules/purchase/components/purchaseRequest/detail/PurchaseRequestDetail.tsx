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
import { IPurchaseDetail, IPurchaseHistory, IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import { PurchaseUserAction } from '@purchase/classes/types';
import withApiPurchaseRequestDetail, { WithApiPurchaseRequestDetailHandler } from '@purchase/enhancers/purchaseRequest/withApiPurchaseRequestDetail';
import withPurchaseRequestDetail, { WithPurchaseRequestDetail } from '@purchase/enhancers/purchaseRequest/withPurchaseRequestDetail';
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
  handlePurchaseRefresh: () => void;
  handlePurchaseModify: () => void;
  handleProjectClose: () => void;
  handleProjectReOpen: () => void;
  handleProjectChangeOwner: () => void;
  handlePurchaseManageSite: () => void;
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
  purchaseUid: string;
}

type AllProps
  = Handler 
  & WithPurchaseRequestDetail
  & WithApiPurchaseRequestDetailHandler
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
  const { isLoading, response } = props.purchaseRequestDetailState;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="purchaseRequest-detail-dialog-title"
      aria-describedby="purchaseRequest-detail-dialog-description"
    >
      <DialogTitle id="purchaseRequest-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="purchaseRequest-detail-dialog-description">
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

  const renderDetail = (purchase: IPurchaseDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="purchaseRequest.infoTitle"/>}
        subheader={<FormattedMessage id="purchaseRequest.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.uid" />}
          value={purchase.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.status" />}
          value={purchase.status ? purchase.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.notes" />}
          value={purchase.notes ? purchase.notes : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.customer" />}
          value={purchase.customer ? purchase.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.project" />}
          value={purchase.project && purchase.project.name || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.name" />}
          value={purchase.reason || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.description" />}
          value={purchase.notes || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.requestDate" />}
          value={intl.formatDate(purchase.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.currency" />}
          value={purchase.currency ? purchase.currency.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.rate" />}
          value={intl.formatNumber(purchase.rate || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.value" />}
          value={intl.formatNumber(purchase.request)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.valueIdr" />}
          value={intl.formatNumber(purchase.requestIDR || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchaseRequest.field.advance" />}
          value={intl.formatNumber(purchase.advance)}
        />
      </CardContent>
    </Card>
  );

  const renderSales = (histories: IPurchaseHistory[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="purchase.historiesTitle" />}
        subheader={<FormattedMessage id="purchase.historiesSubTitle" />}
      />
      <CardContent>
        <List>
        {
          histories.map(item => 
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

  const renderSites = (sites: IPurchaseItemRequest[]) => (
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
                    response.data.items &&
                  renderSales(response.data.items)
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

    props.apiPurchaseRequestDetailGet(match.params.projectUid);
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
      match, apiPurchaseRequestDetailGet
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
        case PurchaseUserAction.Refresh:
          handleProjectRefresh();
          break;
        
        case PurchaseUserAction.Modify:
          handleProjectModify();
          break;
  
        case PurchaseUserAction.Close:
          handleProjectClose();
          break;
        
        case PurchaseUserAction.ReOpen:
          handleProjectReOpen();
          break;
  
        case PurchaseUserAction.ChangeOwner:
          handleProjectChangeOwner();
          break;
  
        case PurchaseUserAction.ManageSites:
          handleProjectManageSite();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiPurchaseRequestDetailGet(match.params.purchaseUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.purchaseRequestDetailState.response !== this.props.purchaseRequestDetailState.response) {
      const { intl } = nextProps;
      const { response } = nextProps.purchaseRequestDetailState;
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
          id: PurchaseUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: PurchaseUserAction.Modify,
          name: intl.formatMessage({id: 'project.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
        },
        {
          id: PurchaseUserAction.Close,
          name: intl.formatMessage({id: 'project.action.close'}),
          enabled: true,
          visible: isStatusTypeEquals([WorkflowStatusType.Approved, WorkflowStatusType.ReOpened])
        },
        {
          id: PurchaseUserAction.ReOpen,
          name: intl.formatMessage({id: 'project.action.reOpen'}),
          enabled: true,
          visible: isStatusTypeEquals([WorkflowStatusType.Closed])
        },
        {
          id: PurchaseUserAction.ChangeOwner,
          name: intl.formatMessage({id: 'project.action.changeOwner'}),
          enabled: true,
          visible: isStatusTypeEquals([WorkflowStatusType.Approved])
        },
        {
          id: PurchaseUserAction.ManageSites,
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
  
  withApiPurchaseRequestDetail,
  withLayout,
  withAppBar,
  withPurchaseRequestDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(registrationDetail);