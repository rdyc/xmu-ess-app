import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { Field, FieldArray, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { IEmployeeListFormValue, IKPIEmployeeBulkFormValue } from '../KPIHRInputBulkForm';

type KPIHRInputBulkEmployeePartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IKPIEmployeeBulkFormValue>;
  loadItem: boolean;
  listItem: IEmployeeListFormValue[];
  handleSetLoadItem: () => void;
  intl: InjectedIntl;
};

const KPIHRInputBulkEmployeePartialForm: React.ComponentType<KPIHRInputBulkEmployeePartialFormProps> = props => {
  const setItemValue = () => {
    props.formikBag.setValues({
      companyUid: props.formikBag.values.companyUid,
      positionUid: props.formikBag.values.positionUid,
      templateUid: props.formikBag.values.templateUid,
      year: props.formikBag.values.year,
      period: props.formikBag.values.period,
      employees: props.listItem,
    });

    props.handleSetLoadItem();
  };

  return (
    <React.Fragment>
      <Card square>
        <CardHeader title={props.intl.formatMessage(kpiMessage.employee.section.employeeTitle)} />
        <CardContent>
          <FieldArray
            name="employees"
            render={() => (
              <React.Fragment>
                {
                  props.formikBag.values.employees &&
                  props.formikBag.values.employees.map((item, index) =>
                    <Field
                      key={index}
                      name={`employees.${index}.isChecked`}
                      render={({ field, form }: FieldProps<IKPIEmployeeBulkFormValue>) => {
                        const error = getIn(form.errors, `employees.${index}.employeeUid`);
                        const touch = getIn(form.touched, `employees.${index}.employeeUid`);

                        return (
                          <div>
                            <FormControlLabel
                              label={item.fullName}
                              control={
                                <Checkbox 
                                  {...field} 
                                  value={item.employeeUid}
                                  checked={item.isChecked}
                                  disabled={props.formikBag.isSubmitting} 
                                />
                              }
                              style={{width: '100%'}}
                            />
                            {
                              touch && Boolean(error) &&
                              <Typography variant={'caption'} color={'error'}>
                                {touch && error}
                              </Typography>
                            }
                          </div>
                        ); 
                      }}
                    />
                  )
                }
              </React.Fragment>
            )}
          />
        </CardContent>
        {
          props.loadItem &&
          setItemValue()
        }
      </Card>
    </React.Fragment>
  );
};

export default KPIHRInputBulkEmployeePartialForm;