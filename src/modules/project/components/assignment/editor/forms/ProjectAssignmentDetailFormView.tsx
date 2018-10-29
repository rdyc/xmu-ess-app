import { Card, CardContent, CardHeader } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

import { ProjectAssignmentDetailFormProps } from './ProjectAssignmentDetailForm';

export const ProjectAssignmentDetailFormView: React.SFC<ProjectAssignmentDetailFormProps> = props => {
  const { selectedProject } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    return (
      <Field
        key={fieldName}
        name={fieldName}
        label={<FormattedMessage id={`project.assignment.field.${name}`} />}
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.assignment.section.create.title"/>}
        subheader={<FormattedMessage id="project.assignment.section.create.subHeader" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}

      </CardContent>
        <pre>{JSON.stringify(selectedProject)}</pre>
    </Card>
  );

  return render;
};