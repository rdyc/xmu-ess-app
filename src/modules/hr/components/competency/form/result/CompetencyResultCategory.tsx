import { FormMode } from '@generic/types';
import { IHrCompetencyEmployeeDetailList, IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Radio, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import { Done } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps } from 'formik';
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

const competencyResultCategory: React.ComponentType<AllProps> = props => (
  <Card square className={props.classes.hrTable}>
    <CardHeader
      title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Assessment Result'})}
    />
    <Table>
      <TableBody>
        <TableRow>
          <TableCell>
            
          </TableCell>
          {
            props.responders.map(responder => 
              !responder.isHR &&
              <TableCell className={props.classes.hrTableResponder}>
                {responder.employee && responder.employee.fullName}
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
                <React.Fragment>         
                  <TableRow>
                    <TableCell className={props.classes.hrTableVerAlign}>
                        <Typography className={props.classes.hrTableChild}>
                          {`Level ${level.level} - ${level.description}`}
                        </Typography>
                        <Typography className={props.classes.hrTableChild}>
                          <ul>
                          {
                            level.indicators.map(indicator =>
                              <li>
                                {indicator.description}
                              </li>
                            )
                          }    
                          </ul>
                        </Typography>
                    </TableCell>
                    {
                      props.responders.map(responder => 
                        !responder.isHR &&
                        <TableCell style={{padding: 0, textAlign: 'center'}}>
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
                            value={level.uid}
                          />
                        )}
                      />
                    </TableCell>
                  </TableRow>
                  {
                    Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid)) &&
                    <TableRow>
                      <TableCell colSpan={props.responders.length + 1}>
                        <Field
                          name={`levelRespond.${index}.note`}
                          render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => {
                            // const error = getIn(form.errors, `levelRespond.${index}.note`);
                            // const touch = getIn(form.touched, `levelRespond.${index}.note`);

                            return (
                              <TextField
                                {...field}
                                fullWidth
                                required
                                disabled={form.isSubmitting}
                                margin="normal"
                                autoComplete="off"
                                label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Note'})}
                                placeholder={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Note'})}
                                // helperText={error && touch}
                                // error={touch && Boolean(error)}
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

export const CompetencyResultCategory = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(competencyResultCategory);