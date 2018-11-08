import { InputNumber } from '@layout/components/input/number';
// import { InputText } from '@layout/components/input/text';
// import { InputTextArea } from '@layout/components/input/textArea';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  // IconButton,
  List,
  ListItem,
  // ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
// import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import LockIcon from '@material-ui/icons/Lock';
import { PurchaseSettlementItemFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementItemForm';
// import { purchaseSettlementMessage } from '@purchase/locales/messages/purchaseSettlementMessage';
// import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
// import { Field, FieldArray } from 'redux-form';
import { Field, 
  // FieldArray, 
  // WrappedFieldArrayProps 
} from 'redux-form';
// import { PurchaseSettlementItemFormData } from './PurchaseSettlementForm';

// export const PurchaseSettlementItemFormView: React.SFC<WrappedFieldArrayProps<PurchaseSettlementItemFormData> & PurchaseSettlementItemFormProps> = props => {
export const PurchaseSettlementItemFormView: React.SFC<PurchaseSettlementItemFormProps> = props => {
  const { context,  } = props;

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="purchase.itemTitle" />}
        subheader={<FormattedMessage id="purchase.itemSubTitle" />}
      />
      <CardContent>
        <List>
          {
            context.fields.map((field, index) => {
              const items = context.fields.get(index);

              return (
                <ListItem
                  // disableGutters
                  dense
                  key={index}
                >
                  <Grid xs={4} md={8} spacing={8}>
                   <ListItemText
                    primary={`#${index + 1} - ${items.uid || ''}`}
                    secondary={items.description}
                  />
                    <ListItemText
                      primary={< FormattedMessage id="purchase.itemTitle.request" />}
                      secondary={items.request}
                    />
                  </Grid>
                  <Grid xs={4} md={4} spacing={8}>
                  <Field
                    type="number"
                      name={`${field}.actual`}
                      label={<FormattedMessage id="purchase.itemTitle.actual" />}
                      placeholder={<FormattedMessage id="purchase.itemTitle.actual" />}
                      required={true}
                      component={InputNumber}
                  />
                  </Grid>
                    <Grid xs={4} md={4} spacing={8}>
                  <Field
                    type="number"
                      name={`${field}.variance`}
                      label={<FormattedMessage id="purchase.itemTitle.variance" />}
                      disabled={true}
                      component={InputNumber}
                  />
                  </Grid>
                </ListItem>
              );
            })
          }
          <Divider />
        </List>
      </CardContent>
    </Card>
  );

  return render;
};