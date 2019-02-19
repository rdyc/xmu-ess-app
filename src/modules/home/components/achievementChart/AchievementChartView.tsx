import { IValueResponse } from '@home/classes/response/achievement';
import { homeMessage } from '@home/locales/messages';
import { Preloader } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory';

import { HorizontalBar } from 'react-chartjs-2';
import { AchievementChartProps } from './AchievementChart';

// import { isWidthDown } from '@material-ui/core/withWidth';
export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
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

  const dataSales = {
    labels: props.sales.name,
    datasets: [
      {
        label: props.dataSales && props.dataSales.title,
        backgroundColor: props.sales.color,
        borderWidth: 1,
        // hoverBackgroundColor: '#1a237e',
        data: props.sales.value
      }
    ]
  };
  const dataDepartment = {
    labels: props.department.name,
    datasets: [
      {
        label: props.dataDepartment && props.dataDepartment.title,
        backgroundColor: props.department.color,
        borderWidth: 1,
        // hoverBackgroundColor: '#1a237e',
        data: props.department.value
      }
    ]
  };
  const dataDivision = {
    labels: props.division.name,
    datasets: [
      {
        label: props.dataDiv && props.dataDiv.title,
        backgroundColor: props.division.color,
        borderWidth: 1,
        // hoverBackgroundColor: '#1a237e',
        data: props.division.value
      }
    ]
  };
  const dataLOB = {
    labels: props.lob.name,
    datasets: [
      {
        label: props.dataLob && props.dataLob.title,
        backgroundColor: props.lob.color,
        borderWidth: 1,
        // hoverBackgroundColor: '#1a237e',
        data: props.lob.value
      }
    ]
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

      <Preloader
        show={props.achievementState.all.isLoading}
        label={props.intl.formatMessage(layoutMessage.text.loading)}
      >
        <Grid container spacing={16} className={props.classes.marginFarBottom} direction="row" justify="flex-start">
          <React.Fragment>
            {props.dataSales && (
              <Grid item xs={12} md={6}>
                <Card square >
                  <CardHeader title={props.dataSales && props.dataSales.title} subheader={props.dataSales && props.dataSales.description} />
                  <VictoryChart
                    animate={{ duration: 2000, easing: 'bounce' }}
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
                      style={{
                        data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                        labels: { fontSize: 10 }
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
                            style={{
                              data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                              labels: { fontSize: 10 }
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
                            style={{
                              data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                              labels: { fontSize: 10 }
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
                            style={{
                              data: { fill: 'blue', strokeWidth: 0, ...colorModifier },
                              labels: { fontSize: 10 }
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
        </Grid>
        <Grid container spacing={16} className={props.classes.marginFarBottom} direction="row" justify="flex-start">
          {props.dataLob && (
            <Grid item xs={12} md={6}>
              <Card square>
                <CardHeader
                  title={props.dataSales && props.dataSales.title}
                  subheader={props.dataSales && props.dataSales.description}
                />
                <CardContent>
                  <HorizontalBar
                    data={dataSales}
                    height={825}
                    options={
                      {
                        maintainAspectRatio: false,
                        scales: {
                          xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                        }
                      }
                    }
                    
                  />
                </CardContent>
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
                      <HorizontalBar
                        data={dataDepartment}
                        height={250}
                        options={
                          {
                            maintainAspectRatio: false,
                            scales: {
                              xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                            }
                          }
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {props.dataDiv && (
                <Grid item xs={12} sm={12} md={12}>
                  <Card square>
                    <CardHeader
                      title={props.dataDiv && props.dataDiv.title}
                      subheader={props.dataDiv && props.dataDiv.description}
                    />
                    <CardContent>
                      <HorizontalBar
                        data={dataDivision}
                        options={
                          {
                            maintainAspectRatio: false,
                            scales: {
                              xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                            }
                          }
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}

              {props.dataLob && (
                <Grid item xs={12} sm={12} md={12}>
                  <Card square>
                    <CardHeader
                      title={props.dataLob && props.dataLob.title}
                      subheader={props.dataLob && props.dataLob.description}
                    />
                    <CardContent>
                      <HorizontalBar
                        data={dataLOB}
                        options={
                          {
                            maintainAspectRatio: false,
                            scales: {
                              xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                            }
                          }
                        }
                      />
                    </CardContent>
                  </Card>
                </Grid>
              )}
            </Grid>
          </Grid>
        </Grid>
      </Preloader>
    </div>
  );
};