import { FormMode } from '@generic/types';
import { RequestDetailFormProps } from '@lookup/components/holiday/editor/forms/LookupHolidayDetailForm';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';

export const LookupHolidayDetailFormView: React.SFC<RequestDetailFormProps> = props => {
  const { formMode, intl } = props;
  const { names } = props.context;
  
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
        title={intl.formatMessage(lookupMessage.holiday.section.infoTitle)}
        subheader={intl.formatMessage(lookupMessage.holiday.section.infoSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};