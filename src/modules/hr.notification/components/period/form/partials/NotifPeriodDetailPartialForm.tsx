import { FormMode } from '@generic/types';
import { PeriodOption, RangeOption } from '@hr.notification/components/period/options';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { INotifPeriodFormValue } from '../NotifPeriodForm';

type NotifPeriodPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<INotifPeriodFormValue>;
  intl: InjectedIntl;
};

const NotifPeriodDetailPartialForm: React.ComponentType<NotifPeriodPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(notifMessage.period.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<INotifPeriodFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="type"
        render={({ field, form }: FieldProps<INotifPeriodFormValue>) => (
          <PeriodOption>
            <SelectField  
              isSearchable
              isDisabled={form.isSubmitting}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.type && form.errors.type,
                error: form.touched.type && Boolean(form.errors.type)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </PeriodOption>
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<INotifPeriodFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="range"
        render={({ field, form }: FieldProps<INotifPeriodFormValue>) => (
          <RangeOption>
            <SelectField  
              isSearchable
              isDisabled={form.isSubmitting}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.range && form.errors.range,
                error: form.touched.range && Boolean(form.errors.range)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </RangeOption>
        )}
      />

      <Field
        name="from"
        render={({ field, form }: FieldProps<INotifPeriodFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.from && form.errors.from}
            error={form.touched.from && Boolean(form.errors.from)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                const value = parseFloat(e.target.value);

                // set current field
                props.formikBag.setFieldValue(field.name, value);
              }
            }}
          />
        )}
      />
      
      <Field
        name="to"
        render={({ field, form }: FieldProps<INotifPeriodFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(notifMessage.period.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.to && form.errors.to}
            error={form.touched.to && Boolean(form.errors.to)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                const value = parseFloat(e.target.value);

                // set current field
                props.formikBag.setFieldValue(field.name, value);
              }
            }}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default NotifPeriodDetailPartialForm;