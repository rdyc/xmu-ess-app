import { IHrCompetencyEmployeeDetail } from '@hr/classes/response';
import { Card, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
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

const hrCompetencyEmployeeCategoryItem: React.SFC<AllProps> = props => (
  <Card square>
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
            {`Level ${item.level && item.level.level} - ${item.level && item.level.description}`}
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
      
      </React.Fragment>
      )
    }
    </TableBody>
  </Table>
  </Card>
);

export const HrCompetencyEmployeeCategoryItem = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(hrCompetencyEmployeeCategoryItem);