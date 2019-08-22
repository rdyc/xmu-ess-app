import { IKPIMeasurementList } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { Card, CardContent, CardHeader, CircularProgress, Table, TableBody, TableCell, TableHead, TableRow, Typography } from '@material-ui/core';
import * as classNames from 'classnames';
import * as React from 'react';
import { MeasurementDetailProps } from './KPIMeasurementDetail';

export const KPIMeasurementDetailView: React.SFC<MeasurementDetailProps> = props => {
  const MeasurementList = (measurements: IKPIMeasurementList[]) => {
    return(
      measurements.map((item, index) => 
      <TableRow key={index}>
        <TableCell>
          {item.description}
        </TableCell>
        <TableCell>
          {item.measurement && item.measurement.description}
        </TableCell>
        <TableCell numeric>
          {`${props.intl.formatNumber(item.weight)} %`}
        </TableCell>
      </TableRow>     
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
          <div
            className={classNames(props.classes.reportContentScrollable)}
          >
            <Table
              className={classNames(props.classes.reportTable)}
              padding="dense"
            >
              <TableHead>
                <TableRow>
                  <TableCell>
                    {props.intl.formatMessage(kpiMessage.measurement.field.description)}
                  </TableCell>
                  <TableCell>
                    {props.intl.formatMessage(kpiMessage.measurement.field.measurementType)}
                  </TableCell>
                  <TableCell numeric>
                    {props.intl.formatMessage(kpiMessage.measurement.field.weight)}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                MeasurementList(props.kpiMeasurementState.list.response.data)
              }
              </TableBody>
            </Table>
          </div>
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
