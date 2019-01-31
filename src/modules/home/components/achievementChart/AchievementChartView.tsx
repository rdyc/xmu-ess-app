import { IValueResponse } from '@home/classes/response/achievement';
import { homeMessage } from '@home/locales/messages';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
// import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme, VictoryTooltip } from 'victory';

import { AchievementChartProps } from './AchievementChart';

export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
  // const { classes, width } = props;
  // const isMobile = isWidthDown('sm', width);
  // const isMobileXS = isWidthDown('xs', width);

  // { if (!isNullOrUndefined(props.achievementState.all.response)) {
  //   props.handleOnChange(props.achievementState.all.response.data);
  // }}

  const colorModifier: any = {
    fill: (data: IValueResponse) => {
      let color = 'blue';

      // if (data.value > 0 && data.value <= 25) {
      //   color = 'red';
      // }

      // if (data.value > 25 && data.value <= 50) {
      //   color = 'orange';
      // }

      // if (data.value > 50 && data.value <= 75) {
      //   color = 'yellow';
      // }

      if (data.value > 100) {
        color = 'green';
      }

      return color;
    },
    strokeWidth: 0
  };

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
          {props.dataSales && (
            <Grid item xs={12} md={6}>
              <Card square >
                <CardHeader title={props.dataSales && props.dataSales.title} subheader={props.dataSales && props.dataSales.description} />
                {/* <CardContent className={isMobile ? classes.chartContentXS : classes.chartContent}> */}
                <VictoryChart
                  animate={{ duration: 2000, easing: 'bounce' }}
                  // containerComponent={<VictoryContainer height={100} />}
                  domainPadding={{ x: 20, y: 20 }}
                  height={725}
                  padding={{ bottom: 75, left: 120, top: 10, right: 50 }}
                  theme={VictoryTheme.material}
                >
                  <VictoryAxis
                    dependentAxis
                    tickLabelComponent={<VictoryLabel textAnchor="end" />}
                  />
                  <VictoryAxis
                    label={props.dataSales.unit}
                    tickFormat={(x) => (`${x}`)}
                    style={{ axisLabel: { padding: 30 } }}
                  />
                  <VictoryBar
                    horizontal
                    labelComponent={<VictoryTooltip />}
                    // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                    style={{
                      data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                      labels: { fontSize: 10}
                      // labels: { fontSize: isMobile ? 5 : 4 }
                    }}
                    data={props.dataSales && props.dataSales.valueObject}
                    x="name"
                    y="value"
                    labels={(y) => `${y.value} ${props.dataSales && props.dataSales.unit}`}
                  />

                </VictoryChart>
              </Card>
            </Grid>
          )}

          <Grid item xs={12} md={6}>
            <Grid container spacing={16} direction="row" justify="flex-start">
              {props.dataDepartment && (
                <Grid item xs={12} sm={12} md={12}>
                  <Card square>
                    <CardHeader
                      title={props.dataDepartment && props.dataDepartment.title}
                      subheader={props.dataDepartment && props.dataDepartment.description}
                    />
                    <CardContent>
                      <VictoryChart
                        animate={{ duration: 2000, easing: 'bounce' }}
                        domainPadding={{ x: 20, y: 20 }}
                        padding={{ bottom: 50, left: 100, top: 10, right: 50 }}
                        height={250}
                        theme={VictoryTheme.material}
                      >
                        <VictoryAxis
                          dependentAxis
                          tickLabelComponent={<VictoryLabel textAnchor="end" />}
                        />
                        <VictoryAxis
                          label={props.dataDepartment.unit}
                          tickFormat={(x) => (`${x}`)}
                          style={{ axisLabel: { padding: 30 } }}
                        />
                        <VictoryBar
                          horizontal
                          labelComponent={<VictoryTooltip />}
                          // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                          style={{
                            data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                            labels: { fontSize: 10}
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

              {props.dataDiv && (
                <Grid item xs={12} sm={12} md={12}>
                  <Card square>
                    <CardHeader
                      title={props.dataDiv.title}
                      subheader={props.dataDiv.description}
                    />
                    <CardContent>
                      <VictoryChart
                        animate={{ duration: 2000, easing: 'bounce' }}
                        domainPadding={{ x: 20, y: 20 }}
                        padding={{ bottom: 50, left: 100, top: 10, right: 50 }}
                        height={150}
                        theme={VictoryTheme.material}
                      >
                        <VictoryAxis
                          dependentAxis
                          tickLabelComponent={<VictoryLabel textAnchor="end" />}
                        />
                        <VictoryAxis
                          label={props.dataDiv.unit}
                          tickFormat={(x) => (`${x}`)}
                          style={{ axisLabel: { padding: 30 } }}
                        />
                        <VictoryBar
                          horizontal
                          labelComponent={<VictoryTooltip />}
                          // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                          style={{
                            data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                            labels: { fontSize: 10}
                            // labels: { fontSize: isMobile ? 5 : 4 }
                          }}
                          data={props.dataDiv && props.dataDiv.valueObject}
                          x="name"
                          y="value"
                          labels={(y) => `${y.value} ${props.dataDiv && props.dataDiv.unit}`}
                        />
                      </VictoryChart>
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {props.dataLob && (
                <Grid item xs={12} sm={12} md={12}>
                  <Card square>
                    <CardHeader
                      title={props.dataLob.title}
                      subheader={props.dataLob.description}
                    />
                    <CardContent>
                      <VictoryChart
                        animate={{ duration: 2000, easing: 'bounce' }}
                        domainPadding={{ x: 20, y: 20 }}
                        padding={{ bottom: 50, left: 100, top: 10, right: 50 }}
                        height={150}
                        theme={VictoryTheme.material}
                      >
                        <VictoryAxis
                          dependentAxis
                          tickLabelComponent={<VictoryLabel textAnchor="end" />}
                        />
                        <VictoryAxis
                          label={props.dataLob.unit}
                          tickFormat={(x) => (`${x}`)}
                          style={{ axisLabel: { padding: 30 } }}
                        />
                        <VictoryBar
                          horizontal
                          labelComponent={<VictoryTooltip />}
                          // style={{ data: { fill: (d: any) => d.percentage > 80 ? 'green' : 'blue'}}}
                          style={{
                            data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                            labels: { fontSize: 10}
                            // labels: { fontSize: isMobile ? 5 : 4 }
                          }}
                          data={props.dataLob.valueObject}
                          x="name"
                          y="value"
                          labels={(y) => `${y.value} ${props.dataLob && props.dataLob.unit}`}
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
