import { WithMasterPage, withMasterPage } from '@layout/hoc/withMasterPage';
import { layoutMessage } from '@layout/locales/messages';
import { WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { RouteProps } from 'react-router';
import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';

import { ForbiddenView } from './ForbiddenView';

interface IOwnOption extends RouteProps {

}

export type ForbiddenProps
  = IOwnOption
  & WithMasterPage
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const lifeCycles: ReactLifeCycleFunctions<ForbiddenProps, {}> = {
  componentDidMount() {
    this.props.masterPage.changePage({
      uid: '',
      parentUid: '',
      title: this.props.intl.formatMessage(layoutMessage.page.forbidden),
    });
  },
  componentWillUnmount() {
    this.props.masterPage.resetPage();
  }
};

export const Forbidden = compose<ForbiddenProps, IOwnOption>(
  setDisplayName('Forbidden'),
  withMasterPage,
  injectIntl,
  lifecycle(lifeCycles),
  withStyles(styles)
)(ForbiddenView);