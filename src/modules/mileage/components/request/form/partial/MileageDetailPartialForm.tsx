import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputMonthOption } from '@layout/components/input/month/InputMonthOption';
import { InputYearOption } from '@layout/components/input/year/InputYearOption';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IMileageFormValue } from '../MileageForm';

type MileageDetailPartialFormProps = {
  formikBag: FormikProps<IMileageFormValue>;
  intl: InjectedIntl;
};

const MileageDetailPartialForm: React.ComponentType<MileageDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(mileageMessage.request.field.submitTitle)}
    />
    <CardContent>
      
      <Field
        name="year"
        render={({ field, form }: FieldProps<IMileageFormValue>) => (
          <InputYearOption withPast>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(mileageMessage.request.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.year && form.errors.year,
                error: form.touched.year && Boolean(form.errors.year)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </InputYearOption>
        )}
      />

      <Field
        name="month"
        render={({ field, form }: FieldProps<IMileageFormValue>) => (
          <InputMonthOption>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(mileageMessage.request.fieldFor(field.name, 'fieldName')),
                required: true,
                helperText: form.touched.month && form.errors.month,
                error: form.touched.month && Boolean(form.errors.month)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => props.formikBag.setFieldValue(field.name, selected && selected.value || '')}
            />
          </InputMonthOption>
        )}
      />

    </CardContent>
  </Card>
);

export default MileageDetailPartialForm;