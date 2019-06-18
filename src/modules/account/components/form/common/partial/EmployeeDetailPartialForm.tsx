import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IEmployeeFormValue } from '../EmployeeForm';

type EmployeeDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IEmployeeFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
};

const EmployeeDetailPartialForm: React.ComponentType<EmployeeDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.employee.section.basicTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IEmployeeFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
      
      <Field
        name="employmentNumber"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.employmentNumber && form.errors.employmentNumber}
            error={form.touched.employmentNumber && Boolean(form.errors.employmentNumber)}
          />
        )}
      />

      <Field
        name="fullName"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.fullName && form.errors.fullName}
            error={form.touched.fullName && Boolean(form.errors.fullName)}
          />
        )}
      />

      <Field
        name="genderType"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <CommonSystemOption category="gender" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName')),
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
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.birthPlace && form.errors.birthPlace}
            error={form.touched.birthPlace && Boolean(form.errors.birthPlace)}
          />
        )}
      />

      <Field
        name="dateOfBirth"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <TextField
            {...field}
            type="date"
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.dateOfBirth && form.errors.dateOfBirth}
            error={form.touched.dateOfBirth && Boolean(form.errors.dateOfBirth)}
            InputLabelProps={{
              shrink: true
            }}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName')),
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
        name="employmentType"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <CommonSystemOption category="employment" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.employmentType && form.errors.employmentType,
                error: form.touched.employmentType && Boolean(form.errors.employmentType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="joinDate"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.joinDate && form.errors.joinDate}
            error={form.touched.joinDate && Boolean(form.errors.joinDate)}
            onChange={(moment: Moment) => {
              props.formikBag.setFieldValue('joinDate', moment.format('YYYY-MM-DD'));
            }}
            disableFuture
            invalidLabel=""
          />
        )}
      />

      <Field
        name="inactiveDate"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            margin="normal"
            clearable
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.inactiveDate && form.errors.inactiveDate}
            error={form.touched.inactiveDate && Boolean(form.errors.inactiveDate)}
            onChange={(moment: Moment) => {
              moment ? props.formikBag.setFieldValue(field.name, moment.format('YYYY-MM-DD')) : 
              props.formikBag.setFieldValue(field.name, '');
            }}
            disablePast
            invalidLabel=""
          />
        )}
      />  

      <Field
        name="taxType"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <CommonSystemOption category="tax" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.taxType && form.errors.taxType,
                error: form.touched.taxType && Boolean(form.errors.taxType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="bloodType"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <CommonSystemOption category="blood" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName')),
                helperText: form.touched.bloodType && form.errors.bloodType,
                error: form.touched.bloodType && Boolean(form.errors.bloodType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />
  
      <Field
        name="religionType"
        render={({ field, form }: FieldProps<IEmployeeFormValue>) => (
          <CommonSystemOption category="religion" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.employee.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.religionType && form.errors.religionType,
                error: form.touched.religionType && Boolean(form.errors.religionType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

    </CardContent>
  </Card>
);

export default EmployeeDetailPartialForm;