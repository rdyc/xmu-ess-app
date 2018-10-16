import { WorkflowStatusType } from '@common/classes/types';
import AppMenu from '@constants/AppMenu';
import { IExpenseDetail } from '@expense/classes/response';
import { ExpenseUserAction } from '@expense/classes/types';
import withApiExpenseDetail, { WithApiExpenseDetailHandler } from '@expense/enhancers/request/withApiExpenseDetail';
import withExpenseDetail, { WithExpenseDetail } from '@expense/enhancers/request/withExpenseDetail';
import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import * as React from 'react';
import { FormattedMessage,  InjectedIntlProps, injectIntl } from 'react-intl';
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
  handleExpenseRefresh: () => void;
  handleExpenseModify: () => void;
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
  expenseUid: string;
}

type AllProps
  = Handler 
  & WithExpenseDetail
  & WithApiExpenseDetailHandler
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams> 
  & InjectedIntlProps
  & State
  & Updaters;

const requestDetail: React.SFC<AllProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  const { isLoading, response } = props.expenseDetailState;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="expense-detail-dialog-title"
      aria-describedby="expense-detail-dialog-description"
    >
      <DialogTitle id="expense-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="expense-detail-dialog-description">
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

  const renderDetail = (expense: IExpenseDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="expense.infoTitle"/>}
        subheader={<FormattedMessage id="expense.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.uid" />}
          value={expense.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.status" />}
          value={expense.status ? expense.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.customer" />}
          value={expense.customer ? expense.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.project" />}
          value={expense.project ? expense.project.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.date" />}
          value={expense.date ?
            intl.formatDate(expense.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.type" />}
          value={expense.expense ? expense.expense.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.value" />}
          value={intl.formatNumber(expense.value || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.location" />}
          value={expense.location}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.address" />}
          value={expense.address || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.clientName" />}
          value={expense.client ? expense.client.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.clientTitle" />}
          value={expense.client ? expense.client.title : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.notes" />}
          value={expense.notes || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="expense.field.rejectedReason" />}
          value={expense.rejectedReason || 'N/A'}
        />
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
  handleExpenseRefresh: (props: AllProps) => () => { 
    const { match } = props;

    props.apiRegistrationDetailGet(match.params.expenseUid);
  },
  handleExpenseModify: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'expense.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'expense.dialog.modifyDescription'}),
      dialogCancelText: intl.formatMessage({id: 'global.action.disaggree'}),
      dialogConfirmedText: intl.formatMessage({id: 'global.action.aggree'})
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
    const expenseUid = match.params.expenseUid;

    stateReset();

    history.push('/expense/form/', { uid: expenseUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleExpenseRefresh, handleExpenseModify, 
      match, apiRegistrationDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.ExpenseRequest,
      parentUid: AppMenu.Expense,
      title: intl.formatMessage({id: 'expense.detail.title'}),
      subTitle : intl.formatMessage({id: 'expense.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case ExpenseUserAction.Refresh:
          handleExpenseRefresh();
          break;
        
        case ExpenseUserAction.Modify:
          handleExpenseModify();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiRegistrationDetailGet(match.params.expenseUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.expenseDetailState.response !== this.props.expenseDetailState.response) {
      const { intl } = nextProps;
      const { response } = nextProps.expenseDetailState;
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
          id: ExpenseUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
        },
        {
          id: ExpenseUserAction.Modify,
          name: intl.formatMessage({id: 'expense.action.modify'}),
          enabled: response !== undefined,
          visible: isStatusTypeEquals([WorkflowStatusType.Submitted, WorkflowStatusType.InProgress, WorkflowStatusType.Approved])
        },
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
  setDisplayName('ExpenseDetail'),
  
  withApiExpenseDetail,
  withLayout,
  withAppBar,
  withExpenseDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(requestDetail);