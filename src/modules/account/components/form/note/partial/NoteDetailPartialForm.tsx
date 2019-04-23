import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { INoteFormValue } from '../NoteForm';

type NoteDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<INoteFormValue>;
  intl: InjectedIntl;
};

const NoteDetailPartialForm: React.ComponentType<NoteDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Note'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<INoteFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.note.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field 
        name="id"
        render={({ field}: FieldProps<INoteFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.note.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}  
      />

      <Field
        name="text"
        render={({ field, form }: FieldProps<INoteFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.note.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.note.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.text && form.errors.text}
            error={form.touched.text && Boolean(form.errors.text)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default NoteDetailPartialForm;