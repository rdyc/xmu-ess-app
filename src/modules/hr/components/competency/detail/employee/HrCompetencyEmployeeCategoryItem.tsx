import { ICompetencyEmployeeItem, IHrCompetencyEmployeeDetail, IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Collapse, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Done, ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data: IHrCompetencyEmployeeDetail;
  mapped: IHrCompetencyMappedList;
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

const hrCompetencyEmployeeCategoryItem: React.SFC<AllProps> = props => {
  const { active, isExpanded, handleToggle } = props;

  const findNote = (item?: ICompetencyEmployeeItem) => {
    if (item) {
      if (item.note) {
        const notes: string[] = item.note && item.note.split(' - ') || [];
        // notes[0] = props.intl.formatDate(notes[0], GlobalFormat.DateTime);
        return notes.join(', ');
      }

      // return item && item.note;
    }
    
    return null;
  };
  
  const render = (
    <Card square className={props.classes.hrTable}>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Assessment Form'})}
      // title={props.intl.formatMessage(hrMessage.competency.field.responder)}
      />
      <Table>
        <TableBody>
        {
          props.mapped.categories.map((item, index) => 
          <React.Fragment key={item.uid}>
            <TableRow>
              
              {/* Category */}
              <TableCell colSpan={2} className={classNames(props.classes.toolbar, props.classes.tableCategory)} onClick={() => handleToggle(item.category.uid)} >
                <Typography variant="body1" color="inherit" style={{display: 'inline-block'}} >
                  {item.category.name}
                </Typography>
                {active === item.category.uid && isExpanded ? <ExpandLess className={props.classes.expandCategory} /> : <ExpandMore  className={props.classes.expandCategory}/>}
                <Collapse
                  in={active === item.category.uid && isExpanded}
                  timeout="auto"
                  unmountOnExit
                >
                  <Typography variant="body1" color="inherit">
                    {item.category.description}
                  </Typography>
                </Collapse>
              </TableCell>
            </TableRow>
            {
              item.category.levels.map((level) =>           
              <React.Fragment key={level.uid}>         
                <TableRow>
                  <TableCell className={props.classes.hrTableVerAlign}>
                    <Typography className={props.classes.hrTableChild}>
                      {`Level ${level.level} - ${level.description}`}
                    </Typography>
                    <ul className={props.classes.hrTableChild} style={{paddingLeft: '66px'}}>
                    {
                      level.indicators.map(indicator =>
                        <li key={indicator.uid}>
                          <Typography>
                            {indicator.description}
                          </Typography>
                        </li>
                      )
                    }    
                    </ul>
                  </TableCell>
                  <TableCell style={{padding: '0 15px', textAlign: 'center'}}>
                    {
                      props.data.items.find(find => find.levelUid === level.uid) &&
                      <Typography>
                        <Done />
                      </Typography>
                    }
                  </TableCell>
                </TableRow>
                
                {
                  // NOTE HERE
                  props.data.items.find(find => find.levelUid === level.uid) &&
                  <TableRow>
                    <TableCell colSpan={2}>
                      <Typography>
                        {
                          findNote(props.data.items.find(find => find.levelUid === level.uid))
                        }
                      </Typography>
                    </TableCell>
                  </TableRow>
                }
              </React.Fragment>
              ) 
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

export const HrCompetencyEmployeeCategoryItem = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrCompetencyEmployeeCategoryItem);