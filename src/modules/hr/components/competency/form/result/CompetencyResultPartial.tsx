import { AccountEmployeeMultipleOption } from '@account/components/options/AccountEmployeeMultipleOption';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICompetencyResultFormValue } from './CompetencyResultForm';

type CompetencyResultPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyResultFormValue>;
  intl: InjectedIntl;
  filterCompany?: ILookupCompanyGetListFilter;
};

const CompetencyResultPartial: React.ComponentType<CompetencyResultPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responden'})}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ICompetencyResultFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.field.uid, {state: 'Result'})}
          />
        )}
      />

      <Field
        name="respondenUid"
        render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => (
          <AccountEmployeeMultipleOption companyUid={props.formikBag.values.companyUid} positoinUid={props.formikBag.values.positionUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isClearable={field.value !== ''}
              isDisabled={props.formikBag.values.positionUid === '' || props.formikBag.isSubmitting || props.formMode === FormMode.Edit}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}),
                placeholder: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Employee'}),
                required: true,
                helperText: form.touched.respondenUid && form.errors.respondenUid,
                error: form.touched.respondenUid && Boolean(form.errors.respondenUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </AccountEmployeeMultipleOption>
        )}
      />
      
      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => (
          <LookupCompanyOption filter={props.filterCompany}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Company'}),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="positionUid"
        render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => (
          <LookupPositionOption companyUid={props.formikBag.values.companyUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'}),
                required: true,
                helperText: form.touched.positionUid && form.errors.positionUid,
                error: form.touched.positionUid && Boolean(form.errors.positionUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
            />
          </LookupPositionOption>
        )}
      />

      <Field
        name="year"
        render={({ field, form }: FieldProps<ICompetencyResultFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Year'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default CompetencyResultPartial;