import { SelectSystem } from '@common/components/select';
import { InputDate } from '@layout/components/input/date';
import { InputNumber } from '@layout/components/input/number';
import { InputText } from '@layout/components/input/text';
import { InputCustomer } from '@lookup/components/customer/input';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { RegistrationDetailFormProps } from '@project/components/registration/editor/forms/RegistrationDetailForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';
import { isNullOrUndefined } from 'util';

export const RegistrationDetailFormView: React.SFC<RegistrationDetailFormProps> = props => {
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
          component: InputCustomer
        };
        break;
      
      case 'projectType':
        fieldProps = {
          category: 'project',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: SelectSystem
        };
        break;
  
      case 'currencyType': 
        fieldProps = {
          category: 'currency',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: SelectSystem,
          onChange: onChangeCurrencyType
        };
        break;
      
      case 'start': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
        
      case 'end': 
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputDate
        };
        break;
      
      case 'rate':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          disabled: isCurrencyIdr || isNullOrUndefined(formCurrencyType),
          component: InputNumber,
          onChange: onChangeRate
        };
        break;

      case 'valueUsd':
        fieldProps = {
          type: 'number',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputNumber,
          onChange: onChangeValueIdr
        };
        break;

      case 'valueIdr':
        fieldProps = {
          type: 'number',
          disabled: true,
          component: InputNumber
        };
        break;
    
      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({id: `project.field.${name}.placeholder`}),
          component: InputText
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