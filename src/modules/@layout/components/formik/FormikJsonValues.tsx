import { Card, CardContent, CardHeader, Typography } from '@material-ui/core';
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
        <CardHeader title="Json Values"/>
        <CardContent>
          <Typography 
            variant="body1"
            component="pre"
          >
            {JSON.stringify(props.formikBag.values, null, 2)}
          </Typography>
        </CardContent>
      </Card>
    }
  </React.Fragment>
);

export default FormikJsonValues;