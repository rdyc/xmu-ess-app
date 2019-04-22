import { accountMessage } from '@account/locales/messages/accountMessage';
import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputYearDegreeOption } from '@layout/components/input/yearDegree/InputYearDegreeOption';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IEducationFormValue } from '../EducationForm';

type EducationDetailPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IEducationFormValue>;
  intl: InjectedIntl;
  filterCommonSystem?: ISystemListFilter;
};

const EducationDetailPartialForm: React.ComponentType<EducationDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(accountMessage.shared.section.infoTitle, { state: 'Education'})}
    />
    <CardContent>
      <Field 
        name="employeeUid"
        render={({ field}: FieldProps<IEducationFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName'))}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field 
        name="uid"
        render={({ field}: FieldProps<IEducationFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName'))}
          />
        )}
      />

      <Field
        name="degreeType"
        render={({ field, form }: FieldProps<IEducationFormValue>) => (
          <CommonSystemOption category="degree" filter={props.filterCommonSystem}>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.degreeType && form.errors.degreeType,
                error: form.touched.degreeType && Boolean(form.errors.degreeType)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </CommonSystemOption>
        )}
      />
 
      <Field
        name="start"
        render={({ field, form }: FieldProps<IEducationFormValue>) => (
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
                label: props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName')),
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
        render={({ field, form }: FieldProps<IEducationFormValue>) => (
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
                label: props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName')),
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
        name="institution"
        render={({ field, form }: FieldProps<IEducationFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.institution && form.errors.institution}
            error={form.touched.institution && Boolean(form.errors.institution)}
          />
        )}
      />

      <Field
        name="major"
        render={({ field, form }: FieldProps<IEducationFormValue>) => (
          <TextField
            {...field}
            fullWidth={true}
            disabled={form.isSubmitting}
            required={true}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(accountMessage.education.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.major && form.errors.major}
            error={form.touched.major && Boolean(form.errors.major)}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default EducationDetailPartialForm;