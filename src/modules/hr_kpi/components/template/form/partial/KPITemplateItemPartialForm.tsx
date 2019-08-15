import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardContent, CardHeader, IconButton, Table, TableBody, TableCell, TableHead, TableRow, TextField, WithStyles } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { MeasurementType } from '@common/classes/types';
import { IKPICategoryGetListFilter } from '@kpi/classes/filter/category';
import { IKPIMeasurementGetListFilter } from '@kpi/classes/filter/measurement';
import { KPICategoryOption } from '@kpi/components/category/options/KPICategoryOption';
import { KPIMeasurementOption } from '@kpi/components/measurement/options/KPIMeasurementOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import * as classNames from 'classnames';
import { IKPITemplateFormValue } from '../KPITemplateForm';

interface KPITemplateItemPartialFormProps {
  formMode: FormMode; 
  formikBag: FormikProps<IKPITemplateFormValue>;
  intl: InjectedIntl;
  filterKPICategory: IKPICategoryGetListFilter;
  filterKPIMeasurement: IKPIMeasurementGetListFilter;
}

type AllProps
 = KPITemplateItemPartialFormProps
 & WithStyles;

const KPITemplateItemPartialForm: React.ComponentType<AllProps> = props => (
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
    <CardContent>
      <div
        className={classNames(props.classes.reportContentScrollable)}
      >
        <Table
          className={classNames(props.classes.reportTable)}
          padding="dense"
        >
          <TableHead>
            <TableRow>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.categoryUid)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.categoryName)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.measurementUid)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthMd)}>
                {props.intl.formatMessage(kpiMessage.template.field.target)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS)}>
                {props.intl.formatMessage(kpiMessage.template.field.weight)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS)}>
                {props.intl.formatMessage(kpiMessage.template.field.threshold)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXS)}>
                {props.intl.formatMessage(kpiMessage.template.field.amount)}
              </TableCell>
              <TableCell className={classNames(props.classes.cellWidthXSS)}>
                {props.intl.formatMessage(layoutMessage.action.delete)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FieldArray
              name="items"
              render={(fields: FieldArrayRenderProps) => (
                <React.Fragment>
                  {
                    props.formikBag.values.items.length > 0 &&
                    props.formikBag.values.items.map((item, index) =>
                    <TableRow key={index}>
                      <TableCell>
                        <Field
                          name="categoryUid"
                          render={({ form }: FieldProps<IKPITemplateFormValue>) => {
                            const error = getIn(form.errors, `items.${index}.categoryUid`);
                            const touch = getIn(form.touched, `items.${index}.categoryUid`);

                            return (
                              <KPICategoryOption filter={props.filterKPICategory} defaultLabel={props.intl.formatMessage(kpiMessage.template.field.categoryUidPlaceholder)}>
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
                      </TableCell>
                      
                      <TableCell>
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
                                placeholder={props.intl.formatMessage(kpiMessage.template.field.categoryName)}
                                helperText={touch && error}
                                error={touch && Boolean(error)}
                              />
                            );
                          }}
                        />
                      </TableCell>

                      <TableCell>
                        <Field
                          name={`items.${index}.measurementUid`}
                          render={({ form }: FieldProps<IKPITemplateFormValue>) => {
                            const error = getIn(form.errors, `items.${index}.measurementUid`);
                            const touch = getIn(form.touched, `items.${index}.measurementUid`);

                            return (
                              <KPIMeasurementOption filter={props.filterKPIMeasurement} categoryUid={props.formikBag.values.items[index].categoryUid} defaultLabel={props.intl.formatMessage(kpiMessage.template.field.measurementUidPlaceholder)}>
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
                                    helperText: touch && error,
                                    error: touch && Boolean(error)
                                  }}
                                  onMenuClose={() => props.formikBag.setFieldTouched(`items.${index}.measurementUid`)}
                                  onChange={(selected: ISelectFieldOption) => {
                                    props.formikBag.setFieldValue(`items.${index}.measurementUid`, selected && selected.value || '');
                                    props.formikBag.setFieldValue(`items.${index}.weight`, selected && selected.data && selected.data.weight || 0);
                                    props.formikBag.setFieldValue(`items.${index}.measurementType`, selected && selected.data && selected.data.measurementType || '');

                                    if (selected && selected.data && selected.data.measurementType === MeasurementType.Completion) {
                                      props.formikBag.setFieldValue(`items.${index}.amount`, 1);
                                    }

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
                      </TableCell>

                      <TableCell>
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
                                placeholder={props.intl.formatMessage(kpiMessage.template.field.targetPlaceholder)}
                                helperText={touch && error}
                                error={touch && Boolean(error)}
                              />
                            );
                          }}
                        />
                      </TableCell>

                      <TableCell>
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
                      </TableCell>

                      <TableCell>
                        {
                          props.formikBag.values.items[index].measurementType === MeasurementType.Scoring &&
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
                          /> || '-'
                        }
                      </TableCell>

                      <TableCell>
                        {
                          (props.formikBag.values.items[index].measurementType === MeasurementType.Scoring || 
                          props.formikBag.values.items[index].measurementType === MeasurementType.Attendance) &&
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
                          /> || '-'
                        }
                      </TableCell>

                      <TableCell>
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
                      </TableCell>
                    </TableRow>
                  )}
                  <TableRow>
                    <TableCell colSpan={8}>
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
                    </TableCell>
                  </TableRow>
                </React.Fragment>
              )}
            />
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

export default KPITemplateItemPartialForm;