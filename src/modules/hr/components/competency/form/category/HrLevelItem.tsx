import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardHeader, Collapse, Divider, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField, WithStyles, withStyles } from '@material-ui/core';
import { DeleteForever, ExpandLess, ExpandMore, PlaylistAdd } from '@material-ui/icons';
import styles from '@styles';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { compose, mapper, StateHandlerMap, StateUpdaters, withStateHandlers } from 'recompose';
import { ICategoryFormValue } from './HrCompetencyCategoryForm';

interface IOwnOption {
  formMode: FormMode; 
  formikBag: FormikProps<ICategoryFormValue>;
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
  & IOwnOption
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

const hrLevelItem: React.ComponentType<AllProps> = props => {
  const { active, isExpanded, handleToggle } = props;

  const render = (
    <React.Fragment>
      <FieldArray 
        name="levels"
        render={(fields: FieldArrayRenderProps) => (
          <React.Fragment>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Competency Level'})} 
            />
            <List>
              {
                props.formikBag.values.levels.length > 0 &&
                props.formikBag.values.levels.map((item, index) =>
                  <React.Fragment key={index}>
                    <Divider />
                    <ListItem
                      button
                      selected={index === active && isExpanded}
                      onClick={() => handleToggle(index)}
                    >
                      <ListItemText
                        primary={`Level ${item.level}`}
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
                        name={`levels.${index}.level`}
                        render={({field, form}: FieldProps<ICategoryFormValue>) => {
                          const error = getIn(form.errors, `levels.${index}.level`);
                          const touch = getIn(form.touched, `levels.${index}.level`);

                          return (
                            <TextField
                              {...field}
                              fullWidth
                              required
                              disabled={form.isSubmitting}
                              margin="normal"
                              autoComplete="off"
                              label={props.intl.formatMessage(hrMessage.competency.field.level)}
                              placeholder={props.intl.formatMessage(hrMessage.competency.field.levelPlaceholder)}
                              helperText={error && touch}
                              error={touch && Boolean(error)}
                              InputProps={{
                                inputComponent: NumberFormatter,
                              }}
                              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                if (e.target.value === '') {
                                  props.formikBag.setFieldValue(field.name, 0);
                                } else {
                                  props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
                                }
                              }}
                            />
                          );
                        }}
                      />

                      <Field 
                        name={`levels.${index}.description`}
                        render={({field, form}: FieldProps<ICategoryFormValue>) => {
                          const error = getIn(form.errors, `levels.${index}.description`);
                          const touch = getIn(form.touched, `levels.${index}.description`);

                          return (
                            <TextField
                              {...field}
                              fullWidth
                              required
                              multiline
                              disabled={form.isSubmitting}
                              margin="normal"
                              autoComplete="off"
                              label={props.intl.formatMessage(hrMessage.competency.field.description)}
                              placeholder={props.intl.formatMessage(hrMessage.competency.field.descriptionPlaceholder)}
                              helperText={error && touch}
                              error={touch && Boolean(error)}
                            />
                          );
                        }}
                      />

                      <FieldArray 
                        name={`levels.${index}.indicators`}
                        render={(fieldsIndicator: FieldArrayRenderProps) => (
                          <React.Fragment>
                            {
                              props.formikBag.values.levels[index] &&
                              props.formikBag.values.levels[index].indicators &&
                              props.formikBag.values.levels[index].indicators.length > 0 &&
                              props.formikBag.values.levels[index].indicators.map((indicator, idx) =>
                                <Field 
                                  key={idx}
                                  name={`levels.${index}.indicators.${idx}.description`}
                                  render={({field, form}: FieldProps<ICategoryFormValue>) => {
                                    const error = getIn(form.errors, `levels.${index}.indicators.${idx}.description`);
                                    const touch = getIn(form.touched, `levels.${index}.indicators.${idx}.description`);
          
                                    return (
                                        <ListItem disableGutters>
                                          <ListItemText>
                                            <TextField
                                              {...field}
                                              fullWidth
                                              required
                                              multiline
                                              disabled={form.isSubmitting}
                                              margin="normal"
                                              autoComplete="off"
                                              label={props.intl.formatMessage(hrMessage.competency.field.indicatorNum, {num: idx + 1})}
                                              placeholder={props.intl.formatMessage(hrMessage.competency.field.indicatorPlaceholder)}
                                              helperText={error && touch}
                                              error={touch && Boolean(error)}
                                            />
                                          </ListItemText>
                                          <ListItemSecondaryAction className={props.classes.marginWideTop}>
                                            <IconButton 
                                              disabled={props.formikBag.isSubmitting}
                                              onClick={() => fieldsIndicator.remove(idx)}
                                            >
                                              <DeleteForever color="action" />
                                            </IconButton>
                                          </ListItemSecondaryAction>
                                        </ListItem>
                                    );
                                  }}
                                />
                              )
                            }
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
                                {props.intl.formatMessage(hrMessage.competency.field.level)}
                              </Button>
                              <Button
                                fullWidth
                                color="primary" 
                                disabled={props.formikBag.isSubmitting}
                                onClick={() => fieldsIndicator.push({ description: '' })}
                              >
                                <PlaylistAdd className={props.classes.marginFarRight} />
                                {props.intl.formatMessage(hrMessage.competency.field.indicator)}
                              </Button>
                            </CardActions>
                          </React.Fragment>
                        )}
                      />
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
                        level: props.formikBag.values.levels.length + 1,
                        description: ''
                      });
                      handleToggle(props.formikBag.values.levels.length);
                    }}
                  >
                    <PlaylistAdd className={props.classes.marginFarRight} />
                    {props.intl.formatMessage(layoutMessage.action.add)}
                  </Button>
                </CardActions>
              </Card>
            </div>
          </React.Fragment>
        )}
      />
    </React.Fragment>
  );

  return render;
};

export const HrLevelItem = compose<AllProps, IOwnOption>(
  withStyles(styles),
  withStateHandlers(createProps, stateUpdaters)
)(hrLevelItem);