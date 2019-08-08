import { ISystemListFilter } from '@common/classes/filters';
import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { layoutMessage } from '@layout/locales/messages';
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
            {...field}
            fullWidth
            disabled
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
    </CardContent>
  </Card>
);

export default KPICategoryDetailPartialForm;