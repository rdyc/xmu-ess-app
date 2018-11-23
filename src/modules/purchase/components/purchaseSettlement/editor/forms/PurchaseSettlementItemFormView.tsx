import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import { PurchaseSettlementItemFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemForm';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { Field, 
  // change 
} from 'redux-form';

export const PurchaseSettlementItemFormView: React.SFC<PurchaseSettlementItemFormProps 
> = props => {
  const { context } = props;

  // const onActualChange = (event: any, newValue: number, oldValue: number) => {
  //   change('actualInIDR', newValue * formRate);
  // };

  const render = (
      <Grid container spacing={16}>
        {
          context.fields.map((field, index) =>
            <Grid key={index} item xs={12} md={4}>
              <Card square>
                <CardContent>
                  <div>
                    <Field
                      type="text"
                      name={`${field}.uid`}
                      label={props.intl.formatMessage(purchaseMessage.settlement.items.uid)}
                      disabled
                      component={InputText}
                    />
                    <Field
                      type="text"
                      name={`${field}.description`}
                      label={props.intl.formatMessage(purchaseMessage.settlement.items.description)}
                      disabled
                      component={InputText}
                    />
                    <Field
                      type="number"
                      name={`${field}.request`}
                      label={props.intl.formatMessage(purchaseMessage.settlement.items.request)}
                      disabled={true}
                      component={InputNumber}
                    />
                    <Field
                      type="number"
                      name={`${field}.actual`}
                      label={props.intl.formatMessage(purchaseMessage.settlement.items.actual)}
                      required={true}
                      // onChange={onActualChange}
                      //   onChange={(event: any, newValue: any) => {
                      //   if (!isNaN(newValue)) {
                      //     props.change(`${field}.variance`, newValue);
                      //   }
                      // }}
                      component={InputNumber}
                    />
                    <Field
                      type="number"
                      name={`${field}.variance`}
                      label={props.intl.formatMessage(purchaseMessage.settlement.items.variance)}
                      disabled={true}
                      component={InputNumber}
                    />
                  </div>
                </CardContent>
              </Card>
            </Grid>
          )
        }      
        </Grid>
    );

  return render;
};