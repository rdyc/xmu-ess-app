import { ISystemListFilter } from '@common/classes/filters';
import { CommonSystemOption } from '@common/components/options/CommonSystemOption';
import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IHRMeasurementFormValue } from '../HRMeasurementForm';

type HRmeasurementDetailPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IHRMeasurementFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
};

const HRMeasurementDetailPartialForm: React.ComponentType<HRmeasurementDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(hrMessage.measurement.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IHRMeasurementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.measurement.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IHRMeasurementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(hrMessage.measurement.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(hrMessage.measurement.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />

      <Field
        name="measurementType"
        render={({ field, form }: FieldProps<IHRMeasurementFormValue>) => (
          <React.Fragment>
            <CommonSystemOption category="kPI" filter={props.filterCommonSystem}>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(hrMessage.measurement.fieldFor(field.name, 'fieldName')),
                  required: true,
                  helperText: form.touched.measurementType && form.errors.measurementType,
                  error: form.touched.measurementType && Boolean(form.errors.measurementType)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
              />
            </CommonSystemOption>
          </React.Fragment>
        )}
      />

      <Field
        name="weight"
        render={({ field, form }: FieldProps<IHRMeasurementFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            label={props.intl.formatMessage(hrMessage.measurement.fieldFor(field.name, 'fieldName'))}
            InputProps={{
              inputComponent: NumberFormatter
            }}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
              if (e.target.value === '') {
                // set current field
                props.formikBag.setFieldValue(field.name, 0);
              } else {
                const value = parseFloat(e.target.value);
                // set current field
                props.formikBag.setFieldValue(field.name, value);
              }
            }}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default HRMeasurementDetailPartialForm;