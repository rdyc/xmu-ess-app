import { homeMessage } from '@home/locales/messages';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
// import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
// import { isNullOrUndefined } from 'util';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTooltip } from 'victory';
import { AchievementChartProps } from './AchievementChart';

export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
  // const { classes, width } = props;
  // const isMobile = isWidthDown('sm', width);
  // const isMobileXS = isWidthDown('xs', width);

  // { if (!isNullOrUndefined(props.achievementState.all.response)) {
  //   props.handleOnChange(props.achievementState.all.response.data);
  // }}

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
        {/* {
          props.achievementState.all.response &&
          props.achievementState.all.response.data &&
          props.achievementState.all.response.data.map((item) => ( */}
            <React.Fragment>
              {props.dataDiv && (
                <Grid item xs={12} md={6}>
                  <Card square >
                    <CardHeader title={props.dataDiv && props.dataDiv.title} subheader={props.dataDiv && props.dataDiv.description} />
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
                        tickFormat={(x) => (`${x} ${props.dataDiv && props.dataDiv.unit}`)}
                      />
                      <VictoryBar
                        horizontal
                        labelComponent={<VictoryTooltip />}
                        // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                        style={{
                          data: { fill: 'blue', strokeWidth: 0 },
                          // labels: { fontSize: isMobile ? 5 : 4 }
                        }}
                        data={props.dataDiv && props.dataDiv.valueObject}
                        x="name"
                        y="value"
                        labels={(y) => `${y.value} ${props.dataDiv && props.dataDiv.unit}`}
                      />

                    </VictoryChart>
                  </Card>
                </Grid>
              )}

              <Grid item xs={12} md={6}>
                <Grid container direction="row" justify="flex-start">
                  {props.dataLob && (
                    <Grid item xs={12} sm={12} md={12}>
                      <Card square>
                        <CardHeader
                          title={props.dataLob && props.dataLob.title}
                          subheader={props.dataLob && props.dataLob.description}
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
                              tickFormat={(x) => (`${x} ${props.dataLob && props.dataLob.unit}`)}
                            />
                            <VictoryBar
                              horizontal
                              labelComponent={<VictoryTooltip />}
                              // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                              style={{
                                data: { fill: 'blue', strokeWidth: 0 },
                                // labels: { fontSize: isMobile ? 5 : 4 }
                              }}
                              data={props.dataLob && props.dataLob.valueObject}
                              x="name"
                              y="value"
                              labels={(y) => `${y.value} ${props.dataLob && props.dataLob.unit}`}
                            />
                          </VictoryChart>
                        </CardContent>
                      </Card>
                    </Grid>

                  )}

                  {props.dataDepartment && (
                    <Grid item xs={12} sm={12} md={12}>
                      <Card square>
                        <CardHeader
                          title={props.dataDepartment.title}
                          subheader={props.dataDepartment.description}
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
                              tickFormat={(x) => (`${x} ${props.dataDepartment && props.dataDepartment.unit}`)}
                            />
                            <VictoryBar
                              horizontal
                              labelComponent={<VictoryTooltip />}
                              // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                              style={{
                                data: { fill: 'blue', strokeWidth: 0 },
                                // labels: { fontSize: isMobile ? 5 : 4 }
                              }}
                              data={props.dataDepartment && props.dataDepartment.valueObject}
                              x="name"
                              y="value"
                              labels={(y) => `${y.value} ${props.dataDepartment && props.dataDepartment.unit}`}
                            />
                          </VictoryChart>
                        </CardContent>
                      </Card>
                    </Grid>
                  )}

                  {props.dataSales && (
                  <Grid item xs={12} sm={12} md={12}>
                    <Card square>
                      <CardHeader
                        title={props.dataSales.title}
                        subheader={props.dataSales.description}
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
                            tickFormat={(x) => (`${x} ${props.dataSales && props.dataSales.unit}`)}
                          />
                          <VictoryBar
                            horizontal
                            labelComponent={<VictoryTooltip />}
                            // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                            style={{
                              data: { fill: 'blue', strokeWidth: 0 },
                              // labels: { fontSize: isMobile ? 5 : 4 }
                            }}
                            data={props.dataSales.valueObject}
                            x="name"
                            y="value"
                            labels={(y) => `${y.value} ${props.dataSales && props.dataSales.unit}`}
                          />
                        </VictoryChart>
                      </CardContent>
                    </Card>
                  </Grid>
                  )}
                </Grid>
              </Grid>
            </React.Fragment>
          {/* ))
        } */}
      </Grid>
    </div>
  );
};
