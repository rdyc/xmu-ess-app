import { homeMessage } from '@home/locales/messages';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
// import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip } from 'victory';
import { AchievementChartProps } from './AchievementChart';

export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
  // const { classes, width } = props;
  // const isMobile = isWidthDown('sm', width);
  // const isMobileXS = isWidthDown('xs', width);

  return (
    <div className={props.classes.marginFarBottom}>
      {
        props.useToolbar &&
        <Toolbar className={props.classes.toolbarCustom}>
          <Typography variant="h6" className={props.classes.flex} color="inherit">
            {props.intl.formatMessage(homeMessage.dashboard.section.achievementChartTitle)}
          </Typography>
        </Toolbar>
      }

      {
        props.achievementState.all.isLoading &&
        <Typography variant="body2">
          {props.intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }

      <Grid container spacing={16} className={props.classes.marginFarBottom} direction="row" justify="flex-start">
        {
          props.achievementState.all.response &&
          props.achievementState.all.response.data &&
          props.achievementState.all.response.data.map((item) => (
            <React.Fragment>
              <Grid item xs={12} md={6}>
                <Card square >
                  <CardHeader title={item.title} subheader={item.description} />
                  {/* <CardContent className={isMobile ? classes.chartContentXS : classes.chartContent}> */}
                  <VictoryChart
                    animate={{ duration: 2000, easing: 'bounce' }}
                    // containerComponent={<VictoryContainer height={100} />}
                    domainPadding={{ x: 20, y: 20 }}
                    height={800}
                    padding={{ bottom: 50, left: 120, top: 10, right: 50 }}
                  >
                    <VictoryAxis
                      dependentAxis
                      tickLabelComponent={<VictoryLabel textAnchor="end" />}
                    />
                    <VictoryAxis
                      tickLabelComponent={<VictoryLabel />}
                      tickFormat={(x) => (`${x} ${item.unit}`)}
                    />
                    <VictoryBar
                      horizontal
                      labelComponent={<VictoryTooltip />}
                      // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                      style={{
                        data: { fill: 'blue', strokeWidth: 0 },
                        // labels: { fontSize: isMobile ? 5 : 4 }
                      }}
                      data={item.valueObject}
                      x="name"
                      y="value"
                      labels={(y) => `${y.value} ${item.unit}`}
                    />

                  </VictoryChart>
                </Card>
              </Grid>

              <Grid item xs={12} md={6}>
                <Grid container direction="row" justify="flex-start">
                  <Grid item xs={12} sm={12} md={12}>
                    <Card square>
                      <CardHeader
                        title={item.title}
                        subheader={item.description}
                      />
                      <CardContent>
                        <VictoryChart
                          animate={{ duration: 2000, easing: 'bounce' }}
                          domainPadding={{ x: 20, y: 20 }}
                          padding={{ bottom: 50, left: 100, top: 10, right: 50 }}
                        >
                          <VictoryAxis
                            dependentAxis
                            tickLabelComponent={<VictoryLabel textAnchor="end" />}
                          />
                          <VictoryAxis
                            tickFormat={(x) => (`${x} ${item.unit}`)}
                          />
                          <VictoryBar
                            horizontal
                            labelComponent={<VictoryTooltip />}
                            // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                            style={{
                              data: { fill: 'blue', strokeWidth: 0 },
                              // labels: { fontSize: isMobile ? 5 : 4 }
                            }}
                            data={item.valueObject}
                            x="name"
                            y="value"
                            labels={(y) => `${y.value} ${item.unit}`}
                          />
                        </VictoryChart>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Card square>
                      <CardHeader
                        title={item.title}
                        subheader={item.description}
                      />
                      <CardContent>
                        <VictoryChart
                          animate={{ duration: 2000, easing: 'bounce' }}
                          domainPadding={{ x: 20, y: 20 }}
                          padding={{ bottom: 50, left: 100, top: 10, right: 50 }}
                        >
                          <VictoryAxis
                            dependentAxis
                            tickLabelComponent={<VictoryLabel textAnchor="end" />}
                          />
                          <VictoryAxis
                            tickFormat={(x) => (`${x} ${item.unit}`)}
                          />
                          <VictoryBar
                            horizontal
                            labelComponent={<VictoryTooltip />}
                            // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                            style={{
                              data: { fill: 'blue', strokeWidth: 0 },
                              // labels: { fontSize: isMobile ? 5 : 4 }
                            }}
                            data={item.title === 'ETG Divison' ? item.valueObject : undefined}
                            x="name"
                            y="value"
                            labels={(y) => `${y.value} ${item.unit}`}
                          />
                        </VictoryChart>
                      </CardContent>
                    </Card>
                  </Grid>

                  <Grid item xs={12} sm={12} md={12}>
                    <Card square>
                      <CardHeader
                        title={item.title}
                        subheader={item.description}
                      />
                      <CardContent>
                        <VictoryChart
                          animate={{ duration: 2000, easing: 'bounce' }}
                          domainPadding={{ x: 20, y: 20 }}
                          padding={{ bottom: 50, left: 100, top: 10, right: 50 }}
                        >
                          <VictoryAxis
                            dependentAxis
                            tickLabelComponent={<VictoryLabel textAnchor="end" />}
                          />
                          <VictoryAxis
                            tickFormat={(x) => (`${x} ${item.unit}`)}
                          />
                          <VictoryBar
                            horizontal
                            labelComponent={<VictoryTooltip />}
                            // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                            style={{
                              data: { fill: 'blue', strokeWidth: 0 },
                              // labels: { fontSize: isMobile ? 5 : 4 }
                            }}
                            data={item.valueObject}
                            x="name"
                            y="value"
                            labels={(y) => `${y.value} ${item.unit}`}
                          />
                        </VictoryChart>
                      </CardContent>
                    </Card>
                  </Grid>
                </Grid>
              </Grid>
            </React.Fragment>
          ))
        }
      </Grid>
    </div>
  );
};
