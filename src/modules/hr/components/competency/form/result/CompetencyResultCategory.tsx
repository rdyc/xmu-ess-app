import { FormMode } from '@generic/types';
import { IHrCompetencyEmployeeDetailList, IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, FormControlLabel, Radio, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
// import { Done } from '@material-ui/icons';
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
  data: IHrCompetencyMappedList;
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
          <TableCell colSpan={1}>
            
          </TableCell>
          {
            props.responders.map(responder => 
              !responder.isHR &&
              <TableCell style={{maxWidth: '100px', padding: '0 5px'}}>
                {responder.employee && responder.employee.fullName}
              </TableCell>  
            )
          }
          <TableCell colSpan={1}>
            HR
          </TableCell>
        </TableRow>
        {
          props.data &&
          props.data.categories.map((item, index) => 
          <React.Fragment key={item.uid}>
            <TableRow>
              <TableCell colSpan={props.responders.length + 1} className={props.classes.toolbar}>
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
                    <TableCell colSpan={1}>
                        <Typography>
                          {`Level ${level.level} - ${level.description}`}
                        </Typography>
                        <Typography>
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
                        <TableCell>
                          {
                            responder.items.length > 0 &&
                            responder.items.find(findData => findData.levelUid === level.uid) &&
                            <Typography>
                              &#10004;
                              {/* <Done /> */}
                            </Typography>
                          }
                        </TableCell>
                      )
                    }
                    <TableCell colSpan={1}>
                      <Field 
                        name={`levelRespond.${index}`}
                        render={({field}: FieldProps<ICompetencyResultFormValue>) => (
                          <FormControlLabel
                            control={<Radio 
                              checked={Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid))}
                              onChange={() => { 
                                props.formikBag.setFieldValue(`levelRespond.${index}.levelUid`, level.uid);
                              }}
                            />}
                            value={level.uid}
                            label={''}
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
                          render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => (
                            <TextField
                              {...field}
                              fullWidth
                              required
                              disabled={form.isSubmitting}
                              margin="normal"
                              autoComplete="off"
                              label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Note'})}
                              placeholder={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Note'})}
                            />
                          )}
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