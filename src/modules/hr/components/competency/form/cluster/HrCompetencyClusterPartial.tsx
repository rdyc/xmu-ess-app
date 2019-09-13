import { FormMode } from '@generic/types';
import { hrMessage } from '@hr/locales/messages/hrMessage';
// import { layoutMessage } from '@layout/locales/messages';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IClusterFormValue } from './HrCompetencyClusterForm';

type HrCompetencyClusterPartialProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IClusterFormValue>;
  intl: InjectedIntl;
};

const HrCompetencyClusterPartial: React.ComponentType<HrCompetencyClusterPartialProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(hrMessage.shared.section.infoTitle, {state: 'Cluster'})}
    />
    <CardContent>
      {/* <Field 
        name="uid"
        render={({ field}: FieldProps<IClusterFormValue>) => (
          <TextField 
            {...field}
            fullWidth
            disabled
            margin="normal"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'), {state: 'Cluster'})}
            helperText={props.formMode === FormMode.New && props.intl.formatMessage(layoutMessage.text.autoField)}
          />
        )}
      /> */}

      <Field
        name="name"
        render={({ field, form }: FieldProps<IClusterFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IClusterFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            multiline
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldName'))}
            placeholder={props.intl.formatMessage(hrMessage.competency.fieldFor(field.name, 'fieldPlaceholder'))}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}
          />
        )}
      />
      
    </CardContent>
  </Card>
);

export default HrCompetencyClusterPartial;