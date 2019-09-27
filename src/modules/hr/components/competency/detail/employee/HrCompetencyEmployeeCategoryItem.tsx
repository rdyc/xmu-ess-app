import { IHrCompetencyEmployeeDetail, IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IHrCompetencyEmployeeDetail;
  mapped: IHrCompetencyMappedList;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const hrCompetencyEmployeeCategoryItem: React.SFC<AllProps> = props => {

  const findData = (categoryUid: string) => {
    const find = props.data.items.find(item => item.categoryUid === categoryUid);

    if (find) {
      return (
        <React.Fragment>
          <TableCell colSpan={1} className={props.classes.hrTableVerAlign}>
            <Typography className={props.classes.hrTableChild}>
              {`Level ${find.level && find.level.level} - ${find.level && find.level.description}`}
            </Typography>
          </TableCell>
          <TableCell colSpan={1} className={props.classes.hrTableVerAlign}>
            <Typography>
              <ul className={props.classes.hrTableChild}>
              {
                find.level && find.level.indicators.map(indicator =>
                  <li key={indicator.uid}>
                    {indicator.description}
                  </li>
                )
              }    
              </ul>
            </Typography>
          </TableCell>
        </React.Fragment>
      );
    } 

    return (
      <TableCell colSpan={2}>
        <Typography variant="body1" color="inherit">
          {props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'level'})}
        </Typography>
      </TableCell>
    );
  };

  const render = (
    <Card square className={props.classes.hrTable}>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Respond'})}
      />
      <Table>
      <TableBody>
      {
        props.mapped.categories.map((item, index) => 
        <React.Fragment key={item.uid}>
          <TableRow>
            <TableCell colSpan={2} className={props.classes.toolbar}>
              <Typography variant="body1" color="inherit">
                {item.category && item.category.name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            {
              findData(item.category.uid)
            }
          </TableRow>
        </React.Fragment>
        )
      }
      </TableBody>
    </Table>
    </Card>
  );

  return render;
};

export const HrCompetencyEmployeeCategoryItem = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(hrCompetencyEmployeeCategoryItem);