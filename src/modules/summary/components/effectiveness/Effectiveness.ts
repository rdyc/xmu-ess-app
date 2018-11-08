import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithUser, withUser } from '@layout/hoc/withUser';
import { EffectivenessView } from '@summary/components/effectiveness/EffectivenessView';
import { WithSummary, withSummary } from '@summary/hoc/withSummary';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps, withRouter } from 'react-router';
import {
  compose,
  HandleCreators,
  lifecycle,
  mapper,
  ReactLifeCycleFunctions,
  StateHandlerMap,
  StateUpdaters,
  withHandlers,
  withStateHandlers,
} from 'recompose';

export interface OwnHandlers {
}

interface OwnOptions {
}

interface OwnState {
}

interface OwnStateUpdaters extends StateHandlerMap<OwnState> {
}

export type EffectivenessProps 
  = WithSummary
  & WithUser
  & WithLayout
  & RouteComponentProps
  & InjectedIntlProps
  & OwnOptions
  & OwnHandlers
  & OwnState
  & OwnStateUpdaters;

const createProps: mapper<EffectivenessProps, OwnState> = (props: EffectivenessProps): OwnState => {

    return { 
    };
  };

const stateUpdaters: StateUpdaters<OwnOptions, OwnState, OwnStateUpdaters> = {
  };

const handlerCreators: HandleCreators<EffectivenessProps, OwnHandlers> = {
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
        title: intl.formatMessage({id: 'summary.effectiveness.title'}),
        subTitle : intl.formatMessage({id: 'summary.effectiveness.subTitle'})
      });
  
      // layoutDispatch.modeListOn();
      layoutDispatch.searchShow();
      layoutDispatch.actionCentreShow();
    
      // only load data when response are empty
      if (!isLoading && !response) {
        loadData(this.props);
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
      if (view && view.parentUid !== AppMenu.Report) {
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
          projectUid: undefined
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
    withStateHandlers<OwnState, OwnStateUpdaters, OwnOptions>(createProps, stateUpdaters), 
    withHandlers<EffectivenessProps, OwnHandlers>(handlerCreators),
    lifecycle<EffectivenessProps, OwnState>(lifecycles),
  )(EffectivenessView);