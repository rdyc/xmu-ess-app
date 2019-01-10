import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
} from '@material-ui/core';
import { PurchaseSettlementItemFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemForm';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { Field } from 'redux-form';

export const PurchaseSettlementItemFormView: React.SFC<PurchaseSettlementItemFormProps> = props => {
  const { context } = props;

  const render = (
      <Grid container spacing={16}>
        {
          context.fields.map((field, index) => {
            const items = context.fields.get(index);
            const varianceValue = items.request - items.actual;

            return (
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardHeader
                title={`#${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field
                    type="text"
                    name={`${field}.description`}
                    label={props.intl.formatMessage(purchaseMessage.settlement.items.description)}
                    disabled
                    component={InputText}
                    multiline
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
                    component={InputNumber}
                  />
                  <TextField
                    type="text"
                    name={`${field}.variance`}
                    label={props.intl.formatMessage(purchaseMessage.settlement.items.variance)}
                    // disabled
                    InputProps={{
                      className: varianceValue >= 0 ? props.classes.colorBlue : props.classes.colorRed 
                    }}
                    value={varianceValue >= 0 
                      ? `${props.intl.formatNumber(varianceValue)}`
                      : `${props.intl.formatNumber(varianceValue * -1)}`
                    }
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
            );
          }
            
          )
        }      
        </Grid>
    );

  return render;
};