import { FormMode } from '@generic/types';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { INotifTemplateFormValue } from '../NotifTemplateForm';

type NotifTemplatePartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<INotifTemplateFormValue>;
  intl: InjectedIntl;
};

const NotifTemplateDetailPartialForm: React.ComponentType<NotifTemplatePartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(notifMessage.template.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<INotifTemplateFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(notifMessage.template.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<INotifTemplateFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(notifMessage.template.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(notifMessage.template.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default NotifTemplateDetailPartialForm;