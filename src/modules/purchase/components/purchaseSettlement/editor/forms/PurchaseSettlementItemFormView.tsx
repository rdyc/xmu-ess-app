import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Card,
  CardContent,
  // CardHeader,
  // Divider,
  Grid,
} from '@material-ui/core';
import { PurchaseSettlementItemFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemForm';
// import { purchaseSettlementMessage } from '@purchase/locales/messages/purchaseSettlementMessage';
// import * as classNames from 'classnames';
import * as React from 'react';
// import { FormattedMessage } from 'react-intl';
import { Field, 
} from 'redux-form';
// import { PurchaseSettlementItemFormData } from './PurchaseSettlementForm';

// export const PurchaseSettlementItemFormView: React.SFC<WrappedFieldArrayProps<PurchaseSettlementItemFormData> & PurchaseSettlementItemFormProps> = props => {
export const PurchaseSettlementItemFormView: React.SFC<PurchaseSettlementItemFormProps> = props => {
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
                      disabled
                      component={InputText}
                    />
                    <Field
                      type="number"
                      name={`${field}.requestValue`}
                      label="Difference"
                      disabled={true}
                      component={InputNumber}
                    />
                    <Field
                      type="number"
                      name={`${field}.actualValue`}
                      label="Actual Value "
                      required={true}
                      component={InputNumber}
                    />
                    <Field
                      type="number"
                      name={`${field}.varianceValue`}
                      label="Difference"
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