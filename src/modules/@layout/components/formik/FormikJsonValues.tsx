import { Card, CardContent, CardHeader } from '@material-ui/core';
import { FormikProps } from 'formik';
import * as React from 'react';

type FormikJsonValuesProps = {
  formikBag: FormikProps<any>;
};

const FormikJsonValues: React.ComponentType<FormikJsonValuesProps> = props => (
  <React.Fragment>
    {
      process.env.NODE_ENV !== 'production' &&
      <Card square>
        <CardHeader title="JSON"/>
        <CardContent>
          <pre>{JSON.stringify(props.formikBag.values, null, 2)}</pre>
        </CardContent>
      </Card>
    }
  </React.Fragment>
);

export default FormikJsonValues;