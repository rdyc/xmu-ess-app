import { FormMode } from '@generic/types';
import { Card, CardContent, CardHeader } from '@material-ui/core';
import { EntryDetailFormProps } from '@timesheet/components/entry/editor/forms/TimesheetEntryDetailForm';
import { timesheetMessage } from '@timesheet/locales/messages/timesheetMessage';
import * as React from 'react';
import { Field } from 'redux-form';

export const TimesheetEntryDetailFormView: React.SFC<EntryDetailFormProps> = props => {
  const { formMode, showSiteProject, intl  } = props;
  const { names } = props.context;
  
  const renderField = (name: string) => {
    const fieldName = name.replace('information.', '');
    const fieldProps = props.generateFieldProps(fieldName);

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
        {...fieldProps}
      />
    );
  };

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(timesheetMessage.entry.section.infoTitle)}
        subheader={intl.formatMessage(timesheetMessage.entry.section.infoSubHeader)}
      />
      <CardContent>
        {names.map(name => renderField(name))}
      </CardContent>
    </Card>
  );

  return render;
};