import { FormMode } from '@generic/types';
import { IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Radio, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { ICompetencyEmployeeFormValue } from './CompetencyEmployeeForm';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyEmployeeFormValue>;
  intl: InjectedIntl;
  data: IHrCompetencyMappedList;
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

const competencyEmployeeCategory: React.ComponentType<AllProps> = props => (
  <Card square className={props.classes.hrTable}>
    <CardHeader 
      // title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Respond'})}
    />
    <Table>
    <TableBody>
    {
      props.data &&
      props.data.categories.map((item, index) => 
      <React.Fragment key={item.uid}>
        <TableRow>
          <TableCell colSpan={2} className={props.classes.toolbar}>
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
                  <TableCell colSpan={1} className={props.classes.hrTableVerAlign}>
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
                  <TableCell style={{padding: '0 15px'}}>
                    <Field 
                      name={`levelRespond.${index}`}
                      render={({field}: FieldProps<ICompetencyEmployeeFormValue>) => (
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
                {
                  Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid)) &&
                    <TableRow>
                      <TableCell colSpan={2}>
                        <Field
                          name={`levelRespond.${index}.note`}
                          render={({ field, form }: FieldProps<ICompetencyEmployeeFormValue>) => {
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

export const CompetencyEmployeeCategory = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters),
  withHandlers(handlerCreators),
)(competencyEmployeeCategory);