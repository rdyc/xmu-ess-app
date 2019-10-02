import { FormMode } from '@generic/types';
import { NumberFormatter } from '@layout/components/fields/NumberFormatter';
import { layoutMessage } from '@layout/locales/messages';
import { Button, Card, CardActions, CardContent, CardHeader, IconButton, TextField } from '@material-ui/core';
import { DeleteForever, GroupAdd } from '@material-ui/icons';
import { Field, FieldArray, FieldArrayRenderProps, FieldProps, FormikProps, getIn } from 'formik';
import * as React from 'react';
import { InjectedIntl } from 'react-intl';

import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import { IPurchaseRequestFormValue } from '../PurchaseRequestForm';

type PurchaseItemPartialFormProps = {
  formMode: FormMode; 
  formikBag: FormikProps<IPurchaseRequestFormValue>;
  intl: InjectedIntl;
  classes: {
    flexContent: string;
    marginFarRight: string;
  };
};

const PurchaseItemPartialForm: React.ComponentType<PurchaseItemPartialFormProps> = props => (
  <FieldArray
    name="items"
    render={(fields: FieldArrayRenderProps) => (
      <React.Fragment>
        {
          props.formikBag.values.items.length > 0 &&
          props.formikBag.values.items.map((item, index) =>
            <div className={props.classes.flexContent} key={index}>
              <Card square>
                <CardHeader 
                  title={`#${index + 1} - ${item.uid || 'Draft'}`}
                  action={
                    <IconButton 
                      onClick={() => {
                        // remove current
                        fields.remove(index);

                        // calculate total requested
                        let totalRequest = 0;
                        props.formikBag.values.items.forEach((requestItem, indexItem) => {
                          if (index !== indexItem) {
                            totalRequest = totalRequest + requestItem.request;
                          } 
                        });

                        // set request
                        props.formikBag.setFieldValue('request', totalRequest);
                        // props.formikBag.setFieldValue('requestInIDR', totalRequest * props.formikBag.values.rate);
                      }}
                    >
                      <DeleteForever />
                    </IconButton>
                  }
                />
                <CardContent>
                  <Field 
                    name={`items.${index}.description`}
                    render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.description`);
                      const touch = getIn(form.touched, `items.${index}.description`);

                      return (
                        <TextField 
                          {...field}
                          fullWidth
                          required
                          margin="normal"
                          autoComplete="off"
                          disabled={form.isSubmitting}
                          label={props.intl.formatMessage(purchaseMessage.request.items.description)}
                          placeholder={props.intl.formatMessage(purchaseMessage.request.items.description)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                        />
                      );
                    }}
                  />

                  <Field
                    name={`items.${index}.request`}
                    render={({ field, form }: FieldProps<IPurchaseRequestFormValue>) => {
                      const error = getIn(form.errors, `items.${index}.request`);
                      const touch = getIn(form.touched, `items.${index}.request`);

                      return (
                        <TextField
                          {...field}
                          fullWidth
                          required
                          disabled={form.isSubmitting}
                          margin="normal"
                          autoComplete="off"
                          label={props.intl.formatMessage(purchaseMessage.request.items.request)}
                          placeholder={props.intl.formatMessage(purchaseMessage.request.items.request)}
                          helperText={touch && error}
                          error={touch && Boolean(error)}
                          InputProps={{
                            inputComponent: NumberFormatter,
                          }}
                          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                            let totalRequest = 0;
                            let thisRequest = 0;

                            if (e.target.value === '') {
                              // set current field
                              props.formikBag.setFieldValue(field.name, 0);
                              thisRequest = 0;
                            } else {
                              thisRequest = parseFloat(e.target.value);

                              // set current field
                              props.formikBag.setFieldValue(field.name, thisRequest);
                            }

                            // set request field
                            props.formikBag.setFieldValue(`items.${index}.request`, thisRequest);

                            // calculate total requested
                            totalRequest = thisRequest;
                            props.formikBag.values.items.forEach((requestItem, indexItem) => {
                              if (index !== indexItem) {
                                totalRequest = totalRequest + requestItem.request;
                              }                              
                            });

                            // set requests
                            props.formikBag.setFieldValue('request', totalRequest);
                          }}
                        />
                      );
                    }}
                  />
                </CardContent>
              </Card>
            </div>
          )
        }

        <div className={props.classes.flexContent}>
          <Card square>
            <CardHeader 
              title={props.intl.formatMessage(purchaseMessage.request.section.itemTitle)}
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
            <CardActions>
              <Button
                fullWidth
                color="primary" 
                disabled={props.formikBag.isSubmitting}
                onClick={() => fields.push({
                  description: '',
                  request: 0,
                })}
              >
                <GroupAdd className={props.classes.marginFarRight}/>

                {props.intl.formatMessage(layoutMessage.action.add)}
              </Button>
            </CardActions>
          </Card>
          
        </div>
      </React.Fragment>
    )}
  />
);

export default PurchaseItemPartialForm;