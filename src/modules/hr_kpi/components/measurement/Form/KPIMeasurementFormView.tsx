import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages/layoutMessage';
import { Button, Card, CardActions, CardContent, CardHeader, CircularProgress, Grid, ListItem, TextField, Tooltip, Typography } from '@material-ui/core';
import { Field, FieldProps, Form, Formik, FormikProps } from 'formik';
import * as React from 'react';
import { IKPIMeasurementFormValue, IKPIMeasurementFormValueList, KPIMeasurementFormProps } from './KPIMeasurementForm';

export const KPIMeasurementDetailView: React.SFC<KPIMeasurementFormProps> = props => {

  const MeasurementList = (measurements: IKPIMeasurementFormValueList[]) => (
    measurements.map((item, index) => 
      <Tooltip title={props.intl.formatMessage(kpiMessage.measurement.field.tooltip)} key={index}>
        <ListItem disableGutters>
          <Formik
            enableReinitialize
            initialValues={props.measurementValueList[index].measurementFormValue}
            validationSchema={props.validationSchema}
            onSubmit={props.handleOnSubmit}
            render={(formikBag: FormikProps<IKPIMeasurementFormValue>) => (
              <Form>
                  <Grid container spacing={0}>
                    <Grid item xs={12} onClick={() => !item.isEditing && props.handleSetEditMode(index)}>
                      <Typography noWrap variant= "body2" >
                        {formikBag.values.uid}
                      </Typography>
                    </Grid>
                    <Grid item xs={12} onClick={() => !item.isEditing && props.handleSetEditMode(index)}>
                      <Field
                        name="description"
                        render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
                          <TextField
                            {...field}
                            fullWidth
                            margin= "dense"
                            InputProps= {{
                              disableUnderline: !item.isEditing,
                              readOnly: !item.isEditing
                            }}
                            autoComplete="off"
                            disabled={form.isSubmitting}
                            label={props.intl.formatMessage(kpiMessage.measurement.field.description)}
                            placeholder={props.intl.formatMessage(kpiMessage.measurement.field.description)}
                            helperText={form.touched.description && form.errors.description}
                            error={form.touched.description && Boolean(form.errors.description)}
                          />
                        )}
                      />
                    </Grid>
                    <Grid item xs={12} onClick={() => !item.isEditing && props.handleSetEditMode(index)}>
                      <Grid container spacing={8} >
                        <Grid item xs={10}>
                          <Field
                            name="measurementType"
                            render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
                              <React.Fragment>
                                <CommonSystemOption category="measurement" filter={props.filterCommonSystem}>
                                  <SelectField
                                    isSearchable
                                    isDisabled={formikBag.isSubmitting}
                                    isClearable={field.value !== ''}
                                    escapeClearsValue={true}
                                    valueString={field.value}
                                    textFieldProps={{
                                      label: props.intl.formatMessage(kpiMessage.measurement.field.measurementType),
                                      required: true,
                                      helperText: form.touched.measurementType && form.errors.measurementType,
                                      error: form.touched.measurementType && Boolean(form.errors.measurementType),
                                      margin: 'dense',
                                      // InputProps: {
                                      //   disableUnderline: !item.isEditing,
                                      //   readOnly: !item.isEditing
                                      // }
                                    }}
                                    onMenuClose={() => formikBag.setFieldTouched(field.name)}
                                    onChange={(selected: ISelectFieldOption) => formikBag.setFieldValue(field.name, selected && selected.value || '')}
                                  />
                                </CommonSystemOption>
                              </React.Fragment>
                            )}
                          />
                          
                        </Grid>
                        <Grid item xs={2}>
                          <Field
                            name="weight"
                            render={({ field, form }: FieldProps<IKPIMeasurementFormValue>) => (
                              <TextField
                                {...field}
                                fullWidth
                                margin= "dense"
                                autoComplete="off"
                                disabled={form.isSubmitting}
                                label={props.intl.formatMessage(kpiMessage.measurement.field.weight)}
                                placeholder={props.intl.formatMessage(kpiMessage.measurement.field.weightPlaceholder)}
                                helperText={form.touched.weight && form.errors.weight}
                                error={form.touched.weight && Boolean(form.errors.weight)}
                                InputProps={{
                                  inputComponent: NumberFormatter,
                                  disableUnderline: !item.isEditing,
                                  readOnly: !item.isEditing
                                }}
                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                  // set current field
                                  if (e.target.value === '') {
                                    formikBag.setFieldValue(field.name, parseFloat('0'));
                                  } else {
                                    formikBag.setFieldValue(field.name, parseFloat(e.target.value));
                                  }
                                }}
                              />
                            )}
                          />
                        </Grid>
                      </Grid> 
                    </Grid>
                    {
                      item.isEditing &&
                      <Grid item xs={12}>
                        <CardActions>
                          <Button 
                            fullWidth
                            type="reset"
                            color="primary"
                            disabled={formikBag.isSubmitting}
                            onClick={() => {
                              if (item.isEditing) {
                                props.handleSetEditMode(index);
                              }                              
                              formikBag.resetForm();
                            }}
                          >
                            {props.intl.formatMessage(layoutMessage.action.cancel)}
                          </Button>

                          <Button 
                            fullWidth
                            type="button"
                            color="secondary"
                            disabled={formikBag.isSubmitting}
                            onClick={() => formikBag.submitForm()}
                          >
                            {formikBag.isSubmitting ? props.intl.formatMessage(layoutMessage.text.processing) : props.intl.formatMessage(layoutMessage.action.save)}
                          </Button>
                        </CardActions>
                      </Grid>
                    }
                  </Grid>
              </Form>
            )}
          />
        </ListItem>
      </Tooltip>
    )
  );

  return (
  <React.Fragment>
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.measurement.section.infoTitle)}
        // subheader={}
      />
      <CardContent>
        {
          props.kpiMeasurementState.list.isLoading &&
          <div className={props.classes.preloader}>
            <div className={props.classes.preloaderContent}>
              <CircularProgress 
                style={{margin: 'auto'}} 
                color="secondary"
              />

              <Typography
                {...props.waitingTextProps}
                className={props.classes.marginFarTop}
              >
                {props.waitingText}
              </Typography>
            </div>    
          </div>
        }
        {
          MeasurementList(props.measurementValueList)
        }
      </CardContent>
    </Card>
  </React.Fragment>
  );
};
