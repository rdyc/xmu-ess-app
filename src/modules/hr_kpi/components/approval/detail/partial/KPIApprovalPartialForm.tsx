import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
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
      </CardContent>
    </Card>
  );
};

export default KPIApprovalPartialForm;