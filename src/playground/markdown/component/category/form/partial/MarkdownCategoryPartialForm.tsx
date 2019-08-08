import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IMarkdownCategoryFormValue } from '../MarkdownCategoryForm';

type MarkdownCategoryPartialFormProps = {
  formikBag: FormikProps<IMarkdownCategoryFormValue>;
  intl: InjectedIntl;
};

const MarkdownCategoryPartialForm: React.ComponentType<MarkdownCategoryPartialFormProps> = props => (
  <Card square>
    <CardHeader 
      title="Category Information"
    />
    <CardContent>

      <Field
        name="name"
        render={({ field, form }: FieldProps<IMarkdownCategoryFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={'name'}
            placeholder={'Type any name'}
            helperText={form.touched.name && form.errors.name}
            error={form.touched.name && Boolean(form.errors.name)}      
          />
        )}
      />

      <Field
        name="description"
        render={({ field, form }: FieldProps<IMarkdownCategoryFormValue>) => (
          <TextField
            {...field}
            fullWidth
            required
            disabled={form.isSubmitting}
            margin="normal"
            autoComplete="off"
            label={'description'}
            placeholder={'Type any description'}
            helperText={form.touched.description && form.errors.description}
            error={form.touched.description && Boolean(form.errors.description)}      
          />
        )}
      />

      <Field
        name="isActive"
        render={({ field }: FieldProps<IMarkdownCategoryFormValue>) => (
          <FormControlLabel
            label={'is active'}
            control={
              <Checkbox 
                {...field} 
                value={field.name}
                disabled={props.formikBag.isSubmitting} 
                checked={props.formikBag.values.isActive}
              />
            }
            style={{width: '100%'}}
          />
        )}
      />
    </CardContent>
  </Card>
);

export default MarkdownCategoryPartialForm;