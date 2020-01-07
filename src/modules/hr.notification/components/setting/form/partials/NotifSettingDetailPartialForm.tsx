import { FormMode } from '@generic/types';
import { NotifTemplateOption } from '@hr.notification/components/template/options';
import { notifMessage } from '@hr.notification/locales/messages/notifMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { LookupCompanyOption } from '@lookup/components/company/options/LookupCompanyOption';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { NotifSettingOption } from '../../options';
import { INotifSettingFormValue } from '../NotifSettingForm';

type NotifSettingPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<INotifSettingFormValue>;
  intl: InjectedIntl;
};

const NotifSettingDetailPartialForm: React.ComponentType<NotifSettingPartialFormProps> = props => (
  <Card square>
    <CardHeader title={props.intl.formatMessage(notifMessage.setting.section.infoTitle)} />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<INotifSettingFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(notifMessage.setting.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="companyUid"
        render={({ field, form }: FieldProps<INotifSettingFormValue>) => (
          <LookupCompanyOption filter={{orderBy: 'name', direction: 'ascending'}}>
            <SelectField  
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={form.isSubmitting}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(notifMessage.setting.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.companyUid && form.errors.companyUid,
                error: form.touched.companyUid && Boolean(form.errors.companyUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </LookupCompanyOption>
        )}
      />

      <Field
        name="class"
        render={({ field, form }: FieldProps<INotifSettingFormValue>) => (
          <NotifSettingOption>
            <SelectField  
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={form.isSubmitting}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(notifMessage.setting.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.class && form.errors.class,
                error: form.touched.class && Boolean(form.errors.class)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </NotifSettingOption>
        )}
      />

      <Field
        name="templateUid"
        render={({ field, form }: FieldProps<INotifSettingFormValue>) => (
          <NotifTemplateOption filter={{orderBy: 'name', direction: 'ascending'}}>
            <SelectField  
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={form.isSubmitting}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(notifMessage.setting.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.templateUid && form.errors.templateUid,
                error: form.touched.templateUid && Boolean(form.errors.templateUid)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </NotifTemplateOption>
        )}
      />

      <Field
        name="subject"
        render={({ field, form }: FieldProps<INotifSettingFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required={true}
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(notifMessage.setting.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(notifMessage.setting.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.subject && form.errors.subject}
            error={form.touched.subject && Boolean(form.errors.subject)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default NotifSettingDetailPartialForm;