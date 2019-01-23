import { WithAchievement, withAchievement } from '@home/hoc/withAchievement';
import { WithStyles, withStyles } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { AchievementChartView } from './AchievementChartView';

interface IOwnOption {
  useToolbar?: boolean;
}

interface IOwnState {
  symbol: string;
}

export type AchievementChartProps
  = IOwnOption
  & IOwnState
  & WithAchievement
  & WithWidth
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const lifecycles: ReactLifeCycleFunctions<AchievementChartProps, {}> = {
  componentDidMount() {
    const { isLoading, response } = this.props.achievementState.all;
    const { loadRequest } = this.props.achievementDispatch;

    if (!isLoading && !response) {
      loadRequest({});
    }
  }
};

export const AchievementChart = compose<AchievementChartProps, IOwnOption>(
  withAchievement,
  withWidth(),
  injectIntl,
  lifecycle(lifecycles),
  withStyles(styles)
)(AchievementChartView);