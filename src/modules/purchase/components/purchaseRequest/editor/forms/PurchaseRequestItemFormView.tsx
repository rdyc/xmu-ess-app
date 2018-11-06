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
import AddIcon from '@material-ui/icons/Add';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
// import LockIcon from '@material-ui/icons/Lock';
import { PurchaseRequestItemFormProps } from '@purchase/components/purchaseRequest/editor/forms/PurchaseRequestItemForm';
// import { purchaseRequestMessage } from '@purchase/locales/messages/purchaseRequestMessage';
// import * as classNames from 'classnames';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
// import { Field, FieldArray } from 'redux-form';
import { Field, 
  // FieldArray, 
  // WrappedFieldArrayProps 
} from 'redux-form';
// import { PurchaseRequestItemFormData } from './PurchaseRequestForm';

// export const PurchaseRequestItemFormView: React.SFC<WrappedFieldArrayProps<PurchaseRequestItemFormData> & PurchaseRequestItemFormProps> = props => {
export const PurchaseRequestItemFormView: React.SFC<PurchaseRequestItemFormProps> = props => {
  const { context } = props;

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
                  disableGutters
                  key={index}
                >
                   <ListItemText
                    primary={`#${index + 1} - ${items.uid || 'New'}`}
                  />
                  <Grid xs={4}>
                    <Field
                      type="text"
                      name={`${items}.description`}
                      label={<FormattedMessage id="purchase.itemTitle.description" />}
                      // placeholder={}
                      component={InputTextArea}
                    />
                  </Grid>
                  <Grid xs={4}>
                  <Field
                    type="number"
                      name={`${items}.requestValue`}
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
          <IconButton onClick={() => context.fields.push({ uid: null, description: '', request: 0 })}>
            <AddIcon />
          </IconButton>
          {/* <IconButton >
            <LockIcon />
          </IconButton> */}
        </List>
      </CardContent>
    </Card>
  );

  return render;
};