import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { IProjectRegistrationGetListFilter } from '@project/classes/filters/registration';
import { ProjectOption } from '@project/components/options/project/ProjectOption';
import { projectMessage } from '@project/locales/messages/projectMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { IProjectAssignmentFormValue } from '../ProjectAssignmentForm';

type ProjectAssignmentDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IProjectAssignmentFormValue>;
  intl: InjectedIntl;
  filterProject?: IProjectRegistrationGetListFilter; 
  onChangeProject: (value?: ISelectFieldOption) => void;
};

const ProjectAssignmentDetailPartialForm: React.ComponentType<ProjectAssignmentDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(projectMessage.registration.section.infoTitle)} />
    <CardContent>
      {
        props.formMode === FormMode.New &&
        <ProjectOption filter={props.filterProject}>
          <SelectField
            autoFocus
            isSearchable
            escapeClearsValue={true} 
            menuPlacement="auto"
            menuPosition="fixed"
            textFieldProps={{
              label: props.intl.formatMessage(projectMessage.assignment.field.project),
              required: true
            }}
            onChange={props.onChangeProject}
          />
        </ProjectOption>
      }

      <Field
        name="uid"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.assignment.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="projectUid"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.assignment.field.projectUid)}
            helperText={form.errors.projectUid}
            error={Boolean(form.errors.projectUid)}
          />
        )}
      />

      <Field
        name="ownerEmployeeUid"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="customerUid"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="projectType"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="contractNumber"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
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
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={field.value !== '' ? props.intl.formatDate(field.value, GlobalFormat.Date) : field.value}
          />
        )}
      />

      <Field
        name="maxHours"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.registration.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
          />
        )}
      />

      <Field
        name="assignedHours"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.assignment.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
            helperText={form.errors.assignedHours}
            error={Boolean(form.errors.assignedHours)}
          />
        )}
      />

      <Field
        name="unassignedHours"
        render={({ field, form }: FieldProps<IProjectAssignmentFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            label={props.intl.formatMessage(projectMessage.assignment.fieldFor(field.name, 'fieldName'))}
            value={props.intl.formatNumber(field.value)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default ProjectAssignmentDetailPartialForm;