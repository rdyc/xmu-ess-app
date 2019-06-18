import { accountMessage } from '@account/locales/messages/accountMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IRateFormValue } from '../RateForm';

type RateDetailPartialFormProps = {
  formikBag: FormikProps<IRateFormValue>;
  intl: InjectedIntl;
};

const RateDetailPartialForm: React.ComponentType<RateDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Rate'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<IRateFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.employee.field.uid)}
          />
        )}
      />

      <Field 
        name="rateId"
        render={({ field}: FieldProps<IRateFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.rate.fieldFor(field.name, 'fieldName'))}
          />
        )}  
      />

      <Field
        name="value"
        render={({ field, form }: FieldProps<IRateFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.rate.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.rate.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.value && form.errors.value}
            error={form.touched.value && Boolean(form.errors.value)}
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
    </CardContent>
  </Card>
);

export default RateDetailPartialForm;