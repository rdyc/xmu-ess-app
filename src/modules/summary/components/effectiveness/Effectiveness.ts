import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { WithStyles, withStyles, withWidth } from '@material-ui/core';
import { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { EffectivenessView } from '@summary/components/effectiveness/EffectivenessView';
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
  StateHandler,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';
import { IEffectivenessFilterResult } from './EffectivenessFilter';

interface OwnHandlers {
  handleChangeFilter: (filter: IEffectivenessFilterResult) => void;
  handleReloadData: () => void;
}

interface OwnOptions {
}

interface OwnState extends IEffectivenessFilterResult {
  reloadData: boolean;
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
  stateUpdate: StateHandler<OwnState>;
  setFilterApplied: StateHandler<OwnState>;
}

export type EffectivenessProps 
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

const createProps: mapper<EffectivenessProps, OwnState> = (props: EffectivenessProps): OwnState => {
    return { 
      reloadData: false,
    };
  };

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  stateUpdate: (prevState: OwnState) => (newState: any) => ({
    ...prevState,
    ...newState
  }),
  setFilterApplied: (prevState: OwnState) => (filter: IEffectivenessFilterResult) => ({
    ...filter
  }),
};

const handlerCreators: HandleCreators<EffectivenessProps, OwnHandlers> = {
  handleChangeFilter: (props: EffectivenessProps) => (filter: IEffectivenessFilterResult) => {
    props.setFilterApplied(filter);
  },
  handleReloadData: (props: EffectivenessProps) => () => {
    props.stateUpdate({
      reloadData: true,
    });
  }
};

const lifecycles: ReactLifeCycleFunctions<EffectivenessProps, OwnState> = {
    componentDidMount() { 
      const { 
        layoutDispatch, intl 
      } = this.props;
      
      const { isLoading, response } = this.props.summaryState.effectiveness;
  
      layoutDispatch.changeView({
        uid: AppMenu.ReportEffectiveness,
        parentUid: AppMenu.Report,
        title: intl.formatMessage(summaryMessage.effectiveness.page.title),
        subTitle : intl.formatMessage(summaryMessage.effectiveness.page.subTitle)
      });
  
      layoutDispatch.searchShow();
    
      // only load data when response are empty
      if (!isLoading && !response) {
        loadData(this.props);
      }
    },
    componentWillUpdate(props: EffectivenessProps, state: OwnState) {
      if (this.props.employeeUid !== props.employeeUid ||
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
      const { loadEffectivenessDispose } = this.props.summaryDispatch;
  
      layoutDispatch.changeView(null);
      layoutDispatch.modeListOff();
      layoutDispatch.searchHide();
      layoutDispatch.modeSearchOff();
      layoutDispatch.actionCentreHide();
      layoutDispatch.moreHide();
  
      // dispose 'get all' from 'redux store' when the page is 'out of project registration' context 
      if (view && view.uid !== AppMenu.ReportEffectiveness) {
        loadEffectivenessDispose();
      }
    }
  };

const loadData = (props: EffectivenessProps): void => {
    const { user } = props.userState;
    const { loadEffectivenessRequest } = props.summaryDispatch;
    const { alertAdd } = props.layoutDispatch;

    if (user) {
      loadEffectivenessRequest({
        filter: {
          employeeUid: undefined,
          projectUid: props.projectUid,
        }
      }); 
    } else {
      alertAdd({
        time: new Date(),
        message: 'Unable to find current user state'
      });
    }
  };

export const Effectiveness = compose<EffectivenessProps, OwnOptions>(
    withSummary,
    withUser,
    withLayout,
    withRouter,
    injectIntl,
    withWidth(),
    withStyles(styles),
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<EffectivenessProps, OwnHandlers>(handlerCreators),
    lifecycle<EffectivenessProps, OwnState>(lifecycles),
  )(EffectivenessView);