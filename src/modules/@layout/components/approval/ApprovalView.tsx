import { Button, Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { ApprovalProps } from './Approval';

export const ApprovalView: React.SFC<ApprovalProps> = props => {
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`global.form.approval.field.${fieldName}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="global.form.approval.title"/>}
        subheader={<FormattedMessage id="global.form.approval.subHeader" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
      <Button 
        type="submit"
        color="secondary"
        disabled={!props.valid || props.submitting}
      >
        <FormattedMessage id={props.submitting ? 
          props.labelProcessing || 'global.processing' 
          : 
          props.labelSubmit || 'global.action.submit' } 
        />
      </Button>
    </Card>
  );

  return render;
};