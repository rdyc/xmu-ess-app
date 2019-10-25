import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputSemesterOption } from '@layout/components/input/semester';
import { InputYearOption } from '@layout/components/input/year/InputYearOption';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ChevronLeft, ChevronRight } from '@material-ui/icons';
import { Field, FieldProps, FormikProps } from 'formik';
import { DatePicker } from 'material-ui-pickers';
import { Moment } from 'moment';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIOpenFormValue } from '../KPIOpenForm';

type KPIOpenDetailPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IKPIOpenFormValue>;
  intl: InjectedIntl;
};

const KPIOpenDetailPartialForm: React.ComponentType<KPIOpenDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(kpiMessage.open.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IKPIOpenFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            disabled={props.formikBag.isSubmitting}
            margin="normal"
            label={props.intl.formatMessage(kpiMessage.open.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="year"
        render={({ field, form }: FieldProps<IKPIOpenFormValue>) => (
          <InputYearOption withFuture>
            <SelectField
              isSearchable
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(kpiMessage.employee.field.year),
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
          name="period"
          render={({ field, form }: FieldProps<IKPIOpenFormValue>) => (
            <InputSemesterOption>
              <SelectField
                isSearchable
                menuPlacement="auto"
                menuPosition="fixed"
                isDisabled={props.formikBag.isSubmitting}
                isClearable={field.value !== ''}
                escapeClearsValue={true}
                valueString={field.value}
                textFieldProps={{
                  label: props.intl.formatMessage(kpiMessage.employee.field.period),
                  required: true,
                  helperText: form.touched.period && form.errors.period,
                  error: form.touched.period && Boolean(form.errors.period)
                }}
                onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
                onChange={(selected: ISelectFieldOption) => {
                  props.formikBag.setFieldValue(field.name, selected && selected.value || '');
                }}
              />
            </InputSemesterOption>
          )}
        />

      <Field
        name="date"
        render={({ field, form }: FieldProps<IKPIOpenFormValue>) => (
          <DatePicker
            {...field}
            fullWidth
            required={true}
            margin="normal"
            disabled={form.isSubmitting}
            showTodayButton
            label={props.intl.formatMessage(kpiMessage.open.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(kpiMessage.open.fieldFor(field.name, 'fieldName'))}
            leftArrowIcon={<ChevronLeft />}
            rightArrowIcon={<ChevronRight />}
            format="MMMM DD, YYYY"
            helperText={form.touched.date && form.errors.date}
            error={form.touched.date && Boolean(form.errors.date)}
            onChange={(moment: Moment) => props.formikBag.setFieldValue('date', moment.format('YYYY-MM-DD'))}
            invalidLabel=""
          />
        )}
      />
    </CardContent>
  </Card>
);

export default KPIOpenDetailPartialForm;