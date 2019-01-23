import { WithAppBar, withAppBar } from '@layout/hoc/withAppBar';
import { WithLayout, withLayout } from '@layout/hoc/withLayout';
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
  & WithLayout
  & WithAppBar
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const lifeCycles: ReactLifeCycleFunctions<ForbiddenProps, {}> = {
  componentDidMount() {
    this.props.layoutDispatch.setupView({
      view: {
        uid: '',
        parentUid: '',
        title: this.props.intl.formatMessage(layoutMessage.page.forbidden),
        subTitle: '',
      },
      status: {
        isNavBackVisible: true,
        isSearchVisible: false,
        isActionCentreVisible: false,
        isMoreVisible: false,
        isModeList: false,
        isModeSearch: false
      }
    });
  },
  componentWillUnmount() {
    // reset top bar back to default 
    this.props.appBarDispatch.dispose();
  }
};

export const Forbidden = compose<ForbiddenProps, IOwnOption>(
  setDisplayName('Forbidden'),
  withLayout,
  withAppBar,
  injectIntl,
  lifecycle(lifeCycles),
  withStyles(styles)
)(ForbiddenView);