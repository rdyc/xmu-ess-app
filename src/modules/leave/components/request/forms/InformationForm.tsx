import { FieldInputDate, FieldInputLeave, FieldInputText } from '@layout/components/formFields';
import { FieldSelectSystem } from '@layout/components/formFields/FieldSelectSystem';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { BaseFieldsProps, Field } from 'redux-form';

interface OwnProps {
  context: BaseFieldsProps;
}

type AllProps = OwnProps & InjectedIntlProps;

const informationForm: React.SFC<AllProps> = props => {
  const { names } = props.context;
  const { intl } = props;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    
    let fieldProps = {};

    switch (fieldName) {    
      case 'leaveType':
        fieldProps = {
          category: 'leave',
          placeholder: intl.formatMessage({id: `leaveRequest.field.${name}.placeholder`}),
          component: FieldSelectSystem
        };
        break;

      case 'regularType':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `leaveRequest.field.${name}.placeholder`}),
          component: FieldInputLeave
        };
        break;
      
      case 'start': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `leaveRequest.field.${name}.placeholder`}),
          component: FieldInputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `leaveRequest.field.${name}.placeholder`}),
          component: FieldInputDate
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `leaveRequest.field.${name}.placeholder`}),
          component: FieldInputText
        };
        break;
    }
  
    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`leaveRequest.field.${name}`} />}
        {...fieldProps}
      />
    );
  };
    
  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="leaveRequest.infoTitle"/>}
        subheader={<FormattedMessage id="leaveRequest.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};

export const InformationForm = injectIntl(informationForm);