import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
        layoutDispatch, intl, customerUid, projectUid
      } = this.props;
      
      const { isLoading, response } = this.props.summaryState.effectiveness;
  
      layoutDispatch.changeView({
        uid: AppMenu.ReportProgress,
        parentUid: AppMenu.Report,
        title: intl.formatMessage(summaryMessage.progress.page.title),
        subTitle : intl.formatMessage(summaryMessage.progress.page.subTitle)
      });
  
      layoutDispatch.searchShow();
      layoutDispatch.actionCentreShow();
    
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
      const { layoutDispatch } = this.props;
      const { view } = this.props.layoutState;
      const { loadProgressDispose } = this.props.summaryDispatch;
  
      layoutDispatch.changeView(null);
      layoutDispatch.modeListOff();
      layoutDispatch.searchHide();
      layoutDispatch.modeSearchOff();
      layoutDispatch.actionCentreHide();
      layoutDispatch.moreHide();
  
      // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
      if (view && view.uid !== AppMenu.ReportProgress) {
        loadProgressDispose();
      }
    }
  };

const loadData = (props: ProgressProps): void => {
    const { user } = props.userState;
    const { loadProgressRequest } = props.summaryDispatch;
    const { alertAdd } = props.layoutDispatch;
    const { customerUid, projectUid } = props;

    if (user) {
      loadProgressRequest({
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

export const Progress = compose<ProgressProps, OwnOptions>(
    connect(),
    withSummary,
    withUser,
    withLayout,
    withRouter,
    injectIntl,
    withWidth(),
    withStyles(styles),
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<ProgressProps, Handlers>(handlerCreators),
    lifecycle<ProgressProps, OwnState>(lifecycles),
  )(ProgressView);