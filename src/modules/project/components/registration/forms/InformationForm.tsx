import { FieldInputText } from '@layout/components/formFields';
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
        {names.map(name => {
          
          return (
            <Field
              key={name}
              name={name}
              label={<FormattedMessage id={`project.field.${name}`} />}
              component={FieldInputText}
            />
          );
        })}
      </CardContent>
    </Card>
  );

  return render;
};

export default informationForm;