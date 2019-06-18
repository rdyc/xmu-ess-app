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

import { IProjectStatusFormValue } from '../ProjectStatusForm';

type ProjectStatusDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectStatusFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
  allowedStatusTypes?: string[];
};

const ProjectStatusDetailPartialForm: React.ComponentType<ProjectStatusDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)} />
    <CardContent>
      <Field
        name="statusType"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <CommonSystemOption category="status" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isClearable={true}
              escapeClearsValue={true}
              valueString={field.value}
              filterOption={option => {
                // filter options from allowed status types
                if (props.allowedStatusTypes) {
                  return props.allowedStatusTypes.findIndex(item => item === option.value) !== -1;
                } 

                return true;
              }}
              textFieldProps={{
                label: props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.statusType && form.errors.statusType,
                error: form.touched.statusType && Boolean(form.errors.statusType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.field.uid)}
            helperText={form.errors.projectUid}
            error={Boolean(form.errors.projectUid)}
          />
        )}
      />

      {
        props.formikBag.values.childProjectUid &&
        <Field
          name="childProjectUid"
          render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="projectType"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="contractNumber"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="rate"
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectStatusFormValue>) => (
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

export default ProjectStatusDetailPartialForm;