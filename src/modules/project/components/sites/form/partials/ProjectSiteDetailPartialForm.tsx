import { FormMode } from '@generic/types';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IProjectSiteFormValue } from '../ProjectSiteForm';

type ProjectSiteDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectSiteFormValue>;
  intl: InjectedIntl;
};

const ProjectSiteDetailPartialForm: React.ComponentType<ProjectSiteDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)} />
    <CardContent>
      <Field
        name="statusType"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
          render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="projectType"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="contractNumber"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="rate"
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectSiteFormValue>) => (
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

export default ProjectSiteDetailPartialForm;