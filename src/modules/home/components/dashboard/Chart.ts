import { WithChart, withChart } from '@home/hoc/withChart';
import { WithStyles, withStyles, WithTheme } from '@material-ui/core';
import styles from '@styles';
import { compose, lifecycle, ReactLifeCycleFunctions } from 'recompose';

import { ChartView } from './ChartView';

export type ChartProps
  = WithChart
  & WithTheme
  & WithStyles<typeof styles>;

const lifecycles: ReactLifeCycleFunctions<ChartProps, {}> = {
  componentDidMount() {
    const { isLoading, response } = this.props.chartState.detail;
    const { loadAllRequest } = this.props.chartDispatch;

    if (!isLoading && !response) {
      loadAllRequest({});
    }
  }
};

export const Chart = compose(
  withChart,
  lifecycle(lifecycles),
  withStyles(styles, { withTheme: true })
)(ChartView);