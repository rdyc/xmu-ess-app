import AppMenu from '@constants/AppMenu';
import { homeMessage } from '@home/locales/messages';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { DashboardView } from './dashboardView';

export type DashboardProps
  = WithLayout
  & WithMasterPage
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<DashboardProps, {}> = {
  componentDidMount() {
    this.props.masterPage.changePage({
      uid: AppMenu.Dashboard,
      parentUid: AppMenu.Home,
      title: this.props.intl.formatMessage(homeMessage.dashboard.page.title),
      description: this.props.intl.formatMessage(homeMessage.dashboard.page.subHeader)
    });
  },
  componentWillUnmount() {
    this.props.masterPage.resetPage();
  }
};

export const Dashboard = compose(
  withLayout,
  withMasterPage,
  injectIntl,
  lifecycle(lifecycles)
)(DashboardView);