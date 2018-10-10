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
import { ICurrencyByIdRequest } from '@lookup/classes/queries';
import { ICurrencyDetail } from '@lookup/classes/response';
import { CurrencyDetail } from '@lookup/components/list';
import { currencyGetByIdDispose, currencyGetByIdRequest } from '@lookup/store/actions';
import styles from '@styles';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps } from 'react-router';
import { Dispatch } from 'redux';

interface PropsFromState extends RouteComponentProps<void> {
  layoutState: ILayoutState;
  currencyState: IQuerySingleState<ICurrencyByIdRequest, ICurrencyDetail>;
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

  currencyDispatch: {
    getByIdRequest: typeof currencyGetByIdRequest;
    getByIdDispose: typeof currencyGetByIdDispose;
  };
}

interface RouteParams {
  currencyUid: string;
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

class CurrencyDetailView extends React.Component<AllProps, State> {
  state: State = initialState;

  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch, currencyDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();
    layoutDispatch.actionCentreHide();

    appBarDispatch.dispose();

    currencyDispatch.getByIdDispose();
  }

  componentWillReceiveProps(nextProps: AllProps) {
    if (nextProps.currencyState.response !== this.props.currencyState.response) {
      this.generateMenus(nextProps);
    }
  }

  componentDidMount() {
    const { layoutDispatch, appBarDispatch, intl } = this.props;

    layoutDispatch.changeView({
      menuUid: 'MNU55',
      title: intl.formatMessage({ id: 'currency.detail.title' }),
      subTitle: intl.formatMessage({ id: 'currency.detail.subTitle' })
    });

    layoutDispatch.navBackShow();
    layoutDispatch.moreShow();

    appBarDispatch.dispose();

    this.loadData();
  }

  generateMenus = (currentProps: AllProps) => {
    //
  }

  handleCurrencyRefresh = () => {
    const { currencyDispatch } = this.props;

    currencyDispatch.getByIdDispose();

    this.loadData();
  };

  handleCurrencyModify = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({ id: 'currency.dialog.modifyTitle' }),
      intl.formatMessage({ id: 'currency.dialog.modifyDescription' }),
      intl.formatMessage({ id: 'global.action.disaggree' }),
      intl.formatMessage({ id: 'global.action.aggree' }),
    );
  };

  handleCurrencyClose = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({ id: 'currency.dialog.closeTitle' }),
      intl.formatMessage({ id: 'currency.dialog.closeDescription' }),
      intl.formatMessage({ id: 'global.action.discard' }),
      intl.formatMessage({ id: 'global.action.continue' }),
    );
  };

  handleCurrencyReOpen = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({ id: 'currency.dialog.reOpenTitle' }),
      intl.formatMessage({ id: 'currency.dialog.reOpenDescription' }),
      intl.formatMessage({ id: 'global.action.discard' }),
      intl.formatMessage({ id: 'global.action.continue' })
    );
  };

  handleCurrencyChangeOwner = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({ id: 'currency.dialog.changeOwnerTitle' }),
      intl.formatMessage({ id: 'currency.dialog.changeOwnerDescription' }),
      intl.formatMessage({ id: 'global.action.discard' }),
      intl.formatMessage({ id: 'global.action.continue' }),
    );
  };

  handleCurrencyManageSite = () => {
    const { intl } = this.props;

    this.handleDialogOpen(
      intl.formatMessage({ id: 'currency.dialog.manageSiteTitle' }),
      intl.formatMessage({ id: 'currency.dialog.manageSiteDescription' })
    );
  };

  handleDialogOpen = (title: string, description: string, cancelText?: string, confirmText?: string, fullScreen?: boolean) => {
    const { intl } = this.props;

    this.setState({
      dialogFullScreen: fullScreen || false,
      dialogOpen: true,
      dialogTitle: title,
      dialogDescription: description,
      dialogCancelText: cancelText || intl.formatMessage({ id: this.state.dialogCancelText }),
      dialogConfirmedText: confirmText || intl.formatMessage({ id: this.state.dialogConfirmedText })
    });
  };

  handleDialogClose = () => {
    this.setState(initialState);
  };

  handleDialogConfirmed = () => {
    const { match, history } = this.props;
    const currencyUid = match.params.currencyUid;

    this.handleDialogClose();

    history.push('/currency/list/', { uid: currencyUid });
  };

  loadData = (): void => {
    const { layoutState, currencyDispatch, match } = this.props;

    if (layoutState.user) {
      currencyDispatch.getByIdRequest({
        currencyUid: match.params.currencyUid
      });
    }
  }

  renderDialog = (state: State) => (
    <Dialog
      fullScreen={state.dialogFullScreen}
      open={state.dialogOpen}
      aria-labelledby="currency-detail-dialog-title"
      aria-describedby="currency-detail-dialog-description"
    >
      <DialogTitle id="currency-detail-dialog-title">
        {state.dialogTitle}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="currency-detail-dialog-description">
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

  render() {
    const { isLoading, response } = this.props.currencyState;

    return (
      <div>
        {
          isLoading &&
          <Typography variant="body2">
            <FormattedMessage id="global.loading" />
          </Typography>
        }
        {
          response &&
          <CurrencyDetail {...this.props} />
        }
        {this.renderDialog(this.state)}
      </div>
    );
  }
}

const mapStateToProps = ({ layout, currencyGetById }: IAppState) => ({
  layoutState: layout,
  currencyState: currencyGetById
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

  currencyDispatch: {
    getByIdRequest: (request: ICurrencyByIdRequest) => dispatch(currencyGetByIdRequest(request)),
    getByIdDispose: () => dispatch(currencyGetByIdDispose()),
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(
  withStyles(styles)(
    injectIntl(CurrencyDetailView)
  )
);