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

import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { CommonSummaryView } from './CommonSummaryView';

interface OwnOption {
}

interface OwnState {
  editableTypes: string[];
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
}

interface OwnHandler {
}

export type CommonCategoryCount = {
  name: string,
  active: number | 0,
  inactive: number | 0
};

export type CommonListProps
  = OwnOption
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & OwnHandler
  & WithLayout;

const createProps: mapper<OwnOption, OwnState> = (): OwnState => ({
  editableTypes: [
    'Business Unit', 'Department', 'Employement Status',
    'PTKP Status', 'Blood Type', 'Religion',
    'Education Degree', 'Family Status', 'Training Type',
    'Certification Type', 'Site Type'
  ]
});

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
};

const handlerCreators: HandleCreators<CommonListProps, OwnHandler> = {
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CommonListProps, OwnState> = {
  componentWillMount() {
    const { 
      layoutDispatch 
    } = this.props;
    
    layoutDispatch.searchHide();

    layoutDispatch.changeView({
      uid: AppMenu.SystemSetup,
      parentUid: AppMenu.Setup,
      title: 'System Setup', // intl.formatMessage({id: 'summary.effectiveness.title'}),
      subTitle : 'Lorem Ipsum Something', // intl.formatMessage({id: 'summary.effectiveness.subTitle'})
    });
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    
    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    if (view && view.uid !== AppMenu.ReportEffectiveness) {
      // nope loadEffectivenessDispose();
    }
  }
};

export const CommonSummary = compose<CommonListProps, OwnOption>(
  withLayout,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(CommonSummaryView);