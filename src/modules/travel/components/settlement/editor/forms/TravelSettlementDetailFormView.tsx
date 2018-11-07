import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { TravelSettlementDetailFormProps } from '@travel/components/settlement/editor/forms/TravelSettlementDetailForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const TravelSettlementDetailFormView: React.SFC<TravelSettlementDetailFormProps> = props => {
  const { formMode } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`travel.field.${name}`} />}
        {...fieldProps}
      />
    );    
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.infoTitle"/>}
        subheader={<FormattedMessage id="travel.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};
