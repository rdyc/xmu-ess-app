import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { EntryDetailFormProps } from '@timesheet/components/entry/editor/forms/TimesheetEntryDetailForm';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { Field } from 'redux-form';

export const TimesheetEntryDetailFormView: React.SFC<EntryDetailFormProps> = props => {
  const { formMode, showSiteProject  } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(name);

    // don't show uid for new form
    const fields = ['uid'];
    if (formMode === FormMode.New && fields.indexOf(fieldName) !== -1) {
      return null;
    }

    const fieldsSiteProject = ['siteUid'];
    if (!showSiteProject && fieldsSiteProject.indexOf(fieldName) !== -1) {
      return null;
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
        title={<FormattedMessage id="timesheet.infoTitle"/>}
        subheader={<FormattedMessage id="timesheet.infoSubTitle" />}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};