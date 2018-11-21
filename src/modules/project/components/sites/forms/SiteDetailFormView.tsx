import * as React from 'react';
import { Field } from 'redux-form';

import { SiteDetailFormProps } from './SiteDetailForm';

export const SiteDetailFormView: React.SFC<SiteDetailFormProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

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