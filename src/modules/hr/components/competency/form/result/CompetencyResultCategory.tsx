import { FormMode } from '@generic/types';
import { ICompetencyEmployeeItem, IHrCompetencyEmployeeDetailList, IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardHeader, Radio, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import { CommentOutlined, Done } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { ICompetencyResultFormValue } from './CompetencyResultForm';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyResultFormValue>;
  intl: InjectedIntl;
  mapped: IHrCompetencyMappedList;
  responders: IHrCompetencyEmployeeDetailList[];
}

interface IOwnState {

}

interface IOwnHandler {

}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;
  
const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
});

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  })
};

const competencyResultCategory: React.ComponentType<AllProps> = props => {

  const findNote = (item?: ICompetencyEmployeeItem) => {
    return item && item.note;
  };
  
  const render = (
    <Card square className={props.classes.hrTable}>
      <CardHeader
        // title={props.intl.formatMessage(hrMessage.competency.field.assessment, {state: 'Result'})}
      />
      <Table>
        <TableBody>
          {/* Responder row */}
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
                <TableCell colSpan={props.responders.length + 1} className={props.classes.toolbar} >
                  <Typography variant="body1" color="inherit">
                    {item.category.name}
                  </Typography>
                </TableCell>
              </TableRow>
              <FieldArray 
                name="levelRespond"
                render={(fields: FieldArrayRenderProps) =>
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
                      {
                        props.responders.map(responder => 
                          !responder.isHR &&
                          <TableCell key={responder.uid} style={{padding: 0, textAlign: 'center'}}>
                            {
                              responder.items.length > 0 &&
                              responder.items.find(findData => findData.levelUid === level.uid) &&
                              <Typography>
                                <Done />
                              </Typography>
                            }
                          </TableCell>
                        )
                      }
                      <TableCell style={{padding: '0 15px'}}>
                        <Field 
                          name={`levelRespond.${index}`}
                          render={({field}: FieldProps<ICompetencyResultFormValue>) => (
                            <Radio 
                              checked={Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid))}
                              onChange={() => { 
                                props.formikBag.setFieldValue(`levelRespond.${index}.levelUid`, level.uid);
                              }}
                              disabled={props.formikBag.isSubmitting}
                              value={level.uid}
                            />
                          )}
                        />
                      </TableCell>
                    </TableRow>

                    {/* Note Responder */}
                    {
                      props.responders.find(responder => 
                        !responder.isHR && 
                        responder.items.length > 0 && 
                        responder.items.findIndex(findData => findData.levelUid === level.uid) !== -1) &&
                        <TableRow>
                          <TableCell colSpan={props.responders.length + 1}>
                            <div style={{display: 'flex'}}>
                              <CommentOutlined style={{marginTop: '16px'}} />
                              <ul style={{paddingLeft: '24px'}}>
                                {
                                  // NOTE RESPONDER HERE
                                  props.responders.map(responder => 
                                    !responder.isHR &&
                                    responder.items.length > 0 &&
                                    responder.items.find(findData => findData.levelUid === level.uid) &&
                                      <li>
                                        <Typography key={responder.uid} color="primary">
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
                      Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid)) &&
                      <Field
                        name={`levelRespond.${index}.noteHistory`}
                        render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => {
                          return (
                            field.value &&
                            <TableRow>
                              <TableCell colSpan={props.responders.length + 1}>
                                <TextField
                                  {...GlobalStyle.TextField.ReadOnly}
                                  {...field}
                                  multiline
                                  inputProps={{
                                    className: props.classes.globalSize
                                  }}
                                />
                              </TableCell>
                            </TableRow>
                          );
                        }}
                      />
                    }
                    {
                      Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid)) &&
                      <TableRow>
                        <TableCell colSpan={props.responders.length + 1}>
                          <Field
                            name={`levelRespond.${index}.note`}
                            render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => {
                              const error = getIn(form.errors, `levelRespond.${index}.note`);
                              const touch = getIn(form.touched, `levelRespond.${index}.note`);

                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  required
                                  disabled={form.isSubmitting}
                                  margin="normal"
                                  autoComplete="off"
                                  label={props.intl.formatMessage(hrMessage.competency.field.note)}
                                  placeholder={props.intl.formatMessage(hrMessage.competency.field.notePlaceholder)}
                                  helperText={touch && error}
                                  error={touch && Boolean(error)}
                                />
                              );
                            }}
                          />
                        </TableCell>
                      </TableRow>
                    }
                  </React.Fragment>
                  ) 
                }
              />
            
            </React.Fragment>
            )
          }
        </TableBody>
      </Table>
    </Card>
  );

  return render;
};

export const CompetencyResultCategory = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(competencyResultCategory);