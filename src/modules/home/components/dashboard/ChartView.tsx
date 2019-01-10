import { ValueScale } from '@devexpress/dx-react-chart';
import {
  ArgumentAxis,
  BarSeries,
  Chart,
  ValueAxis,
} from '@devexpress/dx-react-chart-material-ui';
import { Grid } from '@material-ui/core';
import Paper from '@material-ui/core/Paper';
import * as React from 'react';
import { ChartProps } from './Chart';

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
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <BarSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
              /> 

            </Chart>
          </Grid>

          <Grid item xs={12} md={4}>
            <Chart data={props.chartState.detail.response.data.businessUnits}>
              <ValueScale name="percentage" />

              <ArgumentAxis />
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <BarSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
              />

            </Chart>
          </Grid>

          <Grid item xs={12} md={4}>
            <Chart data={props.chartState.detail.response.data.departments}>
              <ValueScale name="percentage" />

              <ArgumentAxis />
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <BarSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
              />

            </Chart>
          </Grid>

          <Grid item xs={12} md={12}>
            <Chart data={props.chartState.detail.response.data.sales}>
              <ValueScale name="percentage" />

              <ArgumentAxis />
              <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} />

              <BarSeries
                name="Percentage"
                valueField="percentage"
                argumentField="companyName"
                scaleName="percentage"
              />

            </Chart>
          </Grid>
        </Grid>
      </React.Fragment>
    }
  </Paper>
);
