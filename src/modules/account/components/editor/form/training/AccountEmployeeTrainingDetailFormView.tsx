import { FormMode } from '@generic/types';
import * as React from 'react';
import { Field } from 'redux-form';
import { AccountEmployeeTrainingDetailFormProps } from './AccountEmployeeTrainingDetailForm';

export const AccountEmployeeTrainingDetailFormView: React.SFC<AccountEmployeeTrainingDetailFormProps> = props => {
  const { formMode } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid for new form
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
    <div>
      { names.map(name => renderField(name)) }
    </div>
    // <Card square>
    //   <CardHeader 
    //     title={intl.formatMessage(accountMessage.training.section.title)}
    //     // subheader={intl.formatMessage(accountMessage.training.section.subHeader)}
    //   />
    //   <CardContent>
    //   </CardContent>
    // </Card>
  );

  return render;
};