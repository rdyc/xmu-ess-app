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

    // // don't show uid for new form
    // const fields = ['uid'];
    // if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
    //   return null;
    // }

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
        title={<FormattedMessage id="purchase.infoTitle" />}
        subheader={<FormattedMessage id="purchase.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};