import { IHrCompetencyLevelList, IHrCompetencyMappedNext } from '@hr/classes/response';
import { IUserLevel } from '@layout/interfaces';
import { Card, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import { IEmployeeFinalDetail } from '@profile/classes/response';
import styles from '@styles';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IEmployeeFinalDetail;
  next: IHrCompetencyMappedNext[];
  level: IUserLevel | undefined;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const myCompetencyTable: React.SFC<AllProps> = props => {
  const { data, next, level } = props;

  const findNext = (item: IHrCompetencyLevelList) => {
    const nxt: IHrCompetencyMappedNext  | undefined = next.find(fnd => fnd.categoryLevel.categoryUid === item.categoryUid);

    if (nxt) {
      return (
        <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
          <Typography className={props.classes.hrTableChild}>
            {`Level ${nxt.categoryLevel.level} - ${nxt.categoryLevel.description}`}
          </Typography>
          <Typography className={props.classes.hrTableChild}>
            <ul>
            {
              nxt.categoryLevel.indicators.map(indicator =>
                <li key={indicator.uid}>
                  {indicator.description}
                </li>
              )
            }    
            </ul>
          </Typography>
      </TableCell>
      );
    } 

    return undefined;
  };

  const render = (
    <Card square className={props.classes.hrTable}>
      <Table>
        <TableBody>
          <TableRow>
            <TableCell style={{textAlign: 'center'}} className={props.classes.stickyHeader} >
              <Typography variant="title">
                Current
                <br/>
                {
                  level && 
                  level.value
                }
              </Typography>
            </TableCell>
            <TableCell style={{textAlign: 'center'}} className={props.classes.stickyHeader}>
              <Typography variant="title">
                Next
                <br/>
                {
                  next[0].employeeLevel.value
                }
              </Typography>
            </TableCell>
          </TableRow>
          {
            data &&
            data.items.map((item) => 
            <React.Fragment key={item.uid}>
              <TableRow>
                <TableCell colSpan={2} className={props.classes.toolbar} style={{textAlign: 'center'}}>
                  <Typography variant="body1" color="inherit">
                    {item.level && item.level.category.name}
                  </Typography> 
                </TableCell>
              </TableRow>
              {
                item.level &&
                <TableRow>
                  <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
                      <Typography className={props.classes.hrTableChild}>
                        {`Level ${item.level.level} - ${item.level.description}`}
                      </Typography>
                      <Typography className={props.classes.hrTableChild}>
                        <ul>
                        {
                          item.level.indicators.map(indicator =>
                            <li key={indicator.uid}>
                              {indicator.description}
                            </li>
                          )
                        }    
                        </ul>
                      </Typography>
                  </TableCell>
                  {
                    item.level &&
                    findNext(item.level)
                  }
                </TableRow>
              } 
            </React.Fragment>
            )
          }
        </TableBody>
      </Table>
    </Card>
  );

  return render;
};

export const MyCompetencyTable = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(myCompetencyTable);