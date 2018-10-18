import AppMenu from '@constants/AppMenu';
import { IFinanceDetail } from '@finance/classes/response';
import { FinanceUserAction } from '@finance/classes/types';
import withApiFinanceDetail, { WithApiFinanceDetailHandler } from '@finance/enhancers/approval/withApiFinanceDetail';
import withFinanceDetail, { WithFinanceDetail } from '@finance/enhancers/approval/withFinanceDetail';
import { withAppBar, WithAppBar } from '@layout/hoc/withAppBar';
import { withLayout, WithLayout } from '@layout/hoc/withLayout';
import { IAppBarMenu } from '@layout/interfaces';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
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
  handleFinanceRefresh: () => void;
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
  financeUid: string;
}

type AllProps
  = Handler 
  & WithFinanceDetail
  & WithApiFinanceDetailHandler
  & WithLayout
  & WithAppBar
  & RouteComponentProps<RouteParams> 
  & InjectedIntlProps
  & State
  & Updaters;

const approvalDetail: React.SFC<AllProps> = props => {
  const { 
    intl
  } = props;
  const { isLoading, response } = props.financeDetailState;

  const renderDetail = (finance: IFinanceDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="finance.infoTitle"/>}
        subheader={<FormattedMessage id="finance.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.uid" />}
          value={finance.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.moduleName" />}
          value={finance.module ? finance.module.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.documentUid" />}
          value={finance.documentUid ? finance.documentUid : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.requestor" />}
          value={finance.document.changes.created ? finance.document.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.approvalDate" />}
          value={finance.document.changes.updatedAt ? 
            intl.formatDate(finance.document.changes.updatedAt, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          }) : ''}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.total" />}
          value={finance.document.amount ?
            intl.formatNumber(finance.document.amount.total || 0) : 0}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.status" />}
          value={finance.status ? finance.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="finance.field.notes" />}
          value={finance.notes || 'N/A'}
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
              response.data
            }
          </Grid>
        </Grid>
      }
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
  handleFinanceRefresh: (props: AllProps) => () => { 
    const { match } = props;

    props.apiApprovalDetailGet(match.params.financeUid);
  },
  handleFinanceModify: (props: AllProps) => () => { 
    const { intl, stateUpdate } = props;

    stateUpdate({
      dialogFullScreen: false,
      dialogOpen: true,
      dialogTitle: intl.formatMessage({id: 'finance.dialog.modifyTitle'}), 
      dialogDescription: intl.formatMessage({id: 'finance.dialog.modifyDescription'}),
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
    const financeUid = match.params.financeUid;

    stateReset();

    history.push('/finance/form/', { uid: financeUid });
  },
};

const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
  componentDidMount() {
    const { 
      layoutDispatch, appBarDispatch, intl, 
      handleFinanceRefresh,
      match, apiRegistrationDetailGet
    } = this.props;

    layoutDispatch.changeView({
      uid: AppMenu.FinanceApproval,
      parentUid: AppMenu.FinanceApproval,
      title: intl.formatMessage({id: 'finance.detail.title'}),
      subTitle : intl.formatMessage({id: 'finance.detail.subTitle'})
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();
    
    const handleMenuClick = (menu: IAppBarMenu): void => {
      switch (menu.id) {
        case FinanceUserAction.Refresh:
          handleFinanceRefresh();
          break;
      
        default:
          break;
      }
    };

    appBarDispatch.assignCallback(handleMenuClick);

    apiRegistrationDetailGet(match.params.financeUid);
  },
  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.financeDetailState.response !== this.props.financeDetailState.response) {
      const { intl } = nextProps;
      const { assignMenus } = nextProps.appBarDispatch;
      
      const currentMenus = [
        {
          id: FinanceUserAction.Refresh,
          name: intl.formatMessage({id: 'global.action.refresh'}),
          enabled: true,
          visible: true
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
  setDisplayName('FinanceDetail'),
  
  withApiFinanceDetail,
  withLayout,
  withAppBar,
  withFinanceDetail,
  withRouter,
  injectIntl,
  
  withStateHandlers<State, Updaters, {}>(createProps, stateUpdaters), 
  withHandlers<AllProps, Handler>(handlerCreators),

  lifecycle<AllProps, {}>(lifecycles),
)(approvalDetail);