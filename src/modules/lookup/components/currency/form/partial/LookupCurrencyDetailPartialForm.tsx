import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICurrencyFormValue } from '../LookupCurrencyForm';

type LookupCurrencyDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICurrencyFormValue>;
  intl: InjectedIntl;
};

const LookupCurrencyDetailPartialForm: React.ComponentType<LookupCurrencyDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.currency.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ICurrencyFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<ICurrencyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="symbol"
        render={({ field, form }: FieldProps<ICurrencyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.symbol && form.errors.symbol}
            error={form.touched.symbol && Boolean(form.errors.symbol)}
          />
        )}
      />

      <Field
        name="rate"
        render={({ field, form }: FieldProps<ICurrencyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.rate && form.errors.rate}
            error={form.touched.rate && Boolean(form.errors.rate)}
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
        )}
      />

      <Field
        name="isActive"
        render={({ field, form }: FieldProps<ICurrencyFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(lookupMessage.currency.fieldFor(field.name, 'fieldName'))}
            control={
              <Checkbox 
                {...field} 
                value={field.value}
                checked={props.formikBag.values.isActive}
              />
            }
            style={{width: '100%'}}
          />
        )}
      />
      
    </CardContent>
  </Card>
);

export default LookupCurrencyDetailPartialForm;