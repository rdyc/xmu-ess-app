// import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { PurchaseSettlementDetailFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementDetailForm';
import { purchaseMessage } from '@purchase/locales/messages/purchaseMessage';
import * as React from 'react';
import { Field } from 'redux-form';

export const PurchaseSettlementDetailFormView: React.SFC<PurchaseSettlementDetailFormProps> = props => {
  // const { formMode } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    return (
      <Field
        key={fieldName}
        name={fieldName}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={props.intl.formatMessage(purchaseMessage.settlement.section.infoTitle)}
        // subheader={props.intl.formatMessage(purchaseMessage.settlement.section.infoSubHeader)}
        subheader={''}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};