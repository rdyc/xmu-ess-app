import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputYearDegreeOption } from '@layout/components/input/yearDegree/InputYearDegreeOption';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IExperienceFormValue } from '../ExperienceForm';

type ExperienceDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IExperienceFormValue>;
  intl: InjectedIntl;
};

const ExperienceDetailPartialForm: React.ComponentType<ExperienceDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Experience'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<IExperienceFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field 
        name="uid"
        render={({ field}: FieldProps<IExperienceFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="start"
        render={({ field, form }: FieldProps<IExperienceFormValue>) => (
          <InputYearDegreeOption>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.start && form.errors.start,
                error: form.touched.start && Boolean(form.errors.start)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('end', '');
              }}
            />
          </InputYearDegreeOption>
        )}
      />

      <Field
        name="end"
        render={({ field, form }: FieldProps<IExperienceFormValue>) => (
          <InputYearDegreeOption start={props.formikBag.values.start}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={!props.formikBag.values.start || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.end && form.errors.end,
                error: form.touched.end && Boolean(form.errors.end)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </InputYearDegreeOption>
        )}
      />

      <Field
        name="company"
        render={({ field, form }: FieldProps<IExperienceFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.company && form.errors.company}
            error={form.touched.company && Boolean(form.errors.company)}
          />
        )}
      />

      <Field
        name="position"
        render={({ field, form }: FieldProps<IExperienceFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.experience.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.position && form.errors.position}
            error={form.touched.position && Boolean(form.errors.position)}
          />
        )}
      />

    </CardContent>
  </Card>
);

export default ExperienceDetailPartialForm;