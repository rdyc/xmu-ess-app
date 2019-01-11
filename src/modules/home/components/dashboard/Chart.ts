import { WithChart, withChart } from '@home/hoc/withChart';
import {
  compose,
  lifecycle,
  ReactLifeCycleFunctions,
} from 'recompose';
import { ChartView } from './ChartView';

export type ChartProps
  = WithChart;

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
  lifecycle(lifecycles)
)(ChartView);