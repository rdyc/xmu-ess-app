import { TextField } from '@material-ui/core';
import { webJobMessage } from '@webjob/locales/messages/webJobMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IRecurringTriggerFormValue } from './RecurringTriggerForm';

type RecurringTriggerPartialProps = {
  formikBag: FormikProps<IRecurringTriggerFormValue>;
  intl: InjectedIntl;
};

const RecurringTriggerPartial: React.ComponentType<RecurringTriggerPartialProps> = props => (
  <React.Fragment>
    <Field
        name="jobUid"
        render={({ field, form }: FieldProps<IRecurringTriggerFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            multiline
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(webJobMessage.recurring.field.job)}
            placeholder={props.intl.formatMessage(webJobMessage.recurring.field.job)}
            helperText={form.touched.jobUid && form.errors.jobUid}
            error={form.touched.jobUid && Boolean(form.errors.jobUid)}
          />
        )}
      />

      {/* <Field
        name="jobUid"
        render={({ field, form }: FieldProps<IRecurringTriggerFormValue>) => (
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
      /> */}
  </React.Fragment>
);

export default RecurringTriggerPartial;