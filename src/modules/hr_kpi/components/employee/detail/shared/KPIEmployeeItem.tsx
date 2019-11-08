import { MeasurementType } from '@common/classes/types';
import { IKPIEmployeeItem } from '@kpi/classes/response';
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
  items: IKPIEmployeeItem[] | null | undefined;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const kpiEmployeeItem: React.SFC<AllProps> = props => {
  const TemplateList = (templates: IKPIEmployeeItem[]) => {
    return(
      templates.map((item, index) => 
      <TableRow key={index}>
        <TableCell style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {item.kpiAssignItem && item.kpiAssignItem.categoryName}
        </TableCell>
        <TableCell style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {item.kpiAssignItem && item.kpiAssignItem.measurementDescription}
        </TableCell>
        <TableCell style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {item.kpiAssignItem && item.kpiAssignItem.target}
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {
            item.kpiAssignItem &&
            item.kpiAssignItem.category &&
            item.kpiAssignItem.category.group === 'KPI' &&
            `${props.intl.formatNumber(item.kpiAssignItem && item.kpiAssignItem.weight || 0)} %` ||
            '-'}
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {
            item.kpiAssignItem &&

            (item.kpiAssignItem.category &&
            item.kpiAssignItem.category.group === 'KPI') &&

            (item.kpiAssignItem.measurement && 
            item.kpiAssignItem.measurement.measurementType === MeasurementType.Scoring)  &&
            props.intl.formatNumber(item.kpiAssignItem.threshold || 0) ||
            '-'
          }
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {
            item.kpiAssignItem &&

            (item.kpiAssignItem.category &&
            item.kpiAssignItem.category.group === 'KPI') &&

            (item.kpiAssignItem.measurement && 
            (item.kpiAssignItem.measurement.measurementType === MeasurementType.Scoring ||
            item.kpiAssignItem.measurement.measurementType === MeasurementType.Attendance)) &&
            props.intl.formatNumber(item.kpiAssignItem.amount) ||
            '-'
          }
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {props.intl.formatNumber(item.achieved)}
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {`${props.intl.formatNumber(item.progress)} %`}
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {`${props.intl.formatNumber(item.score)} %`}
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
            >
              <TableHead>
                <TableRow>
                  <TableCell className={classNames(props.classes.cellWidthSm, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.target)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.weight)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.threshold)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.amount)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.achieved)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.progress)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.employee.field.score)}
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

export const KPIEmployeeItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
)(kpiEmployeeItem);