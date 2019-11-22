import { FormMode } from '@generic/types';
import { IHrCompetencyMappedList } from '@hr/classes/response';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { Card, CardHeader, Radio, Table, TableBody, TableCell, TableRow, TextField, Typography, WithStyles, withStyles } from '@material-ui/core';
import styles from '@styles';
import * as classNames from 'classnames';
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
  active: string | undefined;
  isExpanded: boolean;
}

interface IOwnHandler {

}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  stateUpdate: StateHandler<IOwnState>;
  handleToggle: (uid: string) => IOwnState;
}

type AllProps
  = IOwnProps
  & IOwnHandler
  & IOwnState
  & IOwnStateHandler
  & WithStyles<typeof styles>;
  
const createProps: mapper<AllProps, IOwnState> = (props: AllProps): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const handlerCreators: HandleCreators<AllProps, IOwnHandler> = {
};

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  stateUpdate: (prevState: IOwnState) => (newState: IOwnState) => ({
    ...prevState,
    ...newState
  }),
  handleToggle: (state: IOwnState) => (uid: string) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const competencyEmployeeCategory: React.ComponentType<AllProps> = props => (
  <Card square className={props.classes.hrTable}>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Assessment Form'})}
    />
    <Table>
    <TableBody>
    {
      props.data &&
      props.data.categories.map((item, index) => 
      <React.Fragment key={item.uid}>
        <TableRow>
          {/* Category */}
          <TableCell colSpan={2} className={classNames(props.classes.toolbar)} >
            <Typography variant="body1" color="inherit" >
              {item.category.competency.name} - {item.category.name}
            </Typography>
            <Typography color="inherit">
              {item.category.description}
            </Typography>
            {/* {props.active === item.category.uid && props.isExpanded ? <ExpandLess className={props.classes.expandCategory} /> : <ExpandMore  className={props.classes.expandCategory}/>}
            <Collapse
              in={props.active === item.category.uid && props.isExpanded}
              timeout="auto"
              unmountOnExit
            >
              <Typography variant="body1" color="inherit">
                {item.category.description}
              </Typography>
            </Collapse> */}
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