import { IValueResponse } from '@home/classes/response/achievement';
import { homeMessage } from '@home/locales/messages';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Grid, Toolbar, Typography } from '@material-ui/core';
import { isWidthDown } from '@material-ui/core/withWidth';
import * as React from 'react';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme, VictoryTooltip } from 'victory';

import { AchievementChartProps } from './AchievementChart';

export const AchievementChartView: React.SFC<AchievementChartProps> = props => {
  const { classes, width } = props;
  const isMobile = isWidthDown('sm', width);
  const isMobileXS = isWidthDown('xs', width);

  const tembelek: any = {
    fill: (data: IValueResponse) => {
      let color = 'blue';

      if (data.value > 0 && data.value <= 25) {
        color = 'red';
      }

      if (data.value > 25 && data.value <= 50) {
        color = 'orange';
      }

      if (data.value > 50 && data.value <= 75) {
        color = 'yellow';
      }

      if (data.value > 75 && data.value <= 100) {
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

      <Grid container spacing={16} className={props.classes.marginFarBottom}>
        {
          props.achievementState.all.response &&
          props.achievementState.all.response.data &&
          props.achievementState.all.response.data.map((item) => (
            <React.Fragment>
              {(item.title === 'ETG Sales Team') ?
                <Grid item xs={12} md={12}>
                  <Card square className={classes.chartCard}>
                    <CardHeader title={item.title} subheader={item.description} className={isMobileXS ? undefined : classes.chartHeader} />
                    <CardContent className={isMobile ? classes.chartContentXS : classes.chartContent}>
                      <VictoryChart
                        animate={{ duration: 2000, easing: 'bounce' }}
                        domainPadding={{ x: 20, y: 20 }}
                        height={isMobile ? undefined : 175}
                        theme={VictoryTheme.material}
                      >
                        <VictoryAxis
                          tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" style={{ fontSize: isMobile ? 7 : 4 }} />}
                        />
                        <VictoryAxis
                          dependentAxis
                          tickLabelComponent={<VictoryLabel style={{ fontSize: isMobile ? 7 : 4 }} />}
                          tickFormat={(x) => (`${x} ${item.unit}`)}
                        />
                        <VictoryBar
                          labelComponent={<VictoryTooltip />}
                          style={{
                            data: { ...tembelek },
                            labels: { fontSize: isMobile ? 5 : 4 }
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
                :
                <Grid item xs={12} sm={12} md={4}>
                  <Card square>
                    <CardHeader
                      title={item.title}
                      subheader={item.description}
                    />
                    <CardContent>
                      <VictoryChart
                        theme={VictoryTheme.material}
                        animate={{ duration: 2000, easing: 'bounce' }}
                        domainPadding={{ x: 20, y: 20 }}
                        padding={{ bottom: 100, left: 50, top: 10, right: 50 }}
                      >
                        <VictoryAxis
                          tickLabelComponent={<VictoryLabel angle={-45} textAnchor="end" />}
                        />
                        <VictoryAxis
                          dependentAxis
                          tickFormat={(x) => (`${x} ${item.unit}`)}
                        />
                        <VictoryBar
                          labelComponent={<VictoryTooltip />}
                          style={{
                            data: { ...tembelek },
                            labels: { fontSize: 10 }
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
              }
            </React.Fragment>
          ))
        }
      </Grid>
    </div>
  );
};
