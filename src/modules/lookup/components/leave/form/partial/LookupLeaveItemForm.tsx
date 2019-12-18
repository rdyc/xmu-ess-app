import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, Card, CardActions, CardHeader, Collapse, Divider, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, WithStyles, withStyles } from '@material-ui/core';
import { ChevronLeft, ChevronRight, DateRange, DeleteForever, ExpandLess, ExpandMore } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import { DatePicker } from 'material-ui-pickers';
// import { Moment } from 'moment';
import * as moment from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { ILeaveFormValue } from '../LookupLeaveForm';

interface IOwnProps {
  formMode: FormMode; 
  formikBag: FormikProps<ILeaveFormValue>;
  intl: InjectedIntl;
}

interface IOwnState {
  active: number | undefined;
  isExpanded: boolean;
}

interface IOwnStateHandler extends StateHandlerMap<IOwnState> {
  handleToggle: (uid?: number) => IOwnState;
}

type AllProps
  = IOwnState
  & IOwnProps
  & IOwnStateHandler
  & WithStyles<typeof styles>;
  
const createProps: mapper<AllProps, IOwnState> = (): IOwnState => ({
  active: undefined,
  isExpanded: false
});

const stateUpdaters: StateUpdaters<{}, IOwnState, IOwnStateHandler> = {
  handleToggle: (state: IOwnState) => (uid?: number) => ({
    active: uid,
    isExpanded: state.active === uid ? !state.isExpanded : true
  })
};

const lookupLeaveItemForm: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, handleToggle } = props;

  const render = (
      <FieldArray
        name="items"
        render={(fields: FieldArrayRenderProps) => (
          <React.Fragment>
            <Card square>
              <CardHeader 
                title={props.intl.formatMessage(lookupMessage.leave.field.leaveItem)}
                subheader={
                  props.formikBag.submitCount > 0 &&
                  typeof props.formikBag.errors.items === 'string' &&
                  props.formikBag.errors.items
                }
                subheaderTypographyProps={{
                  color: 'error',
                  variant: 'body1'
                }}
              />
              <List>
                {
                  props.formikBag.values.items.length > 0 &&
                  props.formikBag.values.items.map((item, index) => 
                    <React.Fragment key={index}>
                      <Divider />
                      <ListItem
                        button
                        selected={index === active && isExpanded}
                        onClick={() => handleToggle(index)}
                      >
                        <ListItemText 
                          primary={
                            `${item.leaveDate && moment(item.leaveDate).format('MMMM DD, YYYY') || '{Date}'}`
                          } 
                        />
                        <ListItemSecondaryAction>
                          {active === index && isExpanded ? <ExpandLess /> : <ExpandMore />}
                        </ListItemSecondaryAction>
                      </ListItem>
                      <Collapse
                        className={props.classes.marginFar}
                        in={active === index && isExpanded}
                        timeout="auto"
                        unmountOnExit
                      >

                        <Field
                          name={`items.${index}.leaveDate`}
                          render={({ field, form }: FieldProps<ILeaveFormValue>) => {
                            const error = getIn(form.errors, `items.${index}.leaveDate`);
                            const touch = getIn(form.touched, `items.${index}.leaveDate`);
                            
                            return (
                              <DatePicker
                                {...field}
                                fullWidth
                                required
                                margin="normal"
                                disabled={form.isSubmitting}
                                showTodayButton
                                label={props.intl.formatMessage(lookupMessage.leave.field.leaveDate)}
                                placeholder={props.intl.formatMessage(lookupMessage.leave.field.leaveDatePlaceholder)}
                                leftArrowIcon={<ChevronLeft />}
                                rightArrowIcon={<ChevronRight />}
                                format="MMMM DD, YYYY"
                                helperText={touch && error}
                                error={touch && Boolean(error)}
                                minDate={props.formikBag.values.items.length > 1 && props.formikBag.values.items[0].leaveDate}
                                onChange={(date: moment.Moment) => props.formikBag.setFieldValue(field.name, date.format('YYYY-MM-DD'))}
                                invalidLabel=""
                              />
                            );
                          }}
                        />

                        <Field 
                          name={`items.${index}.leaveDescription`}
                          render={({field, form}: FieldProps<ILeaveFormValue>) => {
                            const error = getIn(form.errors, `items.${index}.leaveDescription`);
                            const touch = getIn(form.touched, `items.${index}.leaveDescription`);
        
                            return (
                              <TextField
                                {...field}
                                fullWidth
                                required
                                disabled={form.isSubmitting}
                                margin="normal"
                                autoComplete="off"
                                label={props.intl.formatMessage(lookupMessage.leave.field.leaveDescription)}
                                placeholder={props.intl.formatMessage(lookupMessage.leave.field.leaveDescriptionPlaceholder)}
                                helperText={touch && error}
                                error={touch && Boolean(error)}
                              />
                            );
                          }}
                        />
                        <CardActions>
                          <Button
                            fullWidth
                            color="secondary" 
                            disabled={props.formikBag.isSubmitting}
                            onClick={() => {
                              fields.remove(index);
                              handleToggle(undefined);
                            }}
                          >
                            <DeleteForever className={props.classes.marginFarRight} />
                            {props.intl.formatMessage(lookupMessage.leave.field.date)}
                          </Button>
                        </CardActions>
                      </Collapse>
                    </React.Fragment>
                  )
                }
              </List>
            </Card>
            <div className={props.classes.flexContent}>
              <Card square>
                <CardActions>
                  <Button
                    fullWidth
                    color="primary"
                    disabled={props.formikBag.isSubmitting}
                    onClick={() => {
                      fields.push({
                        uid: '',
                        leaveDate: '',
                        leaveDescription: ''
                      });
                      handleToggle(props.formikBag.values.items.length);
                    }}
                  >
                    <DateRange className={props.classes.marginFarRight}/>
                    {props.intl.formatMessage(layoutMessage.action.add)}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </React.Fragment>
        )}
      />
    );

  return render;
};

export const LookupLeaveItemForm = compose<AllProps, IOwnProps>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(lookupLeaveItemForm);