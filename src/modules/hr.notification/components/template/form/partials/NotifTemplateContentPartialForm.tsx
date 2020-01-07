import { FormMode } from '@generic/types';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
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

const NotifTemplateContentPartialForm: React.ComponentType<NotifTemplatePartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(notifMessage.template.section.contentTitle)} />
    <CardContent>
      <Field
        name="content"
        render={({ field, form }: FieldProps<INotifTemplateFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            multiline
            rowsMax={20}
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(notifMessage.template.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(notifMessage.template.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.content && form.errors.content}
            error={form.touched.content && Boolean(form.errors.content)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default NotifTemplateContentPartialForm;