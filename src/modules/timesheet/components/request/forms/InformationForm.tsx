import { FieldInputCustomer, FieldInputDate, FieldInputText, FieldInputTime } from '@layout/components/formFields';
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
      case 'activityType':
        fieldProps = {
          category: 'activity',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: FieldSelectSystem
        };
        break;

      case 'customerUid':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: FieldInputCustomer
        };
        break;

      case 'date':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: FieldInputDate
        };
        break;

      case 'start':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: FieldInputTime
        };
        break;
      
      case 'end':
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: FieldInputTime
        };
        break;

      // case 'projectUid':
      //   fieldProps = {
      //     type: 'text',
      //     placeholder: intl.formatMessage({id: `expense.field.${name}.placeholder`}),
      //     component: FieldSelectProject
      //   };
      //   break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({ id: `timesheet.field.${name}.placeholder` }),
          component: FieldInputText
        };
        break;
    }

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`timesheet.field.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="timesheet.infoTitle" />}
        subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );
  return render;
};
export const InformationForm = injectIntl(informationForm);