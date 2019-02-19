import { homeMessage } from '@home/locales/messages';
import { Preloader } from '@layout/components/preloader';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
import * as React from 'react';
import { HorizontalBar } from 'react-chartjs-2';

import { AchievementChartProps } from './AchievementChart';

export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
  const dataSales = {
    labels: props.sales.name,
    datasets: [
      {
        label: props.dataSales && props.dataSales.title,
        backgroundColor: props.sales.color,
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
                        legend: {
                          display: false
                        },
                        maintainAspectRatio: false,
                        scales: {
                          xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                        },
                        tooltips: {
                          callbacks: {
                            label: (tooltipItem: any, data: any) => {
                              const dataset = data.datasets[tooltipItem.datasetIndex];
                              const currentValue = dataset.data[tooltipItem.index];
                              
                              return `${currentValue} ${props.dataSales && props.dataSales.unit}`;
                            }
                          }
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
                            legend: {
                              display: false
                            },
                            maintainAspectRatio: false,
                            scales: {
                              xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                            },
                            tooltips: {
                              callbacks: {
                                label: (tooltipItem: any, data: any) => {
                                  const dataset = data.datasets[tooltipItem.datasetIndex];
                                  const currentValue = dataset.data[tooltipItem.index];
                                  
                                  return `${currentValue} ${props.dataDepartment && props.dataDepartment.unit}`;
                                }
                              }
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
                            legend: {
                              display: false
                            },
                            maintainAspectRatio: false,
                            scales: {
                              xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                            },
                            tooltips: {
                              callbacks: {
                                label: (tooltipItem: any, data: any) => {
                                  const dataset = data.datasets[tooltipItem.datasetIndex];
                                  const currentValue = dataset.data[tooltipItem.index];
                                  
                                  return `${currentValue} ${props.dataDiv && props.dataDiv.unit}`;
                                }
                              }
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
                            legend: {
                              display: false
                            },
                            maintainAspectRatio: false,
                            scales: {
                              xAxes: [{id: 'y-axis-1', type: 'linear', position: 'left', ticks: {min: 0}}]
                            },
                            tooltips: {
                              callbacks: {
                                label: (tooltipItem: any, data: any) => {
                                  const dataset = data.datasets[tooltipItem.datasetIndex];
                                  const currentValue = dataset.data[tooltipItem.index];
                                  
                                  return `${currentValue} ${props.dataLob && props.dataLob.unit}`;
                                }
                              }
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