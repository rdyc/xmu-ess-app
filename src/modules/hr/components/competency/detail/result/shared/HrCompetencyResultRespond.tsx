import { WorkflowStatusType } from '@common/classes/types';
import { ICompetencyEmployeeItem, IHrCompetencyEmployeeDetail, IHrCompetencyEmployeeDetailList, IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardHeader, Collapse, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import { CommentOutlined, Done, ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import * as classNames from 'classnames';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';

interface IOwnProps {
  data: IHrCompetencyEmployeeDetail;
  mapped: IHrCompetencyMappedList;
  responders: IHrCompetencyEmployeeDetailList[];
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

const hrCompetencyResultRespond: React.SFC<AllProps> = props => {
  const { active, isExpanded, handleToggle } = props;

  const findNote = (item?: ICompetencyEmployeeItem) => {
    return item && item.note;
  };

  const render = (
    <Card square className={props.classes.hrTable}>
      <CardHeader 
        title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Assessment Form'})}
      />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell>
              
            </TableCell>
            {
              props.responders.map(responder => 
                !responder.isHR &&
                <TableCell key={responder.uid} className={props.classes.hrTableResponder}>
                  <div className={props.classes.writingVertical} >
                    {responder.employee && responder.employee.fullName}
                  </div>
                </TableCell>  
              )
            }
            <TableCell className={props.classes.hrTableResponder} style={{padding: '0 15px'}}>
              {props.intl.formatMessage(hrMessage.competency.field.type, {state: 'HR'})}
            </TableCell>
          </TableRow>
          {
            props.mapped &&
            props.mapped.categories.map((item, index) => 
            <React.Fragment key={item.uid}>
              <TableRow>
                {/* Category */}
                <TableCell colSpan={props.responders.length + 1} className={classNames(props.classes.toolbar, props.classes.tableCategory)} onClick={() => handleToggle(item.category.uid)} >
                  <Typography variant="body1" color="inherit" style={{display: 'inline-block'}} >
                    {item.category.name}
                  </Typography>
                  {active === item.category.uid && isExpanded ? <ExpandLess className={props.classes.expandCategory} /> : <ExpandMore  className={props.classes.expandCategory}/>}
                  <Collapse
                    in={active === item.category.uid && isExpanded}
                    // className={props.classes.marginFar}
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
                            <Typography >
                              {indicator.description}
                            </Typography>
                          </li>
                        )
                      }    
                      </ul>
                    </TableCell>

                    {/* Check from responder */}
                    {
                      props.responders.map(responder => 
                        !responder.isHR &&
                        <TableCell key={responder.uid} style={{padding: 0, textAlign: 'center'}}>
                          {
                            responder.items.length > 0 &&
                            (responder.statusType === WorkflowStatusType.Submitted || responder.statusType === WorkflowStatusType.Closed) &&
                            responder.items.find(findData => findData.levelUid === level.uid) &&
                            <Typography>
                              <Done />
                            </Typography>
                          }
                        </TableCell>
                      )
                    }
                    <TableCell style={{padding: '0 15px', textAlign: 'center'}}>
                      {
                        props.data.items.find(findData => findData.levelUid === level.uid) &&
                        <Typography>
                          <Done />
                        </Typography>
                      }
                    </TableCell>
                  </TableRow>

                  {/* Note Responder */}                  
                  {
                    props.responders.find(responder => 
                      !responder.isHR && 
                      (responder.statusType === WorkflowStatusType.Submitted || responder.statusType === WorkflowStatusType.Closed) &&
                      responder.items.length > 0 && 
                      responder.items.findIndex(findData => findData.levelUid === level.uid) !== -1) &&
                      <TableRow>
                        <TableCell colSpan={props.responders.length + 1}>
                          <div style={{display: 'flex'}}>
                            <CommentOutlined style={{marginTop: '16px'}} />
                            <ul style={{paddingLeft: '24px'}}>
                              {
                                props.responders.map(responder => 
                                  !responder.isHR &&
                                  (responder.statusType === WorkflowStatusType.Submitted || responder.statusType === WorkflowStatusType.Closed) &&
                                  responder.items.length > 0 &&
                                  responder.items.find(findData => findData.levelUid === level.uid) &&
                                    <li key={responder.uid}>
                                      <Typography color="primary">
                                        {
                                          findNote(responder.items.find(findData => findData.levelUid === level.uid))
                                        }
                                      </Typography>
                                    </li>
                                )
                              }
                            </ul>
                          </div>
                        </TableCell>
                      </TableRow>
                  }

                  {/* Note HR */}
                  {
                    props.data.items.find(findData => findData.levelUid === level.uid) &&
                    <TableRow>
                      <TableCell colSpan={props.responders.length + 1}>
                        <TextField
                          {...GlobalStyle.TextField.ReadOnly}
                          value={findNote(props.data.items.find(findData => findData.levelUid === level.uid))}
                          multiline
                          inputProps={{
                            className: props.classes.globalSize
                          }}
                        />
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

export const HrCompetencyResultRespond = compose<AllProps, IOwnProps>(
  injectIntl,
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
  )(hrCompetencyResultRespond);