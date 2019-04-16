import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IEmployeeFormValue } from '../EmployeeForm';

type EmployeeContactPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IEmployeeFormValue>;
  intl: InjectedIntl;
};

const EmployeeContactPartialForm: React.ComponentType<EmployeeContactPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.employee.section.contactTitle)}
    />
    <CardContent>
      <Field
        name="phone"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.phone && form.errors.phone}
            error={form.touched.phone && Boolean(form.errors.phone)}
          />
        )}
      />

      <Field
        name="mobilePhone"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.mobilePhone && form.errors.mobilePhone}
            error={form.touched.mobilePhone && Boolean(form.errors.mobilePhone)}
          />
        )}
      />

      <Field
        name="email"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.email && form.errors.email}
            error={form.touched.email && Boolean(form.errors.email)}
          />
        )}
      />

      <Field
        name="emailPersonal"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.emailPersonal && form.errors.emailPersonal}
            error={form.touched.emailPersonal && Boolean(form.errors.emailPersonal)}
          />
        )}
      />

      <Field
        name="address"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.address && form.errors.address}
            error={form.touched.address && Boolean(form.errors.address)}
          />
        )}
      />

      <Field
        name="addressAdditional"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.addressAdditional && form.errors.addressAdditional}
            error={form.touched.addressAdditional && Boolean(form.errors.addressAdditional)}
          />
        )}
      />

      <Field
        name="emergencyContactName"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.emergencyContactName && form.errors.emergencyContactName}
            error={form.touched.emergencyContactName && Boolean(form.errors.emergencyContactName)}
          />
        )}
      />
      
      <Field
        name="emergencyContactRelation"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.emergencyContactRelation && form.errors.emergencyContactRelation}
            error={form.touched.emergencyContactRelation && Boolean(form.errors.emergencyContactRelation)}
          />
        )}
      />

      <Field
        name="emergencyContactPhone"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.emergencyContactPhone && form.errors.emergencyContactPhone}
            error={form.touched.emergencyContactPhone && Boolean(form.errors.emergencyContactPhone)}
          />
        )}
      />

      <Field
        name="emergencyContactPhoneAdditional"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.emergencyContactPhoneAdditional && form.errors.emergencyContactPhoneAdditional}
            error={form.touched.emergencyContactPhoneAdditional && Boolean(form.errors.emergencyContactPhoneAdditional)}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default EmployeeContactPartialForm;