import { FormMode } from '@generic/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { CurrencyDetailFormProps } from './CurrencyDetailForm';

export const CurrencyDetailFormView: React.SFC<CurrencyDetailFormProps> = props => {
  const { formMode, intl } = props;
  const { names } = props.context;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

    // don't show uid for new form
    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    const fieldIsActive = ['isActive'];
    if (fieldIsActive.indexOf(fieldName) !== -1) {
      return (
        <FormControlLabel
          {...fieldProps}
          control={
            <Field
              key={fieldName}
              type="checkbox"
              name={fieldName}
              component={
                ({ input, meta }: any) => (
                  <Checkbox
                    {...input}
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
        title={intl.formatMessage(lookupMessage.currency.section.infoTitle)}
        subheader={intl.formatMessage(lookupMessage.currency.section.infoSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};