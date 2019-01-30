import { InputFile } from '@layout/components/input/file';
import { Submission } from '@layout/components/submission/Submission';
import { Card, CardContent, CardHeader, Grid } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AchievementFormProps } from './AchievementForm';

export const AchievementFormView: React.SFC<AchievementFormProps> = props => (
  <form onSubmit={props.handleSubmit}>
    <Grid container spacing={16}>
      <Grid item xs={12} md={8}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={6}>
            <Card>
              <CardHeader 
                title="Upload Achievement Form"
                subheader="Upload file redux form"
              />
              <CardContent>
                <Field 
                  name="file" 
                  label="File (excel)"
                  required={true}
                  accept=".xls,.xlsx, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet,application/vnd.ms-excel"
                  component={InputFile}
                />
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} md={6}>
            <Submission 
              valid={props.valid}
              reset={props.reset}
              submitting={props.submitting}
            />
          </Grid>
        </Grid>
      </Grid>   
      <Grid item xs={12} md={4}>
        <Card>
          <CardHeader 
            title="Values"
            subheader="form values as object"
          />
          <CardContent>
            <pre>{JSON.stringify(props.formValues, null, 2)}</pre>
          </CardContent>
        </Card>
      </Grid>
    </Grid>
  </form>
);