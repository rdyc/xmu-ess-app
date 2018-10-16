import { FieldInputCustomer, FieldInputDate, FieldInputNumber, FieldInputText } from '@layout/components/formFields';
import { FieldSelectSystem } from '@layout/components/formFields/FieldSelectSystem';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { BaseFieldsProps, Field } from 'redux-form';
import { isNullOrUndefined } from 'util';

interface OwnProps {
  context: BaseFieldsProps;
  formCurrencyType: string | undefined;
  isCurrencyIdr: boolean;
  onChangeCurrencyType: (event: any, newValue: string, oldValue: string) => void;
  onChangeRate: (event: any, newValue: number, oldValue: number) => void;
  onChangeValueIdr: (event: any, newValue: number, oldValue: number) => void;
}

type AllProps = OwnProps & InjectedIntlProps;

const informationForm: React.SFC<AllProps> = props => {
  const { names } = props.context;
  const { intl, formCurrencyType, isCurrencyIdr, onChangeCurrencyType, onChangeValueIdr, onChangeRate } = props;

  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    
    let fieldProps = {};
  
    switch (fieldName) {
      case 'customerUid': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldInputCustomer
        };
        break;
      
      case 'projectType':
        fieldProps = {
          category: 'project',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldSelectSystem
        };
        break;
  
      case 'currencyType': 
        fieldProps = {
          category: 'currency',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldSelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'start': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldInputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldInputDate
        };
        break;
      
      case 'rate':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: FieldInputNumber,
          onChange: onChangeRate
        };
        break;

      case 'valueUsd':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldInputNumber,
          onChange: onChangeValueIdr
        };
        break;

      case 'valueIdr':
        fieldProps = {
          type: 'number',
          disabled: true,
          component: FieldInputNumber
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: FieldInputText
        };
        break;
    }
  
    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`project.field.${name}`} />}
        {...fieldProps}
      />
    );
  };
    
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

export const InformationForm = injectIntl(informationForm);