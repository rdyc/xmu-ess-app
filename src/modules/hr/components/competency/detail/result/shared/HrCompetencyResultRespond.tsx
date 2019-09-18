import { IHrCompetencyEmployeeDetail } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyEmployeeDetail;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const hrCompetencyResultRespond: React.SFC<AllProps> = props => (
  <Card square className={props.classes.reportContentScrollable}>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Respond'})}
    />
    <Table>
    <TableBody>
    {
      props.data &&
      props.data.items.map((item, index) => 
      <React.Fragment key={item.uid}>
        <TableRow>
          <TableCell colSpan={2} className={props.classes.toolbar}>
            <Typography variant="body1" color="inherit">
              {item.category && item.category.name}
            </Typography>
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell colSpan={1}>
            <Typography>
              {`Level ${item.level && item.level.level} - ${item.level && item.level.description}`}
            </Typography>
          </TableCell>
          <TableCell colSpan={1}>
            <Typography>
              <ul>
              {
                item.level && item.level.indicators.map(indicator =>
                  <li>
                    {indicator.description}
                  </li>
                )
              }    
              </ul>
            </Typography>
          </TableCell>
        </TableRow>
        {
          item.note &&
          <TableRow>
            <TableCell colSpan={2}>
              <Typography>
                {item.note}
              </Typography>
            </TableCell>
          </TableRow>
        }    
      </React.Fragment>
      )
    }
    </TableBody>
  </Table>
  </Card>
);

export const HrCompetencyResultRespond = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(hrCompetencyResultRespond);