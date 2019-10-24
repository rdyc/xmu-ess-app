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
      title={props.intl.formatMessage(hrMessage.competency.field.responden)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<ICompetencyEmployeeFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.field.uid, {state: 'Assessment'})}
          />
        )}
      />

      <Field
        name="respondenUid"
        render={({ field, form }: FieldProps<ICompetencyEmployeeFormValue>) => (
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
                label: props.intl.formatMessage(hrMessage.competency.field.employee),
                placeholder: props.intl.formatMessage(hrMessage.competency.field.employee),
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
                label: props.intl.formatMessage(hrMessage.competency.field.company),
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
                label: props.intl.formatMessage(hrMessage.competency.field.position),
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
            label={props.intl.formatMessage(hrMessage.competency.field.year)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default CompetencyEmployeePartial;