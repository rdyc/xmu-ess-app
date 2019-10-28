import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { DefintionJobOption } from '@webjob/components/definition/options/DefinitionJobOption';
import { DefinitionOption } from '@webjob/components/definition/options/DefinitionOption';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IWebJobRecurringFormValue } from './WebJobRecurringForm';

type WebJobRecurringPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IWebJobRecurringFormValue>;
  intl: InjectedIntl;
};

const WebJobRecurringPartial: React.ComponentType<WebJobRecurringPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(webJobMessage.shared.section.infoTitle, {state: 'Recurring'})}
    />
    <CardContent>
      <Field
        name="uid"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(webJobMessage.recurring.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(webJobMessage.recurring.field.name)}
            placeholder={props.intl.formatMessage(webJobMessage.recurring.field.name)}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(webJobMessage.recurring.field.description)}
            placeholder={props.intl.formatMessage(webJobMessage.recurring.field.description)}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

      <Field
        name="definitionUid"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <DefinitionOption>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(webJobMessage.recurring.field.definition),
                required: true,
                helperText: form.touched.definitionUid && form.errors.definitionUid,
                error: form.touched.definitionUid && Boolean(form.errors.definitionUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                props.formikBag.setFieldValue('jobUid', '');
              }}
            />
          </DefinitionOption>
        )}
      />

      <Field
        name="jobUid"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <DefintionJobOption definitionUid={props.formikBag.values.definitionUid}>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.values.definitionUid === '' || props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(webJobMessage.recurring.field.job),
                required: true,
                helperText: form.touched.jobUid && form.errors.jobUid,
                error: form.touched.jobUid && Boolean(form.errors.jobUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </DefintionJobOption>
        )}
      />

      <Field
        name="cronExpression"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(webJobMessage.recurring.field.expression)}
            placeholder={props.intl.formatMessage(webJobMessage.recurring.field.expression)}
            helperText={form.touched.cronExpression && form.errors.cronExpression}
            error={form.touched.cronExpression && Boolean(form.errors.cronExpression)}
          />
        )}
      />

      <Field
        name="isAutoStart"
        render={({ field, form }: FieldProps<IWebJobRecurringFormValue>) => (
          <FormControlLabel
            label={props.intl.formatMessage(webJobMessage.recurring.field.isAutoStart)}
            control={
              <Checkbox 
                {...field}
                required
                value={field.name}
                disabled={props.formikBag.isSubmitting} 
                checked={props.formikBag.values.isAutoStart}
              />
            }
            style={{width: '100%'}}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default WebJobRecurringPartial;