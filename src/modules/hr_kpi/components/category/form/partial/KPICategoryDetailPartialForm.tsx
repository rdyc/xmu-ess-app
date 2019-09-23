import { ISystemListFilter } from '@common/classes/filters';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { ISelectFieldOption, SelectField } from '@layout/components/fields/SelectField';
import { InputCategoryGroupOption } from '@layout/components/input/categoryGroup';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPICategoryFormValue } from '../KPICategoryForm';

type KPIcategoryDetailPartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IKPICategoryFormValue>;
  intl: InjectedIntl;
  filterCommonSystem: ISystemListFilter;
};

const KPICategoryDetailPartialForm: React.ComponentType<KPIcategoryDetailPartialFormProps> = props => (
  <Card square>
    <CardHeader
      title={props.intl.formatMessage(kpiMessage.category.section.infoTitle)}
    />
    <CardContent>
      <Field
        name="uid"
        render={({ field }: FieldProps<IKPICategoryFormValue>) => (
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            {...field}
            disabled={props.formikBag.isSubmitting}
            margin="normal"
            label={props.intl.formatMessage(kpiMessage.category.field.uid)}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      />

      <Field
        name="name"
        render={({ field, form }: FieldProps<IKPICategoryFormValue>) => (
          <TextField
            {...field}
            fullWidth
            margin="normal"
            autoComplete="off"
            disabled={form.isSubmitting}
            label={props.intl.formatMessage(kpiMessage.category.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(kpiMessage.category.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="group"
        render={({ field, form }: FieldProps<IKPICategoryFormValue>) => (
          <InputCategoryGroupOption>
            <SelectField
              isSearchable
              menuPlacement="auto"
              menuPosition="fixed"
              isDisabled={props.formikBag.isSubmitting}
              isClearable={field.value !== ''}
              escapeClearsValue={true}
              valueString={field.value}
              textFieldProps={{
                label: props.intl.formatMessage(kpiMessage.category.field.group),
                required: true,
                helperText: form.touched.group && form.errors.group,
                error: form.touched.group && Boolean(form.errors.group)
              }}
              onMenuClose={() => props.formikBag.setFieldTouched(field.name)}
              onChange={(selected: ISelectFieldOption) => {
                props.formikBag.setFieldValue(field.name, selected && selected.value || '');
              }}
            />
          </InputCategoryGroupOption>
        )}
      />
    </CardContent>
  </Card>
);

export default KPICategoryDetailPartialForm;