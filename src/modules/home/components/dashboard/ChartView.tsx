import { ValueScale } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  LineSeries,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
// import data from './image/chart.json';

const data = require('./chart.json');

interface IDataItem {
  month: string;
  sale: number;
  total: number;
}

const chartData: IDataItem[] = data;

export default class ChartView extends React.Component<object, object> {
  public render(): React.ReactNode {
    return (
      <Paper>
        <Chart
          data={chartData}
        >
          <ValueScale name="sale" />
          <ValueScale name="total" />

          <ArgumentAxis />
          <ValueAxis scaleName="sale" showGrid={false} showLine={true} showTicks={true} />
          <ValueAxis scaleName="total" position="right" showGrid={false} showLine={true} showTicks={true} />

          <BarSeries
            name="Units Sold"
            valueField="sale"
            argumentField="month"
            scaleName="sale"
          />

          <LineSeries
            name="Total Transactions"
            valueField="total"
            argumentField="month"
            scaleName="total"
          />
        </Chart>
      </Paper>
    );
  }
}
