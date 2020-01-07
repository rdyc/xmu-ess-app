import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { Field, FieldArray, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { GlobalStyle } from '@layout/types/GlobalStyle';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { IPurchaseSettlementFormValue } from '../PurchaseSettlementForm';

type PurchaseItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IPurchaseSettlementFormValue>;
  intl: InjectedIntl;
  classes: {
    flexContent: string;
    marginFarRight: string;
    colorBlue: string;
    colorRed: string;
  };
};

const PurchaseItemPartialForm: React.ComponentType<PurchaseItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={() => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - ${item.uid}`}
                />
                <CardContent>
                  <Field 
                    name={`items.${index}.description`}
                    render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.description`);
                      const touch = getIn(form.touched, `items.${index}.description`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(purchaseMessage.settlement.items.description)}
                          placeholder={props.intl.formatMessage(purchaseMessage.settlement.items.description)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.request`}
                    render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.request`);
                      const touch = getIn(form.touched, `items.${index}.request`);

                      return (
                        <TextField 
                          {...GlobalStyle.TextField.ReadOnly}
                          {...field}
                          fullWidth
                          label={props.intl.formatMessage(purchaseMessage.settlement.items.request)}
                          placeholder={props.intl.formatMessage(purchaseMessage.settlement.items.requestPlaceholder)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.amount`}
                    render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.amount`);
                      const touch = getIn(form.touched, `items.${index}.amount`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(purchaseMessage.settlement.items.actual)}
                          placeholder={props.intl.formatMessage(purchaseMessage.settlement.items.actual)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let totalActual = 0;
                            let thisActual = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                              thisActual = 0;
                            } else {
                              thisActual = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, thisActual);
                            }

                            // set actual field
                            props.formikBag.setFieldValue(`items.${index}.amount`, thisActual);

                            // calculate total requested
                            totalActual = thisActual;
                            props.formikBag.values.items.forEach((requestItem, indexItem) => {
                              if (index !== indexItem) {
                                totalActual = totalActual + requestItem.amount;
                              }                              
                            });

                            // set actuals
                            props.formikBag.setFieldValue('actual', totalActual);
                          }}
                        />
                      );
                    }}
                  />

                  <Field 
                    name={`items.${index}.variance`}
                    render={({ field, form }: FieldProps<IPurchaseSettlementFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.variance`);
                      const touch = getIn(form.touched, `items.${index}.variance`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          margin= "dense"
                          InputProps= {{
                            disableUnderline: true,
                            readOnly: true,
                            className: props.formikBag.values.items[index].request - props.formikBag.values.items[index].amount >= 0 ? 
                            props.classes.colorBlue : props.classes.colorRed 
                          }}
                          value={props.intl.formatNumber(
                            props.formikBag.values.items[index].request - props.formikBag.values.items[index].amount >= 0 ?
                            props.formikBag.values.items[index].request - props.formikBag.values.items[index].amount :
                            (props.formikBag.values.items[index].request - props.formikBag.values.items[index].amount) * -1 
                            )}
                          label={props.intl.formatMessage(purchaseMessage.settlement.items.variance)}
                          placeholder={props.intl.formatMessage(purchaseMessage.settlement.items.variance)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }
      </React.Fragment>
    )}
  />
);

export default PurchaseItemPartialForm;