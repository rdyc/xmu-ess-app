import { Grid } from '@material-ui/core';
import { IPurchaseDetail } from '@purchase/classes/response/purchaseRequest';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';
import { InjectedArrayProps } from 'redux-form';
import { PurchaseItemInformation } from './PurchaseItemInformation';

interface OwnProps {
  data: IPurchaseDetail;
}

type AllProps 
= OwnProps 
& InjectedArrayProps
& InjectedIntlProps;

const purchaseItemContainer: React.SFC<AllProps> = props => {
  const { data } = props;

  const render = (
  <React.Fragment>
    {
      data &&
        <Grid container item xs={12}>
          <Grid container spacing={16}>
            {
              data.items &&
              data.items.map((item, index) =>
                <Grid key={index} item xs={12}>
                  <PurchaseItemInformation
                    data={item}
                    title={`${props.intl.formatMessage(purchaseMessage.request.section.itemTitle)} - #${index + 1} `} />
                </Grid>
              )
            }
          </Grid>
        </Grid>
    }
  </React.Fragment>
  );

  return render;
};

export const PurchaseItemContainer = compose<AllProps, OwnProps>(
  injectIntl
)(purchaseItemContainer);