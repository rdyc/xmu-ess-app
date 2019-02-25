import { accountMessage } from '@account/locales/messages/accountMessage';
import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeNoteDetailFormProps } from './AccountEmployeeNoteDetailForm';

export const AccountEmployeeNoteDetailFormView: React.SFC<AccountEmployeeNoteDetailFormProps> = props => {
  const { formMode, intl } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('note.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show id for new form
    const fields = ['id'];
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
        title={intl.formatMessage(accountMessage.shared.section.infoTitle, {state: 'Note'})}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};