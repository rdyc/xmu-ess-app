import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  IconButton,
} from '@material-ui/core';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import { PurchaseRequestItemFormProps } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemForm';
import { purchaseItemField } from '@purchase/locales/messages/purchaseItemMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

// export const PurchaseRequestItemFormView: React.SFC<WrappedFieldArrayProps<PurchaseRequestItemFormData> & PurchaseRequestItemFormProps> = props => {
export const PurchaseRequestItemFormView: React.SFC<PurchaseRequestItemFormProps> = props => {
  const { context, onRequestChange } = props;
  // const onChangeRequestValue = (event: any, newValue: number, oldValue: number) => {
  //   change('information.requestIDR', newValue - oldValue);
  // };
  const render = (
    <Grid container spacing={16}>
      {
        context.fields.map((field, index) =>
          <Grid key={index} item xs={12} md={4}>
            <Card square>
              <CardHeader
                action={
                  <IconButton onClick={() => context.fields.remove(index)}>
                    <DeleteForeverIcon />
                  </IconButton>
                }
                title={`#${index + 1}`}
              />
              <CardContent>
                <div>
                  <Field
                    type="text"
                    name={`${field}.uid`}
                    label={props.intl.formatMessage(purchaseItemField.uid)}
                    disabled
                    component={InputText}
                  />
                  <Field
                    type="text"
                    name={`${field}.description`}
                    label={props.intl.formatMessage(purchaseItemField.description)}
                    required
                    component={InputText}
                  />
                  <Field
                    type="number"
                    name={`${field}.request`}
                    label={props.intl.formatMessage(purchaseItemField.request)}
                    required
                    onChange={onRequestChange}
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
              uid: '',
              description: '',
              request: 0,
            })}>
              <FormattedMessage id="purchase.action.add" />
            </Button>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );

  return render;
};