import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { ISummaryModuleCost } from '@summary/classes/response/profitability';
import { ProfitabilityView } from '@summary/components/profitability/ProfitabilityView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { connect } from 'react-redux';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { ISummaryProfitabilityFilterResult } from './shared/ProfitabilityFormFilter';

export interface Handlers {
  handleChangeFilter: (filter: ISummaryProfitabilityFilterResult) => void;
  handleDialogOpen: (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => void;
  handleDialogClose: () => void;
  handleReloadData: () => void;
}

interface OwnOptions {
}

interface OwnState extends ISummaryProfitabilityFilterResult {
  dialogFullScreen: boolean;
  dialogOpen: boolean;
  expenses: ISummaryModuleCost[];
  expenseProjectUid: string;
  reloadData: boolean;
  isStartup: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
  setStartup: StateHandler<OwnState>;
}

export type FilterProfitabilityData = {
  customerUid: string | null;
  projectUid: string | null;
};

export type ProfitabilityProps
  = WithSummary
  & WithWidth
  & WithUser
  & WithLayout
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & Handlers
  & OwnState
  & WithStyles<typeof styles>
  & OwnStateUpdaters;

const createProps: mapper<ProfitabilityProps, OwnState> = (props: ProfitabilityProps): OwnState => {

  return {
    customerUid: '',
    projectUid: '',
    dialogFullScreen: false,
    dialogOpen: false,
    expenses: [],
    expenseProjectUid: '',
    reloadData: false,
    isStartup: true,
  };
};

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  stateReset: (prevState: OwnState) => () => ({
    ...prevState,
    dialogFullScreen: false,
    dialogOpen: false,
  }),
  setFilterApplied: (prevState: OwnState) => (filter: ISummaryProfitabilityFilterResult) => ({
    ...filter
  }),
  setStartup: (prevState: OwnState) => (filter: ISummaryProfitabilityFilterResult) => ({
    isStartup: false
  }),
};

const handlerCreators: HandleCreators<ProfitabilityProps, Handlers> = {
  handleChangeFilter: (props: ProfitabilityProps) => (filter: ISummaryProfitabilityFilterResult) => {
    props.setFilterApplied(filter);

    if (props.isStartup) {
      props.setStartup();
    }
  },
  handleReloadData: (props: ProfitabilityProps) => () => {
    props.stateUpdate({
      reloadData: true
    });
  },
  handleDialogOpen: (props: ProfitabilityProps) => (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => {
    const { stateUpdate } = props;

    stateUpdate({
      expenses,
      expenseProjectUid: projectUid,
      dialogFullScreen: fullScreen,
      dialogOpen: true
    });
  },
  handleDialogClose: (props: ProfitabilityProps) => () => {
    const { stateReset } = props;

    stateReset();
  },
};

const lifecycles: ReactLifeCycleFunctions<ProfitabilityProps, OwnState> = {
  componentDidMount() {
    const {
      layoutDispatch, intl, customerUid, projectUid
    } = this.props;

    const { isLoading, response } = this.props.summaryState.profitability;

    layoutDispatch.changeView({
      uid: AppMenu.ReportProfitability,
      parentUid: AppMenu.Report,
      title: intl.formatMessage(summaryMessage.profitability.page.title),
      subTitle: intl.formatMessage(summaryMessage.profitability.page.subTitle)
    });

    // layoutDispatch.searchShow();
    // layoutDispatch.actionCentreShow();

    // only load data when response are empty
    if (!isLoading && !response) {
      if (customerUid !== '' && projectUid !== '') {
        loadData(this.props);
      }
    }
  },
  componentWillUpdate(props: ProfitabilityProps, state: OwnState) {
    if (this.props.customerUid !== props.customerUid ||
      this.props.projectUid !== props.projectUid) {
      loadData(props);
    }
    if (props.reloadData) {
      loadData(props);

      props.stateUpdate({
        reloadData: false,
      });
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { loadProfitabilityDispose } = this.props.summaryDispatch;

    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
    if (view && view.uid !== AppMenu.ReportProfitability) {
      loadProfitabilityDispose();
    }
  }
};

const loadData = (props: ProfitabilityProps): void => {
  const { user } = props.userState;
  const { loadProfitabilityRequest } = props.summaryDispatch;
  const { alertAdd } = props.layoutDispatch;
  const { customerUid, projectUid } = props;

  if (user) {
    loadProfitabilityRequest({
      customerUid,
      projectUid
    });
  } else {
    alertAdd({
      time: new Date(),
      message: 'Unable to find current user state'
    });
  }
};

export const Profitability = compose<ProfitabilityProps, OwnOptions>(
  connect(),
  withSummary,
  withUser,
  withLayout,
  withRouter,
  injectIntl,
  withWidth(),
  withStyles(styles),
  withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters),
  withHandlers<ProfitabilityProps, Handlers>(handlerCreators),
  lifecycle<ProfitabilityProps, OwnState>(lifecycles),
)(ProfitabilityView);