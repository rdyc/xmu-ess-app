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
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
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

export type CommonSummaryProps
  = OwnOption
  & WithCommonSystem
  & OwnState
  & OwnStateUpdater
  & WithMasterPage
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
    const { response } = props.commonSystemState.all;
    const { systemAllDispose } = props.commonDispatch;

    if (response) {
      systemAllDispose();
    }

    history.push(`/common/system/${category}`);
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CommonSummaryProps, OwnState> = {
  componentWillMount() {
    const { 
      intl
    } = this.props;
    const { systemTypeRequest } = this.props.commonDispatch;
    const { response, isLoading } = this.props.commonSystemState.type;

    this.props.masterPage.changePage({
      uid: AppMenu.Common,
      parentUid: AppMenu.Lookup,
      title: intl.formatMessage(commonMessage.system.page.title),
    });

    if (!response && !isLoading) {
      systemTypeRequest();
    }
  },
  componentWillUnmount() {
    const { systemTypeDispose } = this.props.commonDispatch;

    systemTypeDispose();
  }
};

export const CommonSummary = compose<CommonSummaryProps, {}>(
  withLayout,
  withCommonSystem,
  withMasterPage,
  injectIntl,
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
  lifecycle(lifeCycleFunctions)
)(CommonSummaryView);