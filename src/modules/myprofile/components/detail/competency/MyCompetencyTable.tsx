import { IHrCompetencyMappedNext } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IUserLevel } from '@layout/interfaces';
import { Card, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import { ICompetencyEmployeeItemFinal, IEmployeeFinalDetail } from '@profile/classes/response';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data?: IEmployeeFinalDetail;
  next: IHrCompetencyMappedNext[];
  current: IHrCompetencyMappedNext[];
  level: IUserLevel | undefined;
}

type AllProps
  = OwnProps
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const myCompetencyTable: React.SFC<AllProps> = props => {
  const { data, next, level, current } = props;

  const findNext = (item: IHrCompetencyMappedNext) => {
    const nxt: IHrCompetencyMappedNext | undefined = next.find(fnd => fnd.categoryLevel.categoryUid === item.categoryLevel.categoryUid);

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

    return (
      <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
        N/A
      </TableCell>
    );
  };

  const typeIndicator = (indicator: string) => {
    const splitIndicator = indicator.split('|');

    return (
      <ul>
        {
          splitIndicator.map((item, index) => 
            item !== '' &&
            <li key={index}>
              {item}
            </li>  
          )  
        }
      </ul>
    );
  };
  
  const findResult = (item: IHrCompetencyMappedNext, currentLevel: number) => {
    if (data) {
      const result: ICompetencyEmployeeItemFinal | undefined = data.items.find(fnd => fnd.categoryUid === item.categoryLevel.categoryUid);
  
      if (result) {
        return (
          <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
            <Typography className={props.classes.hrTableChild} color={result.level >= currentLevel ? 'primary' : 'error' }>
              {`Level ${result.level} - ${result.levelDescription}`}
            </Typography>
            <Typography className={props.classes.hrTableChild}>
              {/* <ul>
              {
                result.level &&
                result.level.indicators.map(indicator =>
                  <li key={indicator.uid}>
                    {indicator.description}
                  </li>
                )
              }    
              </ul> */}
              {
                typeIndicator(result.indicators)
              }
            </Typography>
        </TableCell>
        );
      } 
    }

    return undefined;
  };

  const render = (
    <Card square className={props.classes.hrTable}>
      <Table>
        <TableBody>
          <TableRow>
            {/* Category */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)} >
              <Typography variant="subheading">
                Category
              </Typography>
            </TableCell>

            {/* Current */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)} >
              <Typography variant="subheading">
                Current
                <br/>
                {
                  level && 
                  level.value
                }
              </Typography>
            </TableCell>
            
            {/* Result */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)} >
              <Typography variant="subheading">
                Result
              </Typography>
            </TableCell>

            {/* Next */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)}>
              <Typography variant="subheading">
                Next
                <br/>
                {
                  next[0].employeeLevel.value || 'N/A'
                }
              </Typography>
            </TableCell>
          </TableRow>
          {
            current &&
            current.map((item) => 
            <React.Fragment key={item.uid}>
              <TableRow>

                {/* Category */}
                <TableCell className={classNames(props.classes.hrTableTitle)} style={{verticalAlign: 'top'}}>
                  <Typography variant="body1" color="inherit">
                    {item.categoryLevel.category.name}
                  </Typography> 
                </TableCell>

                {/* Current */}
                <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
                  <Typography className={props.classes.hrTableChild}>
                    {`Level ${item.categoryLevel.level} - ${item.categoryLevel.description}`}
                  </Typography>
                  <Typography className={props.classes.hrTableChild}>
                    <ul>
                    {
                      item.categoryLevel.indicators.map(indicator =>
                        <li key={indicator.uid}>
                          {indicator.description}
                        </li>
                      )
                    }    
                    </ul>
                  </Typography>
                </TableCell>

                {/* Result */}
                {
                  data &&
                  data.items.length > 0 ?
                  findResult(item, item.categoryLevel.level)
                  :
                  <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
                    <Typography style={{textAlign: 'center'}}>
                      {props.intl.formatMessage(hrMessage.competency.field.zeroItem, {item: 'result'})}
                    </Typography>
                  </TableCell>
                }

                {/* Next */}
                {
                  findNext(item)
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

export const MyCompetencyTable = compose<AllProps, OwnProps>(
  withStyles(styles),
  injectIntl
)(myCompetencyTable);