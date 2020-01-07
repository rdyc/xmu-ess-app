import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, Typography } from '@material-ui/core';
import { Field, FieldArray, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { FormMode } from '@generic/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { IKPIAssignBulkFormValue, IKPIAssignListFormValue } from '../KPIAssignBulkForm';

type KPIAssignBulkEmployeePartialFormProps = {
  formMode: FormMode;
  formikBag: FormikProps<IKPIAssignBulkFormValue>;
  loadItem: boolean;
  listItem: IKPIAssignListFormValue[];
  handleSetLoadItem: () => void;
  intl: InjectedIntl;
};

const KPIAssignBulkEmployeePartialForm: React.ComponentType<KPIAssignBulkEmployeePartialFormProps> = props => {
  const setItemValue = () => {
    props.formikBag.setValues({
      companyUid: props.formikBag.values.companyUid,
      positionUid: props.formikBag.values.positionUid,
      templateUid: props.formikBag.values.templateUid,
      year: props.formikBag.values.year,
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
                      render={({ field, form }: FieldProps<IKPIAssignBulkFormValue>) => {
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

export default KPIAssignBulkEmployeePartialForm;