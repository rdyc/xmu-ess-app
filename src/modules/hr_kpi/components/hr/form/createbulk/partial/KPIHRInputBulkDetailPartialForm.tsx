import { FormMode } from '@generic/types';
import { IKPITemplateGetListFilter } from '@kpi/classes/filter';
import { KPITemplateOption } from '@kpi/components/template/options/KPITemplateOption';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIEmployeeBulkFormValue } from '../KPIHRInputBulkForm';

type KPIHRInputBulkDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IKPIEmployeeBulkFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterKPITemplate?: IKPITemplateGetListFilter;
  handleSetTemplateFilter: (companyUid: string, positionUid: string) => void;
  handleLoadTemplate: (companyUid: string, positionUid: string, templateUid: string) => void;
};

const KPIHRInputBulkDetailPartialForm: React.ComponentType<KPIHRInputBulkDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(kpiMessage.template.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IKPIEmployeeBulkFormValue>) => (
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
        render={({ field, form }: FieldProps<IKPIEmployeeBulkFormValue>) => {
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
        name="templateUid"
        render={({ field, form }: FieldProps<IKPIEmployeeBulkFormValue>) => {
          return (
            <KPITemplateOption filter={props.filterKPITemplate}>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.values.positionUid === '' || props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(kpiMessage.employee.field.templateUid),
                  required: true,
                  helperText: form.touched.templateUid && form.errors.templateUid,
                  error: form.touched.templateUid && Boolean(form.errors.templateUid)
                }}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(field.name, selected && selected.value || '');

                  if (props.formikBag.values.companyUid && props.formikBag.values.companyUid !== '' && 
                    props.formikBag.values.positionUid && props.formikBag.values.positionUid !== '' && 
                    selected && selected.value) {
                    props.handleLoadTemplate(props.formikBag.values.companyUid, props.formikBag.values.positionUid, selected.value);
                  }
                }}
              />
            </KPITemplateOption>
          );
        }}
      />

      <Field
        name="year"
        render={({ field, form }: FieldProps<IKPIEmployeeBulkFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.year)}
            placeholder={props.intl.formatMessage(kpiMessage.employee.field.year)}
            helperText={form.touched.year && form.errors.year}
            error={form.touched.year && Boolean(form.errors.year)}
            // InputProps={{
            //   inputComponent: NumberFormatter,
            // }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // set current field
              if (e.target.value === '') {
                props.formikBag.setFieldValue(field.name, parseFloat('0'));
              } else {
                props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
              }
            }}
          />
        )}
      />
      
      <Field
        name="period"
        render={({ field, form }: FieldProps<IKPIEmployeeBulkFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.employee.field.period)}
            placeholder={props.intl.formatMessage(kpiMessage.employee.field.period)}
            helperText={form.touched.period && form.errors.period}
            error={form.touched.period && Boolean(form.errors.period)}
            // InputProps={{
            //   inputComponent: NumberFormatter,
            // }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              // set current field
              if (e.target.value === '') {
                props.formikBag.setFieldValue(field.name, parseFloat('0'));
              } else {
                props.formikBag.setFieldValue(field.name, parseFloat(e.target.value));
              }
            }}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default KPIHRInputBulkDetailPartialForm;