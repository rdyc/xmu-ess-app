import { FormMode } from '@generic/types';
import { RequestDetailFormProps } from '@leave/components/request/editor/forms/LeaveRequestDetailForm';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
// import { isNullOrUndefined } from 'util';

export const LeaveRequestDetailFormView: React.SFC<RequestDetailFormProps> = props => {
  const { formMode, isRegularType } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

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
        label={<FormattedMessage id={`leave.field.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leave.infoTitle"/>}
        // subheader={<FormattedMessage id="leave.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};