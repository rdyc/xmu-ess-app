import { Card, CardContent, CardHeader, Checkbox, Table, TableBody, TableCell, TableHead, TableRow, TextField, WithStyles } from '@material-ui/core';
import { Field, FieldArray, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { MeasurementType } from '@common/classes/types';
import { kpiMessage } from '@kpi/locales/messages/kpiMessage';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import * as classNames from 'classnames';
import { IKPIApprovalFormValue } from '../KPIApprovalDetail';

interface KPIApprovalItemPartialFormProps {
  formikBag: FormikProps<IKPIApprovalFormValue>;
  intl: InjectedIntl;
}

type AllProps
 = KPIApprovalItemPartialFormProps
 & WithStyles;

const KPIApprovalItemPartialForm: React.ComponentType<AllProps> = props => (
  <Card square>
    <CardHeader 
      title={props.intl.formatMessage(kpiMessage.employee.section.itemTitle)}
      subheader={
        props.formikBag.submitCount > 0 &&
        typeof props.formikBag.errors.items === 'string' &&
        props.formikBag.errors.items
      }
      subheaderTypographyProps={{
        color: 'error',
        variant: 'body1'
      }}
    />
    <CardContent>
      <div
        className={classNames(props.classes.reportContentScrollable)}
      >
        <Table
          className={classNames(props.classes.reportTable)}
          padding="dense"
        >
          <TableHead>
            <TableRow>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.categoryName)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.measurementDescription)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.target)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.weight)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.threshold)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.amount)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.achieved)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.progress)}
              </TableCell>
              <TableCell>
                {props.intl.formatMessage(kpiMessage.employee.field.score)}
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <FieldArray
              name="items"
              render={() => (
                <React.Fragment>
                  {
                    props.formikBag.values.items.length > 0 &&
                    props.formikBag.values.items.map((item, index) =>
                    <TableRow key={index}>
                      <TableCell style={{ verticalAlign: 'top' }}>
                        {props.formikBag.values.items[index].categoryName}
                      </TableCell>
                      <TableCell style={{ verticalAlign: 'top' }}>
                        {props.formikBag.values.items[index].measurementDescription}
                      </TableCell>
                      <TableCell style={{ verticalAlign: 'top' }}>
                        {props.formikBag.values.items[index].target}
                      </TableCell>
                      <TableCell numeric style={{ verticalAlign: 'top' }}>
                        {`${props.intl.formatNumber(props.formikBag.values.items[index].weight)} %`}
                      </TableCell>
                      <TableCell numeric style={{ verticalAlign: 'top' }}>
                        {
                          props.formikBag.values.items[index].measurementType === MeasurementType.Scoring  &&
                          props.intl.formatNumber(item.threshold || 0) ||
                          '-'
                        }
                      </TableCell>
                      <TableCell numeric style={{ verticalAlign: 'top' }}>
                        {
                          (props.formikBag.values.items[index].measurementType === MeasurementType.Scoring ||
                            props.formikBag.values.items[index].measurementType === MeasurementType.Attendance) &&
                          props.intl.formatNumber(item.amount) ||
                          '-'
                        }
                      </TableCell>
                      <TableCell numeric style={{ verticalAlign: 'top' }}>
                      {
                        props.formikBag.values.items[index].measurementType &&
                        props.formikBag.values.items[index].measurementType !== MeasurementType.Completion &&
                          <Field
                            name={`items.${index}.achieved`}
                            render={({ field, form }: FieldProps<IKPIApprovalFormValue>) => {
                              const error = getIn(form.errors, `items.${index}.achieved`);
                              const touch = getIn(form.touched, `items.${index}.achieved`);

                              return (
                                <TextField
                                  {...field}
                                  fullWidth
                                  required
                                  disabled={form.isSubmitting}
                                  margin="dense"
                                  autoComplete="off"
                                  placeholder={props.intl.formatMessage(kpiMessage.employee.field.achievedPlaceholder)}
                                  helperText={touch && error}
                                  error={touch && Boolean(error)}
                                  InputProps={{
                                    inputComponent: NumberFormatter,
                                  }}
                                  onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                                    const weight = props.formikBag.values.items[index].weight || 0;
                                    const threshold = props.formikBag.values.items[index].threshold || 0;
                                    const amount = props.formikBag.values.items[index].amount || 0;

                                    let value = 0;
                                    let progress = 0;
                                    let score = 0;
                                    let totalScore = 0;

                                    if (e.target.value === '') {
                                      // set current field to 0
                                      props.formikBag.setFieldValue(field.name, 0);
                                      value = 0;
                                    } else {
                                      value = parseFloat(e.target.value);
                                      // set current field
                                      props.formikBag.setFieldValue(field.name, value);
                                    }
                                    
                                    // set other things
                                    if (threshold !== null || threshold > 0) {
                                      if (value >= threshold) {
                                        progress = (value / amount) * 100;
                                      }
                                    } else {
                                      progress = (value / amount) * 100;
                                    }

                                    if (value > amount) {
                                      progress = 100;
                                    }

                                    score = (progress / 100) * (weight / 100) * 100;
                                    props.formikBag.setFieldValue(`items.${index}.progress`, progress);
                                    props.formikBag.setFieldValue(`items.${index}.score`, score);
                                    
                                    // set total score
                                    totalScore = score;
                                    props.formikBag.values.items.forEach((requestItem, indexItem) => {
                                      if (index !== indexItem) {
                                        totalScore = totalScore + requestItem.score;
                                      }                              
                                    });

                                    // set weight
                                    props.formikBag.setFieldValue('totalScore', totalScore);

                                  }}
                                />
                              );
                            }}
                          />
                          ||
                          <Checkbox
                            key={index}
                            checked={props.formikBag.values.items[index].achieved > 0}
                            onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                              const weight = props.formikBag.values.items[index].weight || 0;
                              const threshold = props.formikBag.values.items[index].threshold || 0;
                              const amount = props.formikBag.values.items[index].amount || 0;

                              let value = 0;
                              let progress = 0;
                              let score = 0;
                              let totalScore = 0;

                              if (!e.target.checked) {
                                props.formikBag.setFieldValue(`items.${index}.achieved`, 0);
                                value = 0;
                              } else {
                                value = 1;
                                props.formikBag.setFieldValue(`items.${index}.achieved`, 1);
                              }
                              
                              // set other things
                              if (threshold !== null || threshold > 0) {
                                if (value >= threshold) {
                                  progress = (value / amount) * 100;
                                }
                              } else {
                                progress = (value / amount) * 100;
                              }

                              if (value > amount) {
                                progress = 100;
                              }

                              score = (progress / 100) * (weight / 100) * 100;
                              props.formikBag.setFieldValue(`items.${index}.progress`, progress);
                              props.formikBag.setFieldValue(`items.${index}.score`, score);
                              
                              // set total score
                              totalScore = score;
                              props.formikBag.values.items.forEach((requestItem, indexItem) => {
                                if (index !== indexItem) {
                                  totalScore = totalScore + requestItem.score;
                                }                              
                              });

                              // set weight
                              props.formikBag.setFieldValue('totalScore', totalScore);

                            }}
                          />
                        }
                      </TableCell>
                      <TableCell numeric style={{ verticalAlign: 'top' }}>
                        {`${props.intl.formatNumber(props.formikBag.values.items[index].progress)} %`}
                      </TableCell>
                      <TableCell numeric style={{ verticalAlign: 'top' }}>
                        {props.intl.formatNumber(props.formikBag.values.items[index].score)}
                      </TableCell>
                    </TableRow>
                  )}
                </React.Fragment>
              )}
            />
          </TableBody>
        </Table>
      </div>
    </CardContent>
  </Card>
);

export default KPIApprovalItemPartialForm;