import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIEmployeeFormValue } from '../KPIManagerInputForm';

type KPIManagerInputDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IKPIEmployeeFormValue>;
  intl: InjectedIntl;
};

const KPIManagerInputDetailPartialForm: React.ComponentType<KPIManagerInputDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(kpiMessage.employee.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField 
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
      
      <Field 
        name="employeeName"
        render={({ field}: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField 
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.employeeUid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="templateName"
        render={({ field }: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField 
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.templateUid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="year"
        render={({ field }: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField 
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.year)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
      
      <Field
        name="period"
        render={({ field }: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField 
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.period)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="isFinal"
        render={({ field }: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField 
            {...field}
            {...GlobalStyle.TextField.ReadOnly}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.isFinal)}
            value={props.formikBag.values.isFinal && 
              props.intl.formatMessage(kpiMessage.employee.field.isFinalTrue) || 
              props.intl.formatMessage(kpiMessage.employee.field.isFinalFalse)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      {/* <Field
        name="isFinal"
        render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(kpiMessage.employee.field.isFinal)}
            disabled={form.isSubmitting}
            control={
              <Checkbox 
                {...field} 
                value={field.value}
                checked={props.formikBag.values.isFinal}
                readOnly
              />
            }
            style={{width: '100%'}}
          />
        )}
      />   */}

      {
        props.formikBag.values.revision &&
        <Field
          name="revision"
          render={({ field }: FieldProps<IKPIEmployeeFormValue>) => (
            <TextField 
              {...field}
              {...GlobalStyle.TextField.ReadOnly}
              disabled={props.formikBag.isSubmitting}
              label={props.intl.formatMessage(kpiMessage.employee.field.revision)}
              helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
            />
          )}
        />
      }

      <Field
        name="totalWeight"
        render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.totalWeight)}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.totalWeight && form.errors.totalWeight}
            error={form.touched.totalWeight && Boolean(form.errors.totalWeight)}
          />
        )}
      />

      <Field
        name="totalScore"
        render={({ field, form }: FieldProps<IKPIEmployeeFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            disabled={props.formikBag.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.totalScore)}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.totalScore && form.errors.totalScore}
            error={form.touched.totalScore && Boolean(form.errors.totalScore)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default KPIManagerInputDetailPartialForm;