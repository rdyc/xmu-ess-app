import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPITemplateFormValue } from '../KPITemplateForm';

type KPITemplateDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IKPITemplateFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
};

const KPITemplateDetailPartialForm: React.ComponentType<KPITemplateDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(kpiMessage.template.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IKPITemplateFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(kpiMessage.template.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
      
      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IKPITemplateFormValue>) => (
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
                label: props.intl.formatMessage(kpiMessage.template.field.companyUid),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('positionUid', '');
              }}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="positionUid"
        render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
          return (
            <LookupPositionOption companyUid={props.formikBag.values.companyUid}>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(kpiMessage.template.field.positionUid),
                  required: true,
                  helperText: form.touched.positionUid && form.errors.positionUid,
                  error: form.touched.positionUid && Boolean(form.errors.positionUid)
                }}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                }}
              />
            </LookupPositionOption>
          );
        }}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IKPITemplateFormValue>) => {
          return (
            <TextField
              {...field}
              fullWidth
              required
              disabled={form.isSubmitting}
              margin="normal"
              autoComplete="off"
              label={props.intl.formatMessage(kpiMessage.template.field.name)}
              placeholder={props.intl.formatMessage(kpiMessage.template.field.namePlaceholder)}
              helperText={form.touched.name && form.errors.name}
              error={form.touched.name && Boolean(form.errors.name)}
            />
          );
        }}
      />

      <Field
        name="totalWeight"
        render={({ field, form }: FieldProps<IKPITemplateFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(kpiMessage.template.field.totalWeight)}
            value={props.intl.formatNumber(field.value)}
            helperText={form.touched.totalWeight && form.errors.totalWeight}
            error={form.touched.totalWeight && Boolean(form.errors.totalWeight)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default KPITemplateDetailPartialForm;