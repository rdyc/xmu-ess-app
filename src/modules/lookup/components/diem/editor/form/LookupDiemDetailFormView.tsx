import { FormMode } from '@generic/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { LookupDiemDetailFormProps } from './LookupDiemDetailForm';

export const LookupDiemDetailFormView: React.SFC<LookupDiemDetailFormProps> = props => {
  const { formMode, intl } = props;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid & ownerEmployeeUid for new form
    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

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
        title={intl.formatMessage(lookupMessage.lookupDiem.section.infoTitle)}
        // subheader={intl.formatMessage(lookupMessage.lookupDiem.section.infoSubHeader)}
      />
      <CardContent>
        {
          props.context.names.map(name => renderField(name))
        }
      </CardContent>
    </Card>
  );

  return render;
};