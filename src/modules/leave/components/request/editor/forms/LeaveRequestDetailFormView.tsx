import { FormMode } from '@generic/types';
import { RequestDetailFormProps } from '@leave/components/request/editor/forms/LeaveRequestDetailForm';
import { leaveMessage } from '@leave/locales/messages/leaveMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';

export const LeaveRequestDetailFormView: React.SFC<RequestDetailFormProps> = props => {
  const { formMode, isRegularType, intl } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid & ownerEmployeeUid for new form
    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    const fieldsRegular = ['regularType'];
    if (!isRegularType && fieldsRegular.indexOf(fieldName) !== -1) {
      return null;
    }

    const fieldsEnd = ['end'];
    if (isRegularType && fieldsEnd.indexOf(fieldName) !== -1) {
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
        title={intl.formatMessage(leaveMessage.request.section.infoTitle)}
        // subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};