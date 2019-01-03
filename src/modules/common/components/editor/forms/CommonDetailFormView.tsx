import { CommonCategory } from '@common/classes/types';
import { isWithCompany, isWithParent } from '@common/helper';
import { commonMessage } from '@common/locales/messages/commonMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { CommonDetailFormProps } from './CommonDetailForm';

export const CommonDetailFormView: React.SFC<CommonDetailFormProps> = props => {
  const { intl, category } = props;
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

    const useWithCompany = ['companyUid'];
    if (!isWithCompany(category) && useWithCompany.indexOf(fieldName) !== -1) {
      return null;
    }
    const useWithParent = ['parentCode'];
    if (!isWithParent(category) && useWithParent.indexOf(fieldName) !== -1) {
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
        title={intl.formatMessage(commonMessage.system.section.title)}
        // subheader={intl.formatMessage(commonMessage.system.section.subTitle)}
      />
      <CardContent>
        <TextField
          fullWidth={true}
          InputProps={{
            disableUnderline: true,
            readOnly: true
          }}
          label={props.intl.formatMessage(commonMessage.system.field.category)}
          value={CommonCategory[category]}
        />
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};