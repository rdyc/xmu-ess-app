import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip } from 'victory';

import { ChartProps } from './Chart';

// const labelRotation: React.ComponentType<ArgumentAxis.LineProps> = props => {
//   return (
//     <ArgumentAxis.Tick
//       {...props}
//       style={{ transform: 'rotate(45deg)' }} />
//   );
// };

// const Label: React.ComponentType<ValueAxis.LabelProps> = props => {
//   return (
//     <ValueAxis.Label
//       {...props}
//       text={`${props.text} %`}
//     />
//   );
// };

// /** @type {{search: React.CSSProperties}} */

// const styles = {
//   data: {
//     fill: (data: any) => (data.y > 80 ? 'green' : 'blue')
//   }
// };

// const test = (d: any): string => { console.log(d); return ''; };

export const ChartView: React.SFC<ChartProps> = props => {
  return (
    <React.Fragment>
      {
        props.chartState.detail.response &&
        props.chartState.detail.response.data &&
        <Grid container spacing={16} className={props.classes.marginFarBottom}>
          <Grid item xs={12} sm={12} md={4}>
            <Card square>
              <CardHeader title="ETG Companies" subheader="(EQG - NPP - ODI - XMU)"/>
              <CardContent>
                <VictoryChart
                  animate={{ duration: 2000, easing: 'bounce' }}
                  domainPadding={{ x: 20, y: 20 }}
                  padding={{ bottom: 100, left: 50, top: 10, right: 50 }}
                >
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x} %`)}
                  />
                  <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    style={{
                      data: { fill: 'blue', strokeWidth: 0 },
                      labels: { fontSize: 10 }
                    }}
                    data={props.chartState.detail.response.data.companies}
                    x="companyName"
                    y="percentage"
                    labels={(d) => `${d.percentage} %`}
                  />
                </VictoryChart>
              </CardContent>
            </Card>

          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card square>
              <CardHeader title="ETG Bussines Unit" subheader="(EQG - NPP - ODI - XMU)" />
              <CardContent>
                <VictoryChart
                  animate={{ duration: 2000, easing: 'bounce' }}
                  domainPadding={{ x: 20, y: 20 }}
                  padding={{ bottom: 100, left: 50, top: 10, right: 50 }}
                >

                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x} %`)}
                  />
                  <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    style={{
                      data: { fill: 'blue', strokeWidth: 0 },
                      labels: { fontSize: 10 }
                    }}
                    data={props.chartState.detail.response.data.businessUnits}
                    x="companyName"
                    y="percentage"
                    labels={(d) => `${d.percentage} %`}
                  />
                </VictoryChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} sm={12} md={4}>
            <Card square>
              <CardHeader title="ETG Department" subheader="(EQG - NPP - ODI - XMU)" />
              <CardContent>
                <VictoryChart
                  animate={{ duration: 2000, easing: 'bounce' }}
                  domainPadding={{ x: 20, y: 20 }}
                  padding={{ bottom: 100, left: 50, top: 10, right: 50 }}
                >
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickFormat={(x) => (`${x} %`)}
                    crossAxis={false}
                  />
                  <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    style={{
                      data: { fill: 'blue', strokeWidth: 0 },
                      labels: { fontSize: 10 }
                    }}
                    data={props.chartState.detail.response.data.departments}
                    x="companyName"
                    y="percentage"
                    labels={(d) => `${d.percentage} %`}
                  />
                </VictoryChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card square>
              <CardHeader title="ETG Sales Team" subheader="(EQG - NPP - ODI - XMU)" style={{height: 100}}/>
              <CardContent>
                <VictoryChart
                  animate={{ duration: 2000, easing: 'bounce' }}
                  // containerComponent={<VictoryContainer height={100} />}
                  domainPadding={{ x: 20, y: 20 }}
                  padding={{ bottom: 100, left: 50, top: 20, right: 50 }}
                >
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" style={{ fontSize: 6 }} />}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickLabelComponent={<VictoryLabel style={{ fontSize: 6 }} />}
                    tickFormat={(x) => (`${x} %`)}
                  />
                  <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                    style={{
                      data: { fill: 'blue', strokeWidth: 0},
                      labels: { fontSize: 5 }
                    }}
                    data={props.chartState.detail.response.data.sales}
                    x="companyName"
                    y="percentage"
                    labels={(d) => `${d.percentage} %`}
                  />

                </VictoryChart>
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
};
