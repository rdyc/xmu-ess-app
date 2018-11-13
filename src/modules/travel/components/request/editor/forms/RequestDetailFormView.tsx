import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { RequestDetailFormProps } from '@travel/components/request/editor/forms/RequestDetailForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const RequestDetailFormView: React.SFC<RequestDetailFormProps> = props => {
  const { formMode, isProjectSelected } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    const fieldsSite = ['siteUid'];
    if (!isProjectSelected && fieldsSite.indexOf(fieldName) !== -1) {
        return null;
    }  
    
    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`travel.field.${name}`} />}
        {...fieldProps}
      />
    );    
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.infoTitle"/>}
        subheader={<FormattedMessage id="travel.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};
