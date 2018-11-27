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

import { CommonCategory } from '@common/classes/types';
import { WithCommonSystem, withCommonSystem } from '@common/hoc/withCommonSystem';
import { commonMessage } from '@common/locales/messages/commonMessage';
import AppMenu from '@constants/AppMenu';
import { ICollectionValue } from '@layout/classes/core';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteComponentProps } from 'react-router';
import { CommonSummaryView } from './CommonSummaryView';

interface OwnOption {
}

interface OwnState {
  editableCategories: ICollectionValue[];
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
  // put editable common category here
  const editables = [
    CommonCategory.unit, CommonCategory.department, CommonCategory.employment,
    CommonCategory.tax, CommonCategory.blood, CommonCategory.religion,
    CommonCategory.degree, CommonCategory.family, CommonCategory.training,
    CommonCategory.certification, CommonCategory.site,
  ];

  const categories = Object.keys(CommonCategory).map(key => ({ 
    value: key, 
    name: CommonCategory[key] 
  }));

  const editableCategories = categories.filter(category =>
    editables.some(editable =>
      editable === category.name));

  return {
    editableCategories
  };
};

const stateUpdaters: StateUpdaters<OwnOption, OwnState, OwnStateUpdater> = {
};

const handlerCreators: HandleCreators<CommonSummaryProps, OwnHandler> = {
  handleGoToCategoryList: (props: CommonSummaryProps) => (category: string) => {
    const { history } = props;

    history.push(`/common/${category}`);
  }
};

const lifeCycleFunctions: ReactLifeCycleFunctions<CommonSummaryProps, OwnState> = {
  componentWillMount() {
    const { 
      layoutDispatch, intl
    } = this.props;
    const { systemTypeRequest } = this.props.commonDispatch;

    systemTypeRequest();
    
    layoutDispatch.searchHide();

    layoutDispatch.changeView({
      uid: AppMenu.SystemSetup,
      parentUid: AppMenu.Setup,
      title: intl.formatMessage(commonMessage.system.page.title),
      subTitle : intl.formatMessage(commonMessage.system.page.title)
    });
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

    if (view && view.uid !== AppMenu.SystemSetup) {
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