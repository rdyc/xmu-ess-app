import { IKPIMeasurementList } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, CircularProgress, Grid, ListItem, TextField, Typography } from '@material-ui/core';
import * as React from 'react';
import { MeasurementDetailProps } from './KPIMeasurementDetail';

export const KPIMeasurementDetailView: React.SFC<MeasurementDetailProps> = props => {
  const MeasurementList = (measurements: IKPIMeasurementList[]) => {
    return(
      measurements.map((item) => 
      <ListItem disableGutters>
          <Grid container spacing={0}>
            <Grid item xs={12}>
              <Typography noWrap variant= "body2" >
                {item.uid}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Grid container spacing={16} >
                <Grid item xs={10}>
                  <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    multiline
                    label={props.intl.formatMessage(kpiMessage.measurement.field.description)}
                    value={item.description}
                  />
                </Grid>
                <Grid item xs={2}>
                <TextField
                    {...GlobalStyle.TextField.ReadOnly}
                    label={props.intl.formatMessage(kpiMessage.measurement.field.weight)}
                    value={item.weight}
                  />
                </Grid>
              </Grid> 
            </Grid>
          </Grid>
        </ListItem>      
      )
    );
  };

  return (
  <React.Fragment>
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.measurement.section.infoTitle)}
        // subheader={}
      />
      <CardContent>
        {
          props.kpiMeasurementState.list.isLoading &&
          <div className={props.classes.preloader}>
            <div className={props.classes.preloaderContent}>
              <CircularProgress 
                style={{margin: 'auto'}} 
                color="secondary"
              />

              <Typography
                {...props.waitingTextProps}
                className={props.classes.marginFarTop}
              >
                {props.waitingText}
              </Typography>
            </div>    
          </div>
        }
        {
          !props.kpiMeasurementState.list.isLoading &&
          props.kpiMeasurementState.list.response &&
          props.kpiMeasurementState.list.response.data &&
          MeasurementList(props.kpiMeasurementState.list.response.data)
        }
        {
          !props.kpiMeasurementState.list.isLoading &&
          props.kpiMeasurementState.list.response &&
          props.kpiMeasurementState.list.response.data &&
          props.kpiMeasurementState.list.response.data.length === 0 &&
          <Typography
            align="center"
          >
            {'(No Data)'}
          </Typography>
        }
      </CardContent>
    </Card>
  </React.Fragment>
  );
};
