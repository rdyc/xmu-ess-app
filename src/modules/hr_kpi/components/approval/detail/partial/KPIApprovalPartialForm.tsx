import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import { Field, FieldProps, FormikProps } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';
import { IKPIApprovalFormValue } from '../KPIApprovalDetail';

type KPIApprovalPartialFormProps = {
  formikBag: FormikProps<IKPIApprovalFormValue>;
  intl: InjectedIntl;
};

const KPIApprovalPartialForm: React.ComponentType<KPIApprovalPartialFormProps> = props => {
  return (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(kpiMessage.employee.section.approvalTitle)}
      />
      <CardContent>
        {/* <Field
          name="isApproved"
          render={({ field, form }: FieldProps<IKPIApprovalFormValue>) => (
            <RadioGroup>
              <FormControlLabel
                label={props.intl.formatMessage(organizationMessage.workflow.option.approve)}
                control={
                  <Radio 
                    disabled={form.isSubmitting}
                    checked={props.formikBag.values.isApproved !== undefined && props.formikBag.values.isApproved} 
                    onChange={(event: React.ChangeEvent, checked: boolean) => {
                      if (checked) {
                        props.formikBag.setFieldValue('isApproved', true);
                      }
                    }}
                  /> 
                } 
              />
              <FormControlLabel
                label={props.intl.formatMessage(organizationMessage.workflow.option.reject)}
                control={
                  <Radio 
                    disabled={form.isSubmitting}
                    checked={props.formikBag.values.isApproved !== undefined && !props.formikBag.values.isApproved} 
                    onChange={(event: React.ChangeEvent, checked: boolean) => {
                      if (checked) {
                        props.formikBag.setFieldValue('isApproved', false);
                      }
                    }}
                  /> 
                } 
              />
            </RadioGroup>
          )}
        />   */}

        <Field
          name="isFinal"
          render={({ field, form }: FieldProps<IKPIApprovalFormValue>) => (
            <FormControlLabel
              label={props.intl.formatMessage(kpiMessage.employee.field.isFinal)}
              disabled={form.isSubmitting}
              control={
                <Checkbox 
                  {...field} 
                  checked={props.formikBag.values.isFinal}
                />
              }
              style={{width: '100%'}}
            />
          )}
        />  

        {
          (!props.formikBag.values.isFirst && !props.formikBag.values.isFinal) &&
          <Field
            name="revision"
            render={({ field, form }: FieldProps<IKPIApprovalFormValue>) => (
              <TextField
                {...field}
                fullWidth
                required={true}
                margin="normal"
                autoComplete="off"
                disabled={form.isSubmitting}
                label={props.intl.formatMessage(kpiMessage.employee.field.revision)}
                placeholder={props.intl.formatMessage(kpiMessage.employee.field.revision)}
                helperText={(form.touched.revision) && (form.errors.revision)}
                error={(form.touched.revision) && Boolean(form.errors.revision)}
              />
            )}
          />
        }
      </CardContent>
    </Card>
  );
};

export default KPIApprovalPartialForm;