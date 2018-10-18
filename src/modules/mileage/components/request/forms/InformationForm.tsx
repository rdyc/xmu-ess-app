import { FieldInputText } from '@layout/components/formFields';
import { FieldSelectSystem } from '@layout/components/formFields/FieldSelectSystem';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { BaseFieldsProps, Field } from 'redux-form';

interface OwnProps {
  context: BaseFieldsProps;
  // onChangeYear
  // onChangeMonth
}

type AllProps = OwnProps & InjectedIntlProps;

const informationForm: React.SFC<AllProps> = props => {
  const { names } = props.context;
  const { intl } = props;

  const renderField = (name: string) => {
    const fieldName = name.replace('information', '');

    let fieldProps = {};

    switch (fieldName) {
      case 'year':
        fieldProps = {
          category: 'year',
          placeholder: intl.formatMessage({
            id: `mileage.request.field.${name}.placeholder`
          }),
          component: FieldSelectSystem
        };
        break;

      case 'month':
        fieldProps = {
          category: 'month',
          placeholder: intl.formatMessage({
            id: `mileage.request.field.${name}.placeholder`
          }),
          component: FieldSelectSystem
        };
        break;

      default:
        fieldProps = {
          type: 'text',
          placeholder: intl.formatMessage({
            id: `mileage.request.field.${name}.placeholder`
          }),
          component: FieldInputText
        };
        break;
    }

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`mileage.request.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader
        title={<FormattedMessage id="mileage.request.infoTitle" />}
        subheader={<FormattedMessage id="mileage.request.infoSubTitle" />}
      />
      <CardContent>{names.map(name => renderField(name))}</CardContent>
    </Card>
  );

  return render;
};

export const InformationForm = injectIntl(informationForm);
