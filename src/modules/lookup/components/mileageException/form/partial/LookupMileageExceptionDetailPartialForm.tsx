import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { ILookupCompanyGetListFilter } from '@lookup/classes/filters/company';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { LookupRoleOption } from '@lookup/components/role/options/LookupRoleOption';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { IProjectSiteGetRequest } from '@project/classes/queries/site';
import { ProjectOption } from '@project/components/options/project/ProjectOption';
import { ProjectSiteOption } from '@project/components/options/projectSite/ProjectSiteOption';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IMileageExceptionFormValue } from '../LookupMileageExceptionForm';

type LookupMileageExceptionDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IMileageExceptionFormValue>;
  intl: InjectedIntl;
  filterLookupCompany?: ILookupCompanyGetListFilter;
  filterCommonSystem?: ISystemListFilter;
  filterProject?: IProjectRegistrationGetListFilter;
  filterProjectSite?: IProjectSiteGetRequest;
  handleFilterProject: (companyUid?: string) => void;
  handleFilterProjectSite: (companyUid: string, projectUid?: string) => void;
};

const LookupMileageExceptionDetailPartialForm: React.ComponentType<LookupMileageExceptionDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(lookupMessage.mileageException.section.infoTitle)}
    />
    <CardContent>
      <Field 
        name="uid"
        render={({ field}: FieldProps<IMileageExceptionFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />
      
      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <LookupCompanyOption filter={props.filterLookupCompany}>
            <SelectField
              isSearchable
              // menuPlacement="auto"
              // menuPosition="fixed"
              isDisabled={props.formMode === FormMode.Edit || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('roleUid', '');
                props.formikBag.setFieldValue('projectUid', '');
                props.formikBag.setFieldValue('siteUid', '');
                props.handleFilterProject(selected && selected.value);
              }}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="roleUid"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <LookupRoleOption companyUid={props.formikBag.values.companyUid}>
            <SelectField
              isSearchable
              // menuPlacement="auto"
              // menuPosition="fixed"
              isDisabled={props.formMode === FormMode.Edit || props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName')),
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
        name="siteType"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <CommonSystemOption category="site" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              // menuPlacement="auto"
              // menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.siteType && form.errors.siteType,
                error: form.touched.siteType && Boolean(form.errors.siteType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <ProjectOption filter={props.filterProject}>
            <SelectField
              isSearchable
              // menuPlacement="auto"
              // menuPosition="fixed"
              isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.projectUid && form.errors.projectUid,
                error: form.touched.projectUid && Boolean(form.errors.projectUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.handleFilterProjectSite(props.formikBag.values.companyUid, selected && selected.value);
              }}
            />
          </ProjectOption>
        )}
      />
      
      <Field
        name="siteUid"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <ProjectSiteOption filter={props.filterProjectSite}>
            <SelectField
              isSearchable
              // menuPlacement="auto"
              // menuPosition="fixed"
              isDisabled={props.formikBag.values.companyUid === '' || props.formikBag.values.projectUid === '' || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.siteUid && form.errors.siteUid,
                error: form.touched.siteUid && Boolean(form.errors.siteUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </ProjectSiteOption>
        )}
      />

      <Field
        name="percentage"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.percentage && form.errors.percentage}
            error={form.touched.percentage && Boolean(form.errors.percentage)}
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
        name="description"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

      <Field
        name="reason"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.reason && form.errors.reason}
            error={form.touched.reason && Boolean(form.errors.reason)}
          />
        )}
      />

      <Field
        name="inactiveDate"
        render={({ field, form }: FieldProps<IMileageExceptionFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            margin="normal"
            clearable
            disabled={form.isSubmitting}
            // showTodayButton
            label={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(lookupMessage.mileageException.fieldFor(field.name, 'fieldPlaceholder'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.inactiveDate && form.errors.inactiveDate}
            error={form.touched.inactiveDate && Boolean(form.errors.inactiveDate)}
            onChange={(moment: Moment) => {
              moment ? props.formikBag.setFieldValue(field.name, moment.format('YYYY-MM-DD')) : 
              props.formikBag.setFieldValue(field.name, '');
            }}
            invalidLabel=""
          />
        )}
      />  

    </CardContent>
  </Card>
);

export default LookupMileageExceptionDetailPartialForm;