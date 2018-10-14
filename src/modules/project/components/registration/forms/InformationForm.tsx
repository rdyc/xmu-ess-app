import { FieldInputCustomer, FieldInputDate, FieldInputNumber, FieldInputText } from '@layout/components/formFields';
import { FieldSelectSystem } from '@layout/components/formFields/FieldSelectSystem';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { BaseFieldsProps, Field } from 'redux-form';

interface OwnProps {
  context: BaseFieldsProps;
}

type AllProps = OwnProps;

const informationForm: React.SFC<AllProps> = props => {
  const { names } = props.context;
    
  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.infoTitle"/>}
        subheader={<FormattedMessage id="project.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};

const renderField = (name: string) => {
  let fieldProps = {};

  switch (name) {
    case 'customerUid': 
      fieldProps = {
        type: 'text',
        component: FieldInputCustomer
      };
      break;
    
    case 'projectType':
      fieldProps = {
        category: 'project',
        component: FieldSelectSystem
      };
      break;

    case 'currencyType': 
      fieldProps = {
        category: 'currency',
        component: FieldSelectSystem
      };
      break;
    
    case 'start': 
    case 'end': 
      fieldProps = {
        type: 'text',
        component: FieldInputDate
      };
      break;
    
    case 'rate':
    case 'valueIdr': 
    case 'valueUsd':
      fieldProps = {
        type: 'number',
        component: FieldInputNumber
      };
      break;
  
    default:
      fieldProps = {
        type: 'text',
        component: FieldInputText
      };
      break;
      
  }

  return (
    <Field
      key={name}
      name={name}
      label={<FormattedMessage id={`project.field.${name}`} />}
      {...fieldProps}
    />
  );
};

export default informationForm;