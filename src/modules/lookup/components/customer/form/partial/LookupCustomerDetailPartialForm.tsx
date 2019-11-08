import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICustomerFormValue } from '../LookupCustomerForm';

type LookupCustomerDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICustomerFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
};

const LookupCustomerDetailPartialForm: React.ComponentType<LookupCustomerDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.customer.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ICustomerFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formMode === FormMode.Edit || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            required={true}
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="npwp"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.npwp && form.errors.npwp}
            error={form.touched.npwp && Boolean(form.errors.npwp)}
          />
        )}
      />

      <Field
        name="address"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            multiline
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.address && form.errors.address}
            error={form.touched.address && Boolean(form.errors.address)}
          />
        )}
      />

      <Field
        name="addressAdditional"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            multiline
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.addressAdditional && form.errors.addressAdditional}
            error={form.touched.addressAdditional && Boolean(form.errors.addressAdditional)}
          />
        )}
      />

      <Field
        name="phone"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.phone && form.errors.phone}
            error={form.touched.phone && Boolean(form.errors.phone)}
          />
        )}
      />

      <Field
        name="phoneAdditional"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.phoneAdditional && form.errors.phoneAdditional}
            error={form.touched.phoneAdditional && Boolean(form.errors.phoneAdditional)}
          />
        )}
      />

      <Field
        name="mobile"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.mobile && form.errors.mobile}
            error={form.touched.mobile && Boolean(form.errors.mobile)}
          />
        )}
      />

      <Field
        name="mobileAdditional"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.mobileAdditional && form.errors.mobileAdditional}
            error={form.touched.mobileAdditional && Boolean(form.errors.mobileAdditional)}
          />
        )}
      />

      <Field
        name="fax"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            multiline
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.fax && form.errors.fax}
            error={form.touched.fax && Boolean(form.errors.fax)}
          />
        )}
      />

      <Field
        name="emailAddress"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.emailAddress && form.errors.emailAddress}
            error={form.touched.emailAddress && Boolean(form.errors.emailAddress)}
          />
        )}
      />

      <Field
        name="contactPerson"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.contactPerson && form.errors.contactPerson}
            error={form.touched.contactPerson && Boolean(form.errors.contactPerson)}
          />
        )}
      />

      <Field
        name="contactTitle"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.contactTitle && form.errors.contactTitle}
            error={form.touched.contactTitle && Boolean(form.errors.contactTitle)}
          />
        )}
      />

      <Field
        name="contactPersonAdditional"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.contactPersonAdditional && form.errors.contactPersonAdditional}
            error={form.touched.contactPersonAdditional && Boolean(form.errors.contactPersonAdditional)}
          />
        )}
      />

      <Field
        name="contactTitleAdditional"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.contactTitleAdditional && form.errors.contactTitleAdditional}
            error={form.touched.contactTitleAdditional && Boolean(form.errors.contactTitleAdditional)}
          />
        )}
      />

      <Field
        name="isActive"
        render={({ field, form }: FieldProps<ICustomerFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(lookupMessage.customer.fieldFor(field.name, 'fieldName'))}
            control={
              <Checkbox 
                {...field} 
                value={field.name}
                disabled={props.formikBag.isSubmitting} 
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

export default LookupCustomerDetailPartialForm;