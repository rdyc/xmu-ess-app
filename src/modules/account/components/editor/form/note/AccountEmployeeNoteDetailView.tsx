import { FormMode } from '@generic/types';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeNoteDetailProps } from './AccountEmployeeNoteDetail';

export const AccountEmployeeNoteDetailView: React.SFC<AccountEmployeeNoteDetailProps> = props => {
  const { formMode } = props;
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
    <div>
      {names.map(name => renderField(name))}
    </div>
  );

  return render;
};