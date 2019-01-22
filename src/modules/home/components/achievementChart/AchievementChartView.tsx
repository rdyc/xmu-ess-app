import { homeMessage } from '@home/locales/messages';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip } from 'victory';

import { AchievementChartProps } from './AchievementChart';

export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
  const { classes, width } = props;
  const isMobile = isWidthDown('sm', width);
  const isMobileXS = isWidthDown('xs', width);

  return (
    <div className={props.classes.marginFarBottom}>
      <Toolbar className={props.classes.toolbarCustom}>
        <Typography variant="h6" className={props.classes.flex} color="inherit">
          {props.intl.formatMessage(homeMessage.dashboard.section.achievementChartTitle)}
        </Typography>
      </Toolbar>
      
      {
        props.achievementState.all.isLoading &&
        <Typography variant="body2">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }

      {
        props.achievementState.all.response &&
        props.achievementState.all.response.data &&
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
                    data={props.achievementState.all.response.data.companies}
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
                    data={props.achievementState.all.response.data.businessUnits}
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
                    data={props.achievementState.all.response.data.departments}
                    x="companyName"
                    y="percentage"
                    labels={(d) => `${d.percentage} %`}
                  />
                </VictoryChart>
              </CardContent>
            </Card>
          </Grid>

          <Grid item xs={12} md={12}>
            <Card square className={classes.chartCard}>
              <CardHeader title="ETG Sales Team" subheader="(EQG - NPP - ODI - XMU)"  className={isMobileXS ? undefined : classes.chartHeader}/>
              <CardContent  className={isMobile ? classes.chartContentXS : classes.chartContent}>
                <VictoryChart
                  animate={{ duration: 2000, easing: 'bounce' }}
                  // containerComponent={<VictoryContainer height={100} />}
                  domainPadding={{ x: 20, y: 20 }}
                  height={isMobile ? undefined : 175}
                  // padding={{ top: -100 }}
                >
                  <VictoryAxis
                    tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" style={{ fontSize: isMobile ? 7 : 4 }} />}
                  />
                  <VictoryAxis
                    dependentAxis
                    tickLabelComponent={<VictoryLabel style={{ fontSize: isMobile ? 7 : 4 }} />}
                    tickFormat={(x) => (`${x} %`)}
                  />
                  <VictoryBar
                    labelComponent={<VictoryTooltip />}
                    // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                    style={{
                      data: { fill: 'blue', strokeWidth: 0},
                      labels: { fontSize: isMobile ? 5 : 4 }
                    }}
                    data={props.achievementState.all.response.data.sales}
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
    </div>
  );
};
