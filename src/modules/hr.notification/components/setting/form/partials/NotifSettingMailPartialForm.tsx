
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader, IconButton, InputAdornment, TextField } from '@material-ui/core';
import { AddCircle, RemoveCircleOutline } from '@material-ui/icons';
import { Field, FieldArray, FieldProps, getIn } from 'formik';
import * as React from 'react';
import { INotifSettingFormValue } from '../NotifSettingForm';

type NotifSettingPartialFormProps = {
  title: string
  formMode: FormMode; 
  values: string[];
  fieldName: string;
  fieldLabel: string;
  fieldPlaceholder: string;
};

const NotifSettingMailToPartialForm: React.ComponentType<NotifSettingPartialFormProps> = props => (
  <FieldArray
    name={props.fieldName}
    render={arrayHelpers => (
      <Card square>
        <CardHeader 
          title={props.title}
          action={
            <IconButton onClick={() => arrayHelpers.push('')}>
              <AddCircle color="secondary"/>
            </IconButton>
          }
        />
        <CardContent>
          {
            props.values && 
            props.values.length > 0 &&
            props.values.map((mail, index) => (
              <Field 
                key={index}
                name={`${props.fieldName}.${index}`}
                render={({ field, form }: FieldProps<INotifSettingFormValue>) => {
                  const error = getIn(form.errors, `${props.fieldName}.${index}`);
                  const touch = getIn(form.touched, `${props.fieldName}.${index}`);
                  
                  return (
                    <TextField
                      {...field}
                      fullWidth
                      required={true}
                      margin="normal"
                      disabled={form.isSubmitting}
                      label={props.fieldLabel}
                      placeholder={props.fieldPlaceholder}
                      helperText={touch && error}
                      error={touch && Boolean(error)}
                      InputProps={{
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton onClick={() => arrayHelpers.remove(index)}>
                              <RemoveCircleOutline/>
                            </IconButton>
                          </InputAdornment>
                        )
                      }}
                    />
                  );
                }}
              />
            )
          )
          }
        </CardContent>
      </Card>
    )}
  />
);

export default NotifSettingMailToPartialForm;