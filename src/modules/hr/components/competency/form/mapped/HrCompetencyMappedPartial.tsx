import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { IHrCompetencyClusterGetListFilter } from '@hr/classes/filters';
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
import { IMappedFormValue } from './HrCompetencyMappedForm';

type HrCompetencyMappedPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IMappedFormValue>;
  intl: InjectedIntl;
  filterCluster?: IHrCompetencyClusterGetListFilter;
  filterCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
};

const HrCompetencyMappedPartial: React.ComponentType<HrCompetencyMappedPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Mapped'})}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IMappedFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'), {state: 'Mapped'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IMappedFormValue>) => (
          <LookupCompanyOption filter={props.filterCompany}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
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
        render={({ field, form }: FieldProps<IMappedFormValue>) => (
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
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Position'}),
                required: true,
                helperText: form.touched.positionUid && form.errors.positionUid,
                error: form.touched.positionUid && Boolean(form.errors.positionUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </LookupPositionOption>
        )}
      />

      <Field
        name="levelType"
        render={({ field, form }: FieldProps<IMappedFormValue>) => (
          <CommonSystemOption category="level" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(hrMessage.competency.field.type, {state: 'Level'}),
                required: true,
                helperText: form.touched.levelType && form.errors.levelType,
                error: form.touched.levelType && Boolean(form.errors.levelType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </CommonSystemOption>
        )}
      />
    </CardContent>
  </Card>
);

export default HrCompetencyMappedPartial;