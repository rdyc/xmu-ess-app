import { IHrCompetencyMappedNext } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { IUserLevel } from '@layout/interfaces';
import { Card, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import { ICompetencyEmployeeItemFinal, IEmployeeFinalDetail } from '@profile/classes/response';
import { myMessage } from '@profile/locales/messages/myMessage';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data?: IEmployeeFinalDetail;
  next: IHrCompetencyMappedNext[];
  current: IHrCompetencyMappedNext[];
  level: IUserLevel | undefined;
}

interface IOwnState {
  active: string | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = IOwnProps
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>
  & InjectedIntlProps;

const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const myCompetencyTable: React.SFC<AllProps> = props => {
  const { data, next, level, current, intl } = props;

  const findNext = (item: IHrCompetencyMappedNext) => {
    const nxt: IHrCompetencyMappedNext | undefined = next.find(fnd => fnd.categoryLevel.categoryUid === item.categoryLevel.categoryUid);

    if (nxt) {
      return (
        <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw'}}>
          <Typography className={props.classes.hrTableChild}>
            {`Level ${nxt.categoryLevel.level} - ${nxt.categoryLevel.description}`}
          </Typography>
          <ul className={props.classes.hrTableChild} style={{paddingLeft: '66px'}}>
          {
            nxt.categoryLevel.indicators.map(indicator =>
              <li key={indicator.uid}>
                <Typography>
                  {indicator.description}
                </Typography>
              </li>
            )
          }    
          </ul>
      </TableCell>
      );
    } 

    return (
      <TableCell className={props.classes.hrTableVerAlign} style={{width: '40vw', textAlign: 'center'}}>
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
                {intl.formatMessage(myMessage.competency.field.category)}
              </Typography>
            </TableCell>

            {/* Current */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)} >
              <Typography variant="subheading">
                {intl.formatMessage(myMessage.competency.field.current)}
                <br/>
                {
                  level && 
                  level.value
                }
              </Typography>
            </TableCell>
            
            {/* Result */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)}>
              <Typography variant="subheading">
                {intl.formatMessage(myMessage.competency.field.result)}
              </Typography>
              {
                data &&
                data.items.length > 0 &&
                <ul style={{paddingLeft: '16px', listStyle: 'none '}} >
                  <li>
                  <Typography variant="body1" color="error" >
                    {intl.formatMessage(myMessage.competency.field.colorCodeRed)}
                  </Typography>
                  </li>
                  <li>
                  <Typography variant="body1" color="primary" >
                    {intl.formatMessage(myMessage.competency.field.colorCodeBlue)}
                  </Typography>
                  </li>
                </ul>
              }
            </TableCell>

            {/* Next */}
            <TableCell className={classNames(props.classes.stickyHeader, props.classes.hrTableTitle)}>
              <Typography variant="subheading">
                {intl.formatMessage(myMessage.competency.field.next)}
                <br/>
                {
                  next.length >= 1 && next[0].employeeLevel.value || 'N/A'
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
                  <ul className={props.classes.hrTableChild} style={{paddingLeft: '66px'}} >
                    {
                      item.categoryLevel.indicators.map(indicator =>
                        <li key={indicator.uid}>
                          <Typography>
                            {indicator.description}
                          </Typography>
                        </li>
                      )
                    }    
                  </ul>
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

export const MyCompetencyTable = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(myCompetencyTable);