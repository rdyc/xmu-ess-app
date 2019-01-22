import AppMenu from '@constants/AppMenu';
import { homeMessage } from '@home/locales/messages';
import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { DashboardView } from './dashboardView';

export type DashboardProps
  = WithLayout
  & WithAppBar
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<DashboardProps, {}> = {
  componentDidMount() {
    const { intl, layoutDispatch } = this.props;
    
    layoutDispatch.changeView({
      uid: AppMenu.Dashboard,
      parentUid: AppMenu.Home,
      title: intl.formatMessage(homeMessage.dashboard.page.title),
      subTitle: intl.formatMessage(homeMessage.dashboard.page.subHeader)
    });
  },
  componentWillUnmount() {
    const { layoutDispatch, appBarDispatch } = this.props;

    layoutDispatch.changeView(null);
    layoutDispatch.navBackHide();
    layoutDispatch.moreHide();

    appBarDispatch.dispose();
  }
};

export const Dashboard = compose(
  withLayout,
  withAppBar,
  injectIntl,
  lifecycle(lifecycles)
)(DashboardView);