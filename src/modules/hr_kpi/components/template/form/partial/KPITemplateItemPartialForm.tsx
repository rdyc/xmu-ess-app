import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { KPICategoryOption } from '@kpi/components/category/options/KPICategoryOption';
import { KPIMeasurementOption } from '@kpi/components/measurement/options/KPIMeasurementOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IKPITemplateFormValue } from '../KPITemplateForm';

type KPITemplateItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IKPITemplateFormValue>;
  intl: InjectedIntl;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
};

const KPITemplateItemPartialForm: React.ComponentType<KPITemplateItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - Items`}
                  action={
                    props.formikBag.values.items.length > 1 &&
                    <IconButton 
                      onClick={() => {
                        // remove current
                        fields.remove(index);

                        // calculate total requested
                        let totalRequest = 0;
                        props.formikBag.values.items.forEach((requestItem, indexItem) => {
                          if (index !== indexItem) {
                            totalRequest = totalRequest + requestItem.weight;
                          } 
                        });

                        // set request
                        props.formikBag.setFieldValue('totalWeight', totalRequest);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>

                  <Field
                    name={`items.${index}.uid`}
                    render={({ field }: FieldProps<IKPITemplateFormValue>) => {
                      return (
                        <TextField
                          {...field}
                          {...GlobalStyle.TextField.ReadOnly}
                          fullWidth
                          disabled
                          margin="normal"
                          label={props.intl.formatMessage(kpiMessage.template.field.itemUid)}
                          helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
                        />
                      );
                    }}
                  />

                  <Field
                    name="categoryUid"
                    render={({ form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.categoryUid`);
                      const touch = getIn(form.touched, `items.${index}.categoryUid`);

                      return (
                        <KPICategoryOption filter={props.filterKPICategory}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.isSubmitting}
                            isClearable={props.formikBag.values.items[index].categoryUid !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].categoryUid}
                            textFieldProps={{
                              required: true,
                              label: props.intl.formatMessage(kpiMessage.template.field.categoryUid),
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.categoryUid`)}
                            onChange={(selected: ISelectFieldOption) => {
                              props.formikBag.setFieldValue(`items.${index}.categoryUid`, selected && selected.value || '');
                              props.formikBag.setFieldValue(`items.${index}.categoryName`, selected && selected.label || '');
                              props.formikBag.setFieldValue(`items.${index}.measurementUid`, '');
                            }}
                          />
                        </KPICategoryOption>
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.categoryName`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.categoryName`);
                      const touch = getIn(form.touched, `items.${index}.categoryName`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.categoryName)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.categoryName)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.measurementUid`}
                    render={({ form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.measurementUid`);
                      const touch = getIn(form.touched, `items.${index}.measurementUid`);

                      return (
                        <KPIMeasurementOption filter={props.filterKPIMeasurement} categoryUid={props.formikBag.values.items[index].categoryUid}>
                          <SelectField
                            isSearchable
                            menuPlacement="auto"
                            menuPosition="fixed"
                            isDisabled={props.formikBag.isSubmitting || props.formikBag.values.items[index].categoryUid === ''}
                            isClearable={props.formikBag.values.items[index].measurementUid !== ''}
                            escapeClearsValue={true}
                            valueString={props.formikBag.values.items[index].measurementUid}
                            textFieldProps={{
                              required: true,
                              label: props.intl.formatMessage(kpiMessage.template.field.measurementUid),
                              helperText: touch && error,
                              error: touch && Boolean(error)
                            }}
                            onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.measurementUid`)}
                            onChange={(selected: ISelectFieldOption) => {
                              props.formikBag.setFieldValue(`items.${index}.measurementUid`, selected && selected.value || '');
                              props.formikBag.setFieldValue(`items.${index}.weight`, selected && selected.data && selected.data.weight || 0);

                              let totalValue = selected && selected.data && selected.data.weight || 0;
                              props.formikBag.values.items.forEach((requestItem, indexItem) => {
                                if (index !== indexItem) {
                                  totalValue = totalValue + requestItem.weight;
                                }                              
                              });
  
                              // set weight
                              props.formikBag.setFieldValue('totalWeight', totalValue);
                            }}
                          />
                        </KPIMeasurementOption>
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.target`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.target`);
                      const touch = getIn(form.touched, `items.${index}.target`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          multiline
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.target)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.targetPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.weight`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.weight`);
                      const touch = getIn(form.touched, `items.${index}.weight`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.weight)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.weightPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let totalValue = 0;
                            let value = 0;

                            if (e.target.value === '') {
                              // set current field to 0
                              props.formikBag.setFieldValue(field.name, 0);
                              value = 0;
                            } else {
                              value = parseFloat(e.target.value);
                              // set current field
                              props.formikBag.setFieldValue(field.name, value);
                            }
                            
                            // set actual field
                            props.formikBag.setFieldValue(`items.${index}.weight`, value);

                            // calculate total requested
                            totalValue = value;
                            props.formikBag.values.items.forEach((requestItem, indexItem) => {
                              if (index !== indexItem) {
                                totalValue = totalValue + requestItem.weight;
                              }                              
                            });

                            // set weight
                            props.formikBag.setFieldValue('totalWeight', totalValue);
                          }}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.threshold`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.threshold`);
                      const touch = getIn(form.touched, `items.${index}.threshold`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.threshold)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.thresholdPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = 0;

                            if (e.target.value === '') {
                              // set current field to 0
                              props.formikBag.setFieldValue(field.name, 0);
                              value = 0;
                            } else {
                              value = parseFloat(e.target.value);
                              // set current field
                              props.formikBag.setFieldValue(field.name, value);
                            }
                            
                            // set value field
                            // props.formikBag.setFieldValue(`items.${index}.weight`, value);
                          }}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.amount`}
                    render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.amount`);
                      const touch = getIn(form.touched, `items.${index}.amount`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(kpiMessage.template.field.amount)}
                          placeholder={props.intl.formatMessage(kpiMessage.template.field.amountPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let value = 0;

                            if (e.target.value === '') {
                              // set current field to 0
                              props.formikBag.setFieldValue(field.name, 0);
                              value = 0;
                            } else {
                              value = parseFloat(e.target.value);
                              // set current field
                              props.formikBag.setFieldValue(field.name, value);
                            }
                            
                            // set value field
                            // props.formikBag.setFieldValue(`items.${index}.weight`, value);
                          }}
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(kpiMessage.template.section.itemTitle)}
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
            <CardActions>
              <Button
                fullWidth
                color="primary" 
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({
                  uid: '',
                  categoryUid: '',
                  categoryName: '',
                  measurementUid: '',
                  target: '',
                  weight: 0,
                  threshold: 0,
                  amount: 0,
                })}
              >
                <GroupAdd className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
          
        </div>
      </React.Fragment>
    )}
  />
);

export default KPITemplateItemPartialForm;