import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { ILeaveFormValue } from '../LookupLeaveForm';

type LookupLeaveDetailPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<ILeaveFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
};

const LookupLeaveDetailPartialForm: React.ComponentType<LookupLeaveDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(lookupMessage.leave.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<ILeaveFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<ILeaveFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName')),
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
        name="categoryType"
        render={({ field, form }: FieldProps<ILeaveFormValue>) => (
          <CommonSystemOption category="leave" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.categoryType && form.errors.categoryType,
                error: form.touched.categoryType && Boolean(form.errors.categoryType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="year"
        render={({ field, form }: FieldProps<ILeaveFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.year && form.errors.year}
            error={form.touched.year && Boolean(form.errors.year)}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
              }
            }}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<ILeaveFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            required={true}
            label={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="allocation"
        render={({ field, form }: FieldProps<ILeaveFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.allocation && form.errors.allocation}
            error={form.touched.allocation && Boolean(form.errors.allocation)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
              }
            }}
          />
        )}
      />

      <Field
        name="isWithinHoliday"
        render={({ field, form }: FieldProps<ILeaveFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(lookupMessage.leave.fieldFor(field.name, 'fieldName'))}
            control={
              <Checkbox
                {...field}
                value={field.value}
                checked={props.formikBag.values.isWithinHoliday}
              />
            }
            style={{ width: '100%' }}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default LookupLeaveDetailPartialForm;