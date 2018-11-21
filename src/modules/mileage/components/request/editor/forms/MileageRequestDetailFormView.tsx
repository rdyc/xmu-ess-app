import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { MileageRequestDetailFormProps } from '@mileage/components/request/editor/forms/MileageRequestDetailForm';
import { mileageMessage } from '@mileage/locales/messages/mileageMessage';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const MileageRequestDetailFormView: React.SFC<MileageRequestDetailFormProps> = props => {
  const { formMode } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    // don't show uid & ownerEmployeeUid for new form
    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`mileage.request.field.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(mileageMessage.request.field.submitTitle)}
        subheader={props.intl.formatMessage(mileageMessage.request.field.submitSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};