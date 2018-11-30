import { FormMode } from '@generic/types';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel } from '@material-ui/core';
import * as React from 'react';
import { Field } from 'redux-form';
import { PositionDetailFormProps } from './PositionDetailForm';

export const PositionDetailFormView: React.SFC<PositionDetailFormProps> = props => {
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
    const fieldnull = ['information'];
    if (fieldnull.indexOf(fieldName) !== -1) {
      return null;
    }

    const fieldIsAllow = ['isAllowMultiple'];
    if (fieldIsAllow.indexOf(fieldName) !== -1) {
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
                    // label=
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
        title={intl.formatMessage(lookupMessage.position.section.infoTitle)}
        subheader={intl.formatMessage(lookupMessage.position.section.infoSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};