import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { IEmployeeLevelListFilter } from '@lookup/classes/filters';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupEmployeeLevelOption } from '@lookup/components/employeeLevel/option/LookupEmployeeLevelOption';
import { LookupPositionOption } from '@lookup/components/position/options/LookupPositionOption';
import { LookupRoleOption } from '@lookup/components/role/options/LookupRoleOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IAccessFormValue } from '../AccessForm';

type AccessDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IAccessFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
  filterDepartment?: ISystemListFilter;
  filterUnit?: ISystemListFilter;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterLookupLevel?: IEmployeeLevelListFilter;
  handleFilterUnit: (companyUid: string) => void;
  handleFilterDepartment: (companyUid: string, unitUid: string) => void;
};

const AccessDetailPartialForm: React.ComponentType<AccessDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Access'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<IAccessFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field 
        name="uid"
        render={({ field}: FieldProps<IAccessFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('roleUid', '');
                props.formikBag.setFieldValue('positionUid', '');
                props.formikBag.setFieldValue('unitType', '');
                props.formikBag.setFieldValue('departmentType', '');
                props.handleFilterUnit(selected && selected.value);
              }}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="roleUid"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <LookupRoleOption companyUid={props.formikBag.values.companyUid}>
            <SelectField
              isSearchable
              isDisabled={!props.formikBag.values.companyUid || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.roleUid && form.errors.roleUid,
                error: form.touched.roleUid && Boolean(form.errors.roleUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </LookupRoleOption>
        )}
      />

      <Field
        name="positionUid"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <LookupPositionOption companyUid={props.formikBag.values.companyUid}>
            <SelectField
              isSearchable
              isDisabled={!props.formikBag.values.companyUid || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName')),
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
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <LookupEmployeeLevelOption filter={props.filterLookupLevel}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.levelType && form.errors.levelType,
                error: form.touched.levelType && Boolean(form.errors.levelType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </LookupEmployeeLevelOption>
        )}
      />

      <Field
        name="unitType"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <CommonSystemOption category="unit" filter={props.filterUnit}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={!props.formikBag.values.companyUid || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName')),
                helperText: form.touched.unitType && form.errors.unitType,
                error: form.touched.unitType && Boolean(form.errors.unitType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('departmentType', '');
                props.handleFilterDepartment(props.formikBag.values.companyUid, selected && selected.value);
              }}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="departmentType"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <CommonSystemOption category="department" filter={props.filterDepartment}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={!props.formikBag.values.unitType || !props.formikBag.values.companyUid || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName')),
                helperText: form.touched.departmentType && form.errors.departmentType,
                error: form.touched.departmentType && Boolean(form.errors.departmentType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.start && form.errors.start}
            error={form.touched.start && Boolean(form.errors.start)}
            onChange={(moment: Moment) => {
              props.formikBag.setFieldValue('start', moment.format('YYYY-MM-DD'));
              props.formikBag.setFieldValue('end', '');
            }}
            invalidLabel=""
            disableFuture
          />
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<IAccessFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            margin="normal"
            clearable
            disabled={!props.formikBag.values.start || form.isSubmitting}
            label={props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.access.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.end && form.errors.end}
            error={form.touched.end && Boolean(form.errors.end)}
            onChange={(moment: Moment) => {
              moment ? props.formikBag.setFieldValue(field.name, moment.format('YYYY-MM-DD')) : 
              props.formikBag.setFieldValue(field.name, '');
            }}
            invalidLabel=""
            disablePast
            // minDate={props.formikBag.values.start}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default AccessDetailPartialForm;