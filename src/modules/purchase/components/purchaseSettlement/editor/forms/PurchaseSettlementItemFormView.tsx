import { InputNumber } from '@layout/components/input/number';
// import { InputText } from '@layout/components/input/text';
import { InputTextArea } from '@layout/components/input/textArea';
import {
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  IconButton,
  List,
  ListItem,
  ListItemSecondaryAction,
  ListItemText,
} from '@material-ui/core';
// import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
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
                  <Grid xs={4} spacing={8}>
                   <ListItemText
                    primary={`#${index + 1} - ${items.uid || ''}`}
                  />
                  </Grid>
                  <Grid xs={4} spacing={8}>
                    <Field
                      type="text"
                      name={`${field}.description`}
                      label={<FormattedMessage id="purchase.itemTitle.description" />}
                      // placeholder={}
                      component={InputTextArea}
                    />
                  </Grid>
                  <Grid xs={4} spacing={8}>
                  <Field
                    type="number"
                      name={`${field}.request`}
                    label={<FormattedMessage id="purchase.itemTitle.request" />}
                    // placeholder={}
                    required={true}
                    component={InputNumber}
                  />
                  </Grid>
                  <ListItemSecondaryAction>
                    <IconButton onClick={() => context.fields.remove(index)}>
                      <DeleteForeverIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
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