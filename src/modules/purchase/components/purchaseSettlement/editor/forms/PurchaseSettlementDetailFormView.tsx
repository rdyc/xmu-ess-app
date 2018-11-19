// import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { PurchaseSettlementDetailFormProps } from '@purchase/components/purchaseSettlement/editor/forms/PurchaseSettlementDetailForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
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
        label={<FormattedMessage id={`purchase.field.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="purchasesettlement.infoTitle" />}
        subheader={<FormattedMessage id="purchasesettlement.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};