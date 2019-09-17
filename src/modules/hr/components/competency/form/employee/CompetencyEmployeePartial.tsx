import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { ICompetencyEmployeeFormValue } from './CompetencyEmployeeForm';

type CompetencyEmployeePartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<ICompetencyEmployeeFormValue>;
  intl: InjectedIntl;
  filterCompany?: ILookupCompanyGetListFilter;
};

const CompetencyEmployeePartial: React.ComponentType<CompetencyEmployeePartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responden'})}
    />
    <CardContent>
      <Field 
        name="respondenUid"
        render={({ field}: FieldProps<ICompetencyEmployeeFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Responden'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
      
      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<ICompetencyEmployeeFormValue>) => (
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
        render={({ field, form }: FieldProps<ICompetencyEmployeeFormValue>) => (
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
        render={({ field, form }: FieldProps<ICompetencyEmployeeFormValue>) => (
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

export default CompetencyEmployeePartial;