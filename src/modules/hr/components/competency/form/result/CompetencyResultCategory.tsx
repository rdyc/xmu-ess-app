import { FormMode } from '@generic/types';
import { IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, FormControlLabel, Radio, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
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
  <Card square>
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
            <React.Fragment>         
              <TableRow>
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
                        label={`Level ${level.level} - ${level.description}`}
                      />
                    )}
                  />
                </TableCell>
                <TableCell colSpan={1}>
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
              </TableRow>
              {
                Boolean(props.formikBag.values.levelRespond.find(findLevel => findLevel.levelUid === level.uid)) &&
                <TableRow>
                  <TableCell colSpan={2}>
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