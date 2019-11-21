import { MeasurementType } from '@common/classes/types';
import { IKPITemplateItem } from '@kpi/classes/response';
import { KPICategoryGroupType } from '@kpi/classes/types';
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
  items: IKPITemplateItem[] | null | undefined;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const kpiTemplateItem: React.SFC<AllProps> = props => {
  const TemplateList = (templates: IKPITemplateItem[]) => {
    return(
      templates.map((item, index) => 
      <TableRow key={index}>
        <TableCell style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {item.category && item.category.name}
        </TableCell>
        <TableCell style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {item.categoryName}
        </TableCell>
        <TableCell style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }} className={classNames(props.classes.ultraDense)}>
          {item.measurement && item.measurement.description}
        </TableCell>
        <TableCell style={{ verticalAlign: 'top', whiteSpace: 'pre-line' }} className={classNames(props.classes.ultraDense)}> 
          {item.target}
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {
            item.category &&
            item.category.group === KPICategoryGroupType.KPI &&
            `${props.intl.formatNumber(item.weight)} %` ||
            '-'
          }
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {
            item.measurement && 

            (item.category &&
            item.category.group === KPICategoryGroupType.KPI) &&

            (item.measurement.measurementType === MeasurementType.Minimum)  &&
            props.intl.formatNumber(item.threshold || 0) ||
            '-'
          }
        </TableCell>
        <TableCell numeric style={{ verticalAlign: 'top' }} className={classNames(props.classes.ultraDense)}>
          {
            item.measurement && 

            (item.category &&
            item.category.group === KPICategoryGroupType.KPI) &&

            ((item.measurement.measurementType === MeasurementType.Minimum ||
            item.measurement.measurementType === MeasurementType.Proporsional)) &&
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
          title={props.intl.formatMessage(kpiMessage.template.section.itemTitle)}
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
                  <TableCell className={classNames(props.classes.cellWidthSm, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.categoryUid)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthSm, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.categoryName)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.measurementUid)}
                  </TableCell>
                  <TableCell className={classNames(props.classes.cellWidthMd, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.target)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.weight)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.threshold)}
                  </TableCell>
                  <TableCell numeric className={classNames(props.classes.cellWidthXXS, props.classes.ultraDense)}>
                    {props.intl.formatMessage(kpiMessage.template.field.amount)}
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

export const KPITemplateItem = compose<AllProps, OwnProps>(
  injectIntl,
  withStyles(styles),
)(kpiTemplateItem);