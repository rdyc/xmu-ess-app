import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IFamilyFormValue } from '../FamilyForm';

type FamilyDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IFamilyFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
};

const FamilyDetailPartialForm: React.ComponentType<FamilyDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Family'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<IFamilyFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field 
        name="uid"
        render={({ field}: FieldProps<IFamilyFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="familyType"
        render={({ field, form }: FieldProps<IFamilyFormValue>) => (
          <CommonSystemOption category="family" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.familyType && form.errors.familyType,
                error: form.touched.familyType && Boolean(form.errors.familyType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="fullName"
        render={({ field, form }: FieldProps<IFamilyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.fullName && form.errors.fullName}
            error={form.touched.fullName && Boolean(form.errors.fullName)}
          />
        )}
      />

      <Field
        name="genderType"
        render={({ field, form }: FieldProps<IFamilyFormValue>) => (
          <CommonSystemOption category="gender" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.genderType && form.errors.genderType,
                error: form.touched.genderType && Boolean(form.errors.genderType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="birthPlace"
        render={({ field, form }: FieldProps<IFamilyFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.birthPlace && form.errors.birthPlace}
            error={form.touched.birthPlace && Boolean(form.errors.birthPlace)}
          />
        )}
      />

      <Field
        name="birthDate"
        render={({ field, form }: FieldProps<IFamilyFormValue>) => (
          <TextField
            {...field}
            type="date"
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.family.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.birthDate && form.errors.birthDate}
            error={form.touched.birthDate && Boolean(form.errors.birthDate)}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default FamilyDetailPartialForm;