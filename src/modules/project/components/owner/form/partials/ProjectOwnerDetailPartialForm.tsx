import { IEmployeeListFilter } from '@account/classes/filters';
import { AccountEmployeeOption } from '@account/components/options/AccountEmployeeOption';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IProjectOwnerFormValue } from '../ProjectOwnerForm';

type ProjectDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectOwnerFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
  filterAccountEmployee?: IEmployeeListFilter;
  allowedProjectTypes?: string[];
};

const ProjectOwnerDetailPartialForm: React.ComponentType<ProjectDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      {
        props.formikBag.values.childProjectUid &&
        <Field
          name="childProjectUid"
          render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              {...field}
              label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            />
          )}
        />
      }

      <Field
        name="ownerEmployeeUid"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <AccountEmployeeOption filter={props.filterAccountEmployee}>
            <SelectField
              autoFocus
              isSearchable
              isClearable={true}
              isDisabled={props.formikBag.isSubmitting}
              escapeClearsValue={true} 
              menuPlacement="auto"
              menuPosition="fixed"
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(projectMessage.registration.field.ownerEmployeeUid),
                placeholder: props.intl.formatMessage(projectMessage.registration.fieldFor('ownerEmployeeUid', 'fieldPlaceholder')),
                required: true,
                helperText: form.touched.ownerEmployeeUid && form.errors.ownerEmployeeUid,
                error: form.touched.ownerEmployeeUid && Boolean(form.errors.ownerEmployeeUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </AccountEmployeeOption>
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="projectType"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <CommonSystemOption category="project" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isClearable={true}
              isDisabled={props.formikBag.isSubmitting}
              escapeClearsValue={true}
              valueString={field.value}
              filterOption={option => {
                // filter options from allowed project types
                if (props.allowedProjectTypes) {
                  return props.allowedProjectTypes.findIndex(item => item === option.value) !== -1;
                } 

                return true;
              }}
              textFieldProps={{
                label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.projectType && form.errors.projectType,
                error: form.touched.projectType && Boolean(form.errors.projectType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="contractNumber"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={field.value !== '' ? props.intl.formatDate(field.value, GlobalFormat.Date) : field.value}
          />
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={field.value !== '' ? props.intl.formatDate(field.value, GlobalFormat.Date) : field.value}
          />
        )}
      />

      <Field
        name="currencyType"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="rate"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
          />
        )}
      />

      <Field
        name="valueUsd"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
          />
        )}
      />

      <Field
        name="valueIdr"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
          />
        )}
      />

      <Field
        name="maxHours"
        render={({ field, form }: FieldProps<IProjectOwnerFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default ProjectOwnerDetailPartialForm;