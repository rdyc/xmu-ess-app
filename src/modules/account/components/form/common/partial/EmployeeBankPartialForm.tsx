import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IEmployeeFormValue } from '../EmployeeForm';

type EmployeeBankPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IEmployeeFormValue>;
  intl: InjectedIntl;
};

const EmployeeBankPartialForm: React.ComponentType<EmployeeBankPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.employee.section.bankTitle)}
    />
    <CardContent>
      <Field
        name="familyCardNumber"
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
            helperText={form.touched.familyCardNumber && form.errors.familyCardNumber}
            error={form.touched.familyCardNumber && Boolean(form.errors.familyCardNumber)}
          />
        )}
      />

      <Field
        name="citizenNumber"
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
            helperText={form.touched.citizenNumber && form.errors.citizenNumber}
            error={form.touched.citizenNumber && Boolean(form.errors.citizenNumber)}
          />
        )}
      />

      <Field
        name="taxNumber"
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
            helperText={form.touched.taxNumber && form.errors.taxNumber}
            error={form.touched.taxNumber && Boolean(form.errors.taxNumber)}
          />
        )}
      />

      <Field
        name="bpjsEmploymentNumber"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.bpjsEmploymentNumber && form.errors.bpjsEmploymentNumber}
            error={form.touched.bpjsEmploymentNumber && Boolean(form.errors.bpjsEmploymentNumber)}
          />
        )}
      />

      <Field
        name="bpjsHealthCareNumber"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.bpjsHealthCareNumber && form.errors.bpjsHealthCareNumber}
            error={form.touched.bpjsHealthCareNumber && Boolean(form.errors.bpjsHealthCareNumber)}
          />
        )}
      />

      <Field
        name="bankAccount"
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
            helperText={form.touched.bankAccount && form.errors.bankAccount}
            error={form.touched.bankAccount && Boolean(form.errors.bankAccount)}
          />
        )}
      />

      <Field
        name="bankAccountName"
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
            helperText={form.touched.bankAccountName && form.errors.bankAccountName}
            error={form.touched.bankAccountName && Boolean(form.errors.bankAccountName)}
          />
        )}
      />
      
      <Field
        name="bankAccountBranch"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.bankAccountBranch && form.errors.bankAccountBranch}
            error={form.touched.bankAccountBranch && Boolean(form.errors.bankAccountBranch)}
          />
        )}
      />
      
    </CardContent>
  </Card>
);

export default EmployeeBankPartialForm;