import { Animation, EventTracker, ValueScale } from '@devexpress/dx-react-chart';
import {
  AreaSeries,
  ArgumentAxis,
  BarSeries,
  Chart,
  LineSeries,
  SplineSeries,
  Title,
  Tooltip,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { ChartProps } from './Chart';

// const labelRotation: React.ComponentType<ArgumentAxis.LabelProps> = props => {
//   console.log(props); return (
//     <div>testtt
//     </div>
//   );
// };

export const ChartView: React.SFC<ChartProps> = props => (
  <Paper>
    {
      props.chartState.detail.response &&
      props.chartState.detail.response.data &&

      <React.Fragment>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Chart data={props.chartState.detail.response.data.companies}>
              <ValueScale name="percentage" />

              <ArgumentAxis />

              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} showLabels={true} />

              <BarSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
                color="orange"
              />

              <Tooltip />
              <Animation />

            </Chart>
          </Grid>

          <Grid item xs={12} md={4}>
            <Chart data={props.chartState.detail.response.data.businessUnits}>
              <ValueScale name="percentage" />

              <ArgumentAxis />
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <AreaSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
                color="green"
              />
              <Animation />

            </Chart>
          </Grid>

          <Grid item xs={12} md={4}>
            <Chart data={props.chartState.detail.response.data.departments}>
              <ValueScale name="percentage" />

              <ArgumentAxis />
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <LineSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
              />

              <Animation />

            </Chart>
          </Grid>

          <Grid item xs={12} md={12}>
            <Chart data={props.chartState.detail.response.data.sales}>
              <ValueScale name="percentage" />

              <ArgumentAxis />
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <SplineSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
                color="pink"
              />

              <Title
                text="Sales"
              />

              <Animation />
              <EventTracker />
              <Tooltip />

            </Chart>
          </Grid>
        </Grid>
      </React.Fragment>
    }
  </Paper>
);
