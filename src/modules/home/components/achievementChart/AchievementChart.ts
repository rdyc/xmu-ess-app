import { WithAchievement, withAchievement } from '@home/hoc/withAchievement';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import withWidth, { WithWidth } from '@material-ui/core/withWidth';
import styles from '@styles';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { AchievementChartView } from './AchievementChartView';

interface OwnState {
  symbol: string;
}

export type AchievementChartProps
  = OwnState
  & WithAchievement
  & WithTheme
  & WithWidth
  & WithStyles<typeof styles>;

const lifecycles: ReactLifeCycleFunctions<AchievementChartProps, {}> = {
  componentDidMount() {
    const { isLoading, response } = this.props.achievementState.all;
    const { loadRequest } = this.props.achievementDispatch;

    if (!isLoading && !response) {
      loadRequest({});
    }
  }
};

export const AchievementChart = compose(
  withAchievement,
  withWidth(),
  lifecycle(lifecycles),
  withStyles(styles, { withTheme: true })
)(AchievementChartView);