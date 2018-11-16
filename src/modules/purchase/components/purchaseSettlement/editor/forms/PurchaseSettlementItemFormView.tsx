import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import { PurchaseSettlementItemFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { 
  Field,
} from 'redux-form';

export const PurchaseSettlementItemFormView: React.SFC<PurchaseSettlementItemFormProps 
> = props => {
  const { context } = props;

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
                      label={<FormattedMessage id="purchase.itemTitle.uid" />}
                      disabled
                      component={InputText}
                    />
                    <Field
                      type="text"
                      name={`${field}.description`}
                      label={<FormattedMessage id="purchase.itemTitle.description" />}
                      disabled
                      component={InputText}
                    />
                    <Field
                      type="number"
                      name={`${field}.request`}
                      label={<FormattedMessage id="purchase.itemTitle.request" />}
                      disabled={true}
                      component={InputNumber}
                    />
                    <Field
                      type="number"
                      name={`${field}.actual`}
                      label={<FormattedMessage id="purchase.itemTitle.actual" />}
                      required={true}
                      // onChange={onActualChange}
                        onChange={(event: any, newValue: any) => {
                        if (!isNaN(newValue)) {
                          props.change(`${field}.variance`, newValue - 
                            (props.initialValues.request ? props.initialValues.request : 0));
                        }
                      }}
                      component={InputNumber}
                    />
                    <Field
                      type="number"
                      name={`${field}.variance`}
                      label={<FormattedMessage id="purchase.itemTitle.variance" />}
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