import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICompanyFormValue } from '../LookupCompanyForm';

type LookupCompanyDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompanyFormValue>;
  intl: InjectedIntl;
};

const LookupCompanyDetailPartialForm: React.ComponentType<LookupCompanyDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.company.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ICompanyFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.company.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="code"
        render={({ field, form }: FieldProps<ICompanyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.company.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.company.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.code && form.errors.code}
            error={form.touched.code && Boolean(form.errors.code)}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<ICompanyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.company.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.company.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default LookupCompanyDetailPartialForm;