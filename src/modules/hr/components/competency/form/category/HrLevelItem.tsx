import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, List, ListItem, ListItemSecondaryAction, ListItemText, TextField } from '@material-ui/core';
import { DeleteForever, PlaylistAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICategoryFormValue } from './HrCompetencyCategoryForm';

type HrLevelItemProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICategoryFormValue>;
  classes: {
    flexContent: string;
    marginFarRight: string;
    marginWideTop: string;
  };
  intl: InjectedIntl;
};

const HrLevelItem: React.ComponentType<HrLevelItemProps> = props => (
  <FieldArray 
    name="levels"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.levels.length > 0 &&
          props.formikBag.values.levels.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - Level`}
                  titleTypographyProps={{variant: 'body2'}}
                  action={
                    <IconButton onClick={() => fields.remove(index)}>
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
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
                        <List>
                        {
                          props.formikBag.values.levels[index] &&
                          props.formikBag.values.levels[index].indicators &&
                          props.formikBag.values.levels[index].indicators.length > 0 &&
                          props.formikBag.values.levels[index].indicators.map((indicator, idx) =>
                            <Field 
                              key={idx}
                              name={`levels.${index}.indicators.${idx}.indicatorDescription`}
                              render={({field, form}: FieldProps<ICategoryFormValue>) => {
                                const error = getIn(form.errors, `levels.${index}.indicators.${idx}.indicatorDescription`);
                                const touch = getIn(form.touched, `levels.${index}.indicators.${idx}.indicatorDescription`);
      
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
                        </List>
                        <Button
                          fullWidth
                          color="primary" 
                          disabled={props.formikBag.isSubmitting}
                          onClick={() => fieldsIndicator.push({ indicatorDescription: '' })}
                        >
                          <PlaylistAdd className={props.classes.marginFarRight} />
                          {props.intl.formatMessage(hrMessage.competency.field.indicator)}
                        </Button>
                      </React.Fragment>
                    )}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Level'})}
              subheader={
                props.formikBag.submitCount > 0 &&
                typeof props.formikBag.errors.levels === 'string' &&
                props.formikBag.errors.levels
              }
              subheaderTypographyProps={{
                color: 'error',
                variant: 'body1'
              }}
            />
            <CardActions>
              <Button
                fullWidth
                color="primary"
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({
                  level: '',
                  description: ''
                })}
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
);

export default HrLevelItem;