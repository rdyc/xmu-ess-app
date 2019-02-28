import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, WithTheme, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { ISummaryModuleCost } from '@summary/classes/response/profitability';
import { ProfitabilityView } from '@summary/components/profitability/ProfitabilityView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

import { ISummaryProfitabilityFilterResult } from './filter/ProfitabilityFormFilter';

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
  & WithOidc
  & WithWidth
  & WithUser
  & WithTheme
  & WithMasterPage
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
      intl, customerUid, projectUid, stateUpdate
    } = this.props;

    const { isLoading, response } = this.props.summaryState.profitability;

    const { user: oidc } = this.props.oidcState;
    let result: boolean = false;
    if (oidc) {
      const role: string | string[] | undefined = oidc.profile.role;

      if (role) {
        if (Array.isArray(role)) {
          result = role.indexOf(AppRole.Admin) !== -1;
        } else {
          result = role === AppRole.Admin;
        }
      }

      if (result) {
        stateUpdate({ 
          isAdmin: true
        });
      }
    }

    this.props.masterPage.changePage({
      uid: AppMenu.ReportProfitability,
      parentUid: AppMenu.Report,
      title: intl.formatMessage(summaryMessage.profitability.page.title),
    });

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
    this.props.summaryDispatch.loadProfitabilityDispose();
  }
};

const loadData = (props: ProfitabilityProps): void => {
  const { user } = props.userState;
  const { loadProfitabilityRequest } = props.summaryDispatch;
  const { customerUid, projectUid } = props;

  if (user) {
    loadProfitabilityRequest({
      customerUid,
      projectUid
    });
  }
};

export const Profitability = compose<ProfitabilityProps, OwnOptions>(
  setDisplayName('SummaryProfitabilityEditor'),
  withOidc,
  withSummary,
  withUser,
  withMasterPage,
  withRouter,
  injectIntl,
  withWidth(),
  withStyles(styles, { withTheme: true }),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifecycles),
)(ProfitabilityView);