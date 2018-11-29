import { commonMessage } from '@common/locales/messages/commonMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { CommonDetailFormProps } from './CommonDetailForm';

export const CommonDetailFormView: React.SFC<CommonDetailFormProps> = props => {
  const { intl } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid for new form
    const checkBox = ['isActive'];
    if (checkBox.indexOf(fieldName) !== -1) {
      return (
        <FormControlLabel
          label={intl.formatMessage(commonMessage.system.field.isActive)}                    
          control={
          <Field
            type="checkbox"
            name={fieldName}
            component={
              ({ input, meta }: any) => (
                <Checkbox 
                  {...input}
                  value={fieldName}
                  disabled={meta.submitting}
                  onFocus={undefined}
                  onBlur={undefined}
                />
              )
            }
          />
        } 
        />
      );
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
        title={intl.formatMessage(commonMessage.system.section.title)}
        subheader={intl.formatMessage(commonMessage.system.section.subTitle)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};