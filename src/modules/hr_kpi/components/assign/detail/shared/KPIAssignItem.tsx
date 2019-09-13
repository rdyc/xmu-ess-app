import { MeasurementType } from '@common/classes/types';
import { IKPIAssignItem } from '@kpi/classes/response';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import {
  Card,
  CardContent,
  CardHeader,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  withStyles,
  WithStyles,
} from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  items: IKPIAssignItem[] | null | undefined;
  useSelect?: boolean;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const kpiAssignItem: React.SFC<AllProps> = props => {
  const TemplateList = (items: IKPIAssignItem[]) => {
    return(
      items.map((item, index) => 
      <TableRow key={index}>
        <TableCell>
          {item.category && item.category.name}
        </TableCell>
        <TableCell>
          {item.categoryName}
        </TableCell>
        <TableCell>
          {item.measurement && item.measurement.description}
        </TableCell>
        <TableCell>
          {item.measurementDescription}
        </TableCell>
        <TableCell>
          {item.target}
        </TableCell>
        <TableCell numeric>
          {`${props.intl.formatNumber(item.weight)} %`}
        </TableCell>
        <TableCell numeric>
          {
            item.measurement && 
            item.measurement.measurementType === MeasurementType.Scoring  &&
            props.intl.formatNumber(item.threshold || 0) ||
            '-'
          }
        </TableCell>
        <TableCell numeric>
          {
            item.measurement && 
            (item.measurement.measurementType === MeasurementType.Scoring ||
            item.measurement.measurementType === MeasurementType.Attendance) &&
            props.intl.formatNumber(item.amount) ||
            '-'
          }
        </TableCell>
      </TableRow>     
      )
    );
  };

  const render = (
    <React.Fragment>
      <Card square>
        <CardHeader 
          title={props.intl.formatMessage(kpiMessage.employee.section.itemTitle)}
          // subheader={}
        />
        <CardContent>
        {
          props.items &&
          <div
            className={classNames(props.classes.reportContentScrollable)}
          >
            <Table
              className={classNames(props.classes.reportTable)}
              padding="dense"
            >
              <TableHead>
                <TableRow>
                  {
                    props.useSelect &&
                    <TableCell>
                      {props.intl.formatMessage(kpiMessage.employee.field.categoryUid)}
                    </TableCell>
                  }
                  <TableCell>
                    {props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
                  </TableCell>
                  {
                    props.useSelect &&
                    <TableCell>
                      {props.intl.formatMessage(kpiMessage.employee.field.measurementUid)}
                    </TableCell>
                  }
                  <TableCell>
                    {props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
                  </TableCell>
                  <TableCell>
                    {props.intl.formatMessage(kpiMessage.employee.field.target)}
                  </TableCell>
                  <TableCell numeric>
                    {props.intl.formatMessage(kpiMessage.employee.field.weight)}
                  </TableCell>
                  <TableCell numeric>
                    {props.intl.formatMessage(kpiMessage.employee.field.threshold)}
                  </TableCell>
                  <TableCell numeric>
                    {props.intl.formatMessage(kpiMessage.employee.field.amount)}
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
              {
                TemplateList(props.items)
              }
              </TableBody>
            </Table>
          </div>
        }
        {
          props.items &&
          props.items.length === 0 &&
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

  return render;
};

export const KPIAssignItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
)(kpiAssignItem);