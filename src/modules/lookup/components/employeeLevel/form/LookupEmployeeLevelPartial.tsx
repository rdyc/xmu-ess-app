import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IEmployeeLevelFormValue } from './LookupEmployeeLevelForm';

type LookupEmployeeLevelPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IEmployeeLevelFormValue>;
  intl: InjectedIntl;
};

const LookupEmployeeLevelPartial: React.ComponentType<LookupEmployeeLevelPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.employeeLevel.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IEmployeeLevelFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.employeeLevel.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="value"
        render={({ field, form }: FieldProps<IEmployeeLevelFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(lookupMessage.employeeLevel.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.employeeLevel.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.value && form.errors.value}
            error={form.touched.value && Boolean(form.errors.value)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IEmployeeLevelFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            multiline
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(lookupMessage.employeeLevel.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.employeeLevel.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default LookupEmployeeLevelPartial;