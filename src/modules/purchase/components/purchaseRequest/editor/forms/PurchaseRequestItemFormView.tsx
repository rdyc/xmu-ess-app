import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Button,
  Card,
  CardContent,
  Grid,
} from '@material-ui/core';
import { PurchaseRequestItemFormProps } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

// export const PurchaseRequestItemFormView: React.SFC<WrappedFieldArrayProps<PurchaseRequestItemFormData> & PurchaseRequestItemFormProps> = props => {
export const PurchaseRequestItemFormView: React.SFC<PurchaseRequestItemFormProps> = props => {
  const { context,  } = props;

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
                    label="Item ID"
                    disabled
                    component={InputText}
                  />
                  <Field
                    type="text"
                    name={`${field}.description`}
                    label="Description"
                    required
                    component={InputText}
                  />
                  <Field
                    type="number"
                    name={`${field}.request`}
                    label="Request Value"
                    required
                    component={InputNumber}
                  />
                </div>
              </CardContent>
            </Card>
          </Grid>
        )
      }
      <Grid item xs={12} md={4}>
        <Grid container spacing={16}>
          <Grid item xs={12} md={4}>
            <Button onClick={() => context.fields.push({
              uid: null,
              description: '',
              request: 0,
            })}>
              <FormattedMessage id="purchase.itemTitle.action.add" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return render;
};