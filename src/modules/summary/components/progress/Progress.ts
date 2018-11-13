import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { ProgressView } from '@summary/components/progress/ProgressView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

interface OwnHandlers {
    handleChangeCustomer: (event: any) => void;
    handleChangeProject: (event: any) => void;
}

interface OwnOptions {
}

interface OwnState {
    customerUid: string;
    projectUid: string;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
    stateUpdate: StateHandler<OwnState>;
}

export type ProgressProps 
  = WithSummary
  & WithWidth
  & WithUser
  & WithLayout
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & WithStyles<typeof styles>
  & OwnStateUpdaters;

const createProps: mapper<ProgressProps, OwnState> = (props: ProgressProps): OwnState => {

    return { 
        customerUid: '',
        projectUid: ''
    };
  };

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  })
  };

const handlerCreators: HandleCreators<ProgressProps, OwnHandlers> = {
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
    }
  };

const lifecycles: ReactLifeCycleFunctions<ProgressProps, OwnState> = {
    componentDidMount() { 
      const { 
        layoutDispatch, intl, customerUid, projectUid
      } = this.props;
      
      const { isLoading, response } = this.props.summaryState.effectiveness;
  
      layoutDispatch.changeView({
        uid: AppMenu.ReportEffectiveness,
        parentUid: AppMenu.Report,
        title: intl.formatMessage({id: 'summary.effectiveness.title'}),
        subTitle : intl.formatMessage({id: 'summary.effectiveness.subTitle'})
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
        if (this.props.customerUid !== props.customerUid &&
            this.props.projectUid !== props.projectUid) {
                loadData(this.props);
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
      if (view && view.parentUid !== AppMenu.Report) {
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
    withSummary,
    withUser,
    withLayout,
    withRouter,
    injectIntl,
    withWidth(),
    withStyles(styles),
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<ProgressProps, OwnHandlers>(handlerCreators),
    lifecycle<ProgressProps, OwnState>(lifecycles),
  )(ProgressView);