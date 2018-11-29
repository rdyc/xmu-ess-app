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

import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { CommonSummaryView } from './CommonSummaryView';

interface OwnOption {
}

interface OwnState {
}

interface OwnStateUpdater extends StateHandlerMap<OwnState> {
}

interface OwnHandler {
  handleGoToCategoryList: (category: string) => void;
}

export type CommonCategoryCount = {
  name: string,
  active: number | 0,
  inactive: number | 0
};

export type CommonSummaryProps
  = OwnOption
  & WithCommonSystem
  & OwnState
  & OwnStateUpdater
  & InjectedIntlProps
  & OwnHandler
  & RouteComponentProps
  & WithLayout;

const createProps: mapper<OwnOption, OwnState> = (): OwnState => {

  return {};
};

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
};

const handlerCreators: HandleCreators<CommonSummaryProps, OwnHandler> = {
  handleGoToCategoryList: (props: CommonSummaryProps) => (category: string) => {
    const { history } = props;

    history.push(`/common/system/${category}`);
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CommonSummaryProps, OwnState> = {
  componentWillMount() {
    const { 
      layoutDispatch, intl
    } = this.props;
    const { systemTypeRequest } = this.props.commonDispatch;
    const { response, isLoading } = this.props.commonSystemState.type;

    layoutDispatch.setupView({
      view: {
        uid: AppMenu.Common,
        parentUid: AppMenu.Lookup,
        title: intl.formatMessage(commonMessage.system.page.title),
        subTitle : intl.formatMessage(commonMessage.system.page.title)
      },
      status: {
        isNavBackVisible: false,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeSearch: false
      }
    });

    if (!response && !isLoading) {
      systemTypeRequest();
    }
  },
  componentWillUnmount() {
    const { layoutDispatch } = this.props;
    const { view } = this.props.layoutState;
    const { systemTypeDispose } = this.props.commonDispatch;
    
    layoutDispatch.changeView(null);
    layoutDispatch.modeListOff();
    layoutDispatch.searchHide();
    layoutDispatch.modeSearchOff();
    layoutDispatch.actionCentreHide();
    layoutDispatch.moreHide();

    if (view && view.uid !== AppMenu.Common) {
      systemTypeDispose();
    }
  }
};

export const CommonSummary = compose<CommonSummaryProps, {}>(
  withLayout,
  withCommonSystem,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(CommonSummaryView);