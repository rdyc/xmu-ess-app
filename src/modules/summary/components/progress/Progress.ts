import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { ISummaryModuleCost } from '@summary/classes/response/progress';
import { ProgressView } from '@summary/components/progress/ProgressView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
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
import { InjectedFormProps, reduxForm } from 'redux-form';

export interface Handlers {
    handleChangeCustomer: (event: any) => void;
    handleChangeProject: (event: any) => void;
    handleDialogOpen: (fullScreen: boolean, expenses: ISummaryModuleCost[], projectUid: string) => void;
    handleDialogClose: () => void;
}

interface OwnOptions {
}

interface OwnState {
    customerUid: string;
    projectUid: string;
    dialogFullScreen: boolean;
    dialogOpen: boolean;
    expenses: ISummaryModuleCost[];
    expenseProjectUid: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
    stateUpdate: StateHandler<OwnState>;
}

const formName = 'filterProgress';

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
  })
};

const handlerCreators: HandleCreators<ProgressProps, Handlers> = {
    handleChangeCustomer: (props: ProgressProps) => (event: any) => {
        const { stateUpdate } = props;

        stateUpdate({
            customerUid: event.target.value
        });
    },
    handleChangeProject: (props: ProgressProps) => (event: any) => {
        const { stateUpdate } = props;

        stateUpdate({
            projectUid: event.target.value
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
        layoutDispatch, intl, customerUid, projectUid, stateUpdate
      } = this.props;
      
      const { isLoading, response } = this.props.summaryState.effectiveness;
  
      layoutDispatch.changeView({
        uid: AppMenu.ReportProgress,
        parentUid: AppMenu.Report,
        title: intl.formatMessage({id: 'summary.progress.title'}),
        subTitle : intl.formatMessage({id: 'summary.progress.subTitle'})
      });
  
      layoutDispatch.searchShow();
      layoutDispatch.actionCentreShow();

      // delet dis !
      const a: string = 'CS00001061';
      const b: string = 'XMU-P1807-0098';
      stateUpdate({
        customerUid: a, 
        projectUid: b
      });
      // delet dat !
    
      // only load data when response are empty
      if (!isLoading && !response) {
          if (customerUid !== '' && projectUid !== '') {
            loadData(this.props);
          }
      }
    },
    componentWillUpdate(props: ProgressProps, state: OwnState) {
        if (this.props.customerUid !== props.customerUid &&
            this.props.projectUid !== props.projectUid) {
                loadData(props);
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

const connectedView = compose<ProgressProps, OwnOptions & InjectedFormProps<FilterProgressData, OwnOptions>>(
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

export const Progress = reduxForm({
  form: formName
})(connectedView);