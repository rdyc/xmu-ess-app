import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { GalleryDetailFormProps } from './GalleryDetailForm';

export const GalleryDetailFormView: React.SFC<GalleryDetailFormProps> = props => {
  const { intl } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('files.', '');
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
    <Card square>
      <CardHeader 
        title={intl.formatMessage(lookupMessage.gallery.section.infoTitle)}
        subheader={intl.formatMessage(lookupMessage.gallery.section.infoSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};