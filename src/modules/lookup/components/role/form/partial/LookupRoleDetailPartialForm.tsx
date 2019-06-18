import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
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
import { IRoleFormValue } from '../LookupRoleForm';

type LookupRoleDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IRoleFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
};

const LookupRoleDetailPartialForm: React.ComponentType<LookupRoleDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.role.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IRoleFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IRoleFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              // menuPlacement="auto"
              // menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldName')),
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
        name="gradeType"
        render={({ field, form }: FieldProps<IRoleFormValue>) => (
          <CommonSystemOption category="grade" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldName')),
                helperText: form.touched.gradeType && form.errors.gradeType,
                error: form.touched.gradeType && Boolean(form.errors.gradeType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IRoleFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IRoleFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

      <Field
        name="isActive"
        render={({ field, form }: FieldProps<IRoleFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(lookupMessage.role.fieldFor(field.name, 'fieldName'))}
            control={
              <Checkbox 
                {...field}
                required={true}
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

export default LookupRoleDetailPartialForm;