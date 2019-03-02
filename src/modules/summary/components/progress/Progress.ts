import AppMenu from '@constants/AppMenu';
import { AppRole } from '@constants/AppRole';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { WithOidc, withOidc } from '@layout/hoc/withOidc';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { ISummaryModuleCost } from '@summary/classes/response/progress';
import { ProgressView } from '@summary/components/progress/ProgressView';
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
  setDisplayName,
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

import { IProgressFilterResult } from './ProgressFilter';

export interface Handlers {
    handleChangeFilter: (filter: IProgressFilterResult) => void;
    handleDialogOpen: (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => void;
    handleDialogClose: () => void;
    handleReloadData: () => void;
}

interface OwnOptions {
}

interface OwnState extends IProgressFilterResult {
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

export type FilterProgressData = {
  customerUid: string | null;
  projectUid: string | null;
};

export type ProgressProps 
  = WithSummary
  & WithOidc
  & WithWidth
  & WithUser
  & WithMasterPage
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & Handlers
  & OwnState
  & WithStyles<typeof styles>
  & OwnStateUpdaters;

const createProps: mapper<ProgressProps, OwnState> = (props: ProgressProps): OwnState => {

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
  setFilterApplied: (prevState: OwnState) => (filter: IProgressFilterResult) => ({
    ...filter
  }),
  setStartup: (prevState: OwnState) => (filter: IProgressFilterResult) => ({
    isStartup: false
  }),
};

const handlerCreators: HandleCreators<ProgressProps, Handlers> = {
  handleChangeFilter: (props: ProgressProps) => (filter: IProgressFilterResult) => {
    props.setFilterApplied(filter);
    
    if (props.isStartup) {
      props.setStartup();
    }
  },
  handleReloadData: (props: ProgressProps) => () => {
    props.stateUpdate({
      reloadData: true,
    });
  },
  handleDialogOpen: (props: ProgressProps) => (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => { 
    const { stateUpdate } = props;

    stateUpdate({ 
      expenses,
      expenseProjectUid: projectUid,
      dialogFullScreen: fullScreen,
      dialogOpen: true
    });
  },
  handleDialogClose: (props: ProgressProps) => () => { 
    const { stateReset } = props;

    stateReset();
  },
};

const lifecycles: ReactLifeCycleFunctions<ProgressProps, OwnState> = {
    componentDidMount() { 
      const { 
        intl, customerUid, projectUid, stateUpdate
      } = this.props;
      
      const { isLoading, response } = this.props.summaryState.effectiveness;

      // checking admin status
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
        uid: AppMenu.ReportProgress,
        parentUid: AppMenu.Report,
        title: intl.formatMessage(summaryMessage.progress.page.title),
      });
    
      // only load data when response are empty
      if (!isLoading && !response) {
          if (customerUid !== '' && projectUid !== '') {
            loadData(this.props);
          }
      }
    },
    componentWillUpdate(props: ProgressProps, state: OwnState) {
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
      this.props.summaryDispatch.loadProgressDispose();
    }
  };

const loadData = (props: ProgressProps): void => {
    const { user } = props.userState;
    const { loadProgressRequest } = props.summaryDispatch;
    const { customerUid, projectUid } = props;

    if (user) {
      loadProgressRequest({
        customerUid,
        projectUid
      }); 
    }
  };

export const Progress = compose<ProgressProps, OwnOptions>(
    connect(),
    setDisplayName('SummaryProgressEditor'),
    withOidc,
    withSummary,
    withUser,
    withMasterPage,
    withRouter,
    injectIntl,
    withWidth(),
    withStyles(styles),
    withStateHandlers(createProps, stateUpdaters), 
    withHandlers(handlerCreators),
    lifecycle(lifecycles)
  )(ProgressView);