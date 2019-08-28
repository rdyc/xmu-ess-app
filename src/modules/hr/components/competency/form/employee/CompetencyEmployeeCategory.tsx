import { FormMode } from '@generic/types';
import { IHrCompetencyCategory } from '@hr/classes/response';
import { Card, FormControlLabel, Radio, Table, TableBody, TableCell, TableRow, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, HandleCreators, mapper, StateHandler, StateHandlerMap, StateUpdaters, withHandlers, withStateHandlers } from 'recompose';
import { ICompetencyEmployeeFormValue } from './CompetencyEmployeeForm';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyEmployeeFormValue>;
  intl: InjectedIntl;
  data?: IHrCompetencyCategory[] | null;
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
  <Card square>
    <Table>
    <TableBody>
    {
      props.data &&
      props.data.map((category, index) => 
      <React.Fragment key={category.uid}>
        <TableRow>
          <TableCell colSpan={2} className={props.classes.toolbar}>
            <Typography variant="body1" color="inherit">
              {category.name}
            </Typography>
          </TableCell>
        </TableRow>
        {category.levels.map((level) =>           
          <TableRow>
            <TableCell colSpan={1}>
              <Field 
                name="levelRespond"
                render={({field}: FieldProps<ICompetencyEmployeeFormValue>) => (
                  <FormControlLabel
                    control={<Radio 
                      checked={props.formikBag.values.levelRespond[category.uid] === level.uid}
                      onChange={() => {
                        props.formikBag.setFieldValue(`levelRespond[${category.uid}]`, level.uid);
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
        )}    
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