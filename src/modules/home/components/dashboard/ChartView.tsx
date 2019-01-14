import { Animation, EventTracker, HoverState, ValueScale } from '@devexpress/dx-react-chart';
import { ArgumentAxis, BarSeries, Chart, Tooltip, ValueAxis } from '@devexpress/dx-react-chart-material-ui';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import * as React from 'react';

import { ChartProps } from './Chart';

const labelRotation: React.ComponentType<ArgumentAxis.LabelProps> = props => {
  return (
    <ArgumentAxis.Label
      {...props}
      textAnchor={'start'}
      style={{position: 'relative', textAlign: 'right', transformOrigin: '100% 0%', transform: 'rotate(45deg)'}} />
  );
};

const Label: React.ComponentType<ValueAxis.LabelProps> = props => {
  return (
    <ValueAxis.Label
      {...props}
      text={`${props.text} %`}
    />
  );
};

export const ChartView: React.SFC<ChartProps> = props => {
  return (
  <React.Fragment>
    {
      props.chartState.detail.response &&
      props.chartState.detail.response.data &&
      <Grid container spacing={16} className={props.classes.marginFarBottom}>
        <Grid item xs={12} sm={12} md={4}>
          <Card square>
            <CardHeader title="ETG Companies" subheader="(EQG - NPP - ODI - XMU)" />
            <CardContent>
              <Chart data={props.chartState.detail.response.data.companies} height={300} >
                <ValueScale name="percentage" />

                <ArgumentAxis labelComponent={labelRotation}/>

                <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} showLabels={true} labelComponent={Label}/>

                <BarSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                  color={props.theme.palette.primary.main}
                />

                <EventTracker />
                <HoverState />
                <Tooltip />
                <Animation />
              </Chart>
            </CardContent>
          </Card>

        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Card square>
            <CardHeader title="ETG Bussines Unit" subheader="(EQG - NPP - ODI - XMU)" />
            <CardContent>
              <Chart data={props.chartState.detail.response.data.businessUnits} height={300}>
                <ValueScale name="percentage" />

                <ArgumentAxis labelComponent={labelRotation}/>

                <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} labelComponent={Label} />

                {/* <AreaSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                  color="green"
                /> */}

                <BarSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                  color={props.theme.palette.primary.main}
                />

                <EventTracker />
                <HoverState />
                <Tooltip />
                <Animation />
              </Chart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={12} md={4}>
          <Card square>
            <CardHeader title="ETG Department" subheader="(EQG - NPP - ODI - XMU)" />
            <CardContent>
              <Chart data={props.chartState.detail.response.data.departments} height={300}>
                <ValueScale name="percentage" />

                <ArgumentAxis />
                <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} labelComponent={Label} />

                {/* <LineSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                /> */}

                <BarSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                  color={props.theme.palette.primary.main}
                />

                <EventTracker />
                <HoverState />
                <Tooltip />
                <Animation />
              </Chart>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} md={12}>
          <Card square>
            <CardHeader title="ETG Sales Team" subheader="(EQG - NPP - ODI - XMU)" />
            <CardContent>
              <Chart data={props.chartState.detail.response.data.sales} height={300}>
                <ValueScale name="percentage" />

                <ArgumentAxis />
                <ValueAxis scaleName="percentage" showGrid={false} showLine={true} showTicks={true} labelComponent={Label} />

                {/* <SplineSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                  color="pink"
                /> */}

                <BarSeries
                  name="Percentage"
                  valueField="percentage"
                  argumentField="companyName"
                  scaleName="percentage"
                  color={props.theme.palette.primary.main}
                />

                <EventTracker />
                <HoverState />
                <Tooltip />
                <Animation />
              </Chart>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    }
  </React.Fragment>
  );
};
