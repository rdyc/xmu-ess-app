import { Button, Divider, TextField } from '@material-ui/core';
import { ArrayHelpers, Field, FieldArray, FieldProps, Form, Formik, FormikActions, FormikProps, getIn } from 'formik';
import * as React from 'react';
import * as Yup from 'yup';

export interface ISectionField<T> {
  key: keyof T;
  component?: React.ReactNode;
}

export interface ISectionForm<T> {
  title: string;
  isArray?: boolean;
  fields: ISectionField<T>[];
}

export interface IForm<T> {
  sections: ISectionForm<T>[];
  validationSchema?: Yup.ObjectSchema<Yup.Shape<{}, Partial<T>>>;
  onSubmit?: () => void;
  onReset?: () => void;
}

export const schemaForm: IForm<MyFormValues> = {
  sections: [
    {
      title: 'Basic',
      fields: [
        {
          key: 'firstName'
        },
        {
          key: 'lastName'
        }
      ]
    },
    {
      title: 'Items',
      isArray: true,
      fields: [
        {
          key: 'items',
        }
      ]
    }
  ]
};

interface MyFormItems {
  type: string;
}

interface MyFormValues {
  firstName: string;
  lastName: string;
  items?: MyFormItems[];
}

const validationSchema = Yup.object().shape<Partial<MyFormValues>>({
  firstName: Yup.string()
    .min(2, 'Too Short!')
    .max(50, 'Too Long!')
    .required('Required'),

  items: Yup.array()
    .of(
      Yup.object().shape({
        type: Yup.string()
          .min(4, 'too short')
          .required('Required')
      })
    )
    .required('Must have friends')
    .min(3, 'Minimum of 3 friends')

  // lastName: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),

  // email: Yup.string()
  //   .email('Invalid email')
  //   .required('Required'),
});

export const SimpleForm: React.SFC<{}> = () => {
  return (
    <div>
      <h1>My Example</h1>
      <Formik 
        initialValues={{ firstName: '', lastName: '', items: undefined }}
        validationSchema={validationSchema}
        onSubmit={(values: MyFormValues, actions: FormikActions<MyFormValues>) => {
          // alert(JSON.stringify(values, null, 2));

          setTimeout(() => {
            actions.setSubmitting(false);
            actions.setFieldError('firstName', 'das dasdas');
            actions.setFieldError('items[1].type', 'semprul...!');
            
            console.log({ values, actions });
          },         1000);
         }}
        render={(formikBag: FormikProps<MyFormValues>) => (
          <Form>
            <Field
              name="firstName"
              render={({ field, form }: FieldProps<MyFormValues>) => (
                <TextField
                  {...field}
                  fullWidth={true}
                  margin="normal"
                  label="First Name"
                  required={true}
                  placeholder={'The name'}
                  disabled={form.isSubmitting}
                  helperText={form.touched.firstName && form.errors.firstName}
                  error={form.touched.firstName && Boolean(form.errors.firstName)}
                />
              )}
            />

            <FieldArray
              name="items"
              render={(arrayHelper: ArrayHelpers) => (
                <React.Fragment>
                  {
                    formikBag.values.items &&
                    formikBag.values.items.length > 0 &&
                    formikBag.values.items.map((item, index) => 
                      <Field
                        key={index}
                        name={`items.${index}.type`}
                        render={({ field, form }: FieldProps<MyFormValues>) => {
                          const error = getIn(form.errors, `items.${index}.type`);
                          const touch = getIn(form.touched, `items.${index}.type`);
                          
                          return (
                            <React.Fragment>
                              <TextField
                                {...field}
                                fullWidth={true}
                                margin="normal"
                                label="Type"
                                required={true}
                                placeholder={'The type'}
                                disabled={form.isSubmitting}
                                helperText={touch && error}
                                error={touch && Boolean(error)}
                              />

                              <Button onClick={() => arrayHelper.remove(index)}>Remove</Button>
                            </React.Fragment>
                          );
                      }}
                      />
                    )
                  }
                  
                  <Divider />
                  
                  <Button onClick={() => arrayHelper.push({ type: '' })}>Add</Button>      
                </React.Fragment>
              )}
            />

            {
              formikBag.submitCount > 0 &&
              typeof formikBag.errors.items === 'string' &&
              <div>{formikBag.errors.items}</div>
            }

            <Button
              type="reset"
              variant="contained"
              color="secondary"
              disabled={!formikBag.dirty}
            >
              Reset
            </Button>

            <Button
              type="submit"
              variant="contained"
              color="primary"
              disabled={formikBag.isSubmitting}
            >
              {formikBag.isSubmitting ? 'Processing' : 'Submit'}
            </Button>
          </Form>
        )}
      />
    </div>
  );
};