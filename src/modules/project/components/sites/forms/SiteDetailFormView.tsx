import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { SiteDetailFormProps } from './SiteDetailForm';

export const SiteDetailFormView: React.SFC<SiteDetailFormProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`project.site.field.${name}`} />}
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