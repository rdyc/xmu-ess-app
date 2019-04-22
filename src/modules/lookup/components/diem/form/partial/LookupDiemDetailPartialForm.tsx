import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ICurrencyListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupCurrencyOption } from '@lookup/components/currency/options/LookupCurrencyOption';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IDiemFormValue } from '../LookupDiemForm';

type LookupDiemDetailPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IDiemFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterLookupCurrency?: ICurrencyListFilter;
};

const LookupDiemDetailPartialForm: React.ComponentType<LookupDiemDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(lookupMessage.lookupDiem.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IDiemFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IDiemFormValue>) => (
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
                label: props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldName')),
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
        name="currencyUid"
        render={({ field, form }: FieldProps<IDiemFormValue>) => (
          <LookupCurrencyOption filter={props.filterLookupCurrency}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.currencyUid && form.errors.currencyUid,
                error: form.touched.currencyUid && Boolean(form.errors.currencyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </LookupCurrencyOption>
        )}
      />

      <Field
        name="projectType"
        render={({ field, form }: FieldProps<IDiemFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="project" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.projectType && form.errors.projectType,
                  error: form.touched.projectType && Boolean(form.errors.projectType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="destinationType"
        render={({ field, form }: FieldProps<IDiemFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="destination" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.destinationType && form.errors.destinationType,
                  error: form.touched.destinationType && Boolean(form.errors.destinationType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="value"
        render={({ field, form }: FieldProps<IDiemFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.lookupDiem.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.value && form.errors.value}
            error={form.touched.value && Boolean(form.errors.value)}
            InputProps={{
              inputComponent: NumberFormatter,
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                const value = parseFloat(e.target.value);

                // set current field
                props.formikBag.setFieldValue(field.name, value);
              }
            }}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default LookupDiemDetailPartialForm;