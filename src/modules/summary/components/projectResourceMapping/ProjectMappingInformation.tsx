import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { TextField } from '@material-ui/core';
import { ISummaryMappingProject } from '@summary/classes/response/mapping';
import { summaryMessage } from '@summary/locales/messages/summaryMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnOption {
  employeeName: string;
  data: ISummaryMappingProject;
}

type AllProps = IOwnOption & InjectedIntlProps;

const projectMappingInformation: React.SFC<AllProps> = props => {
  const { data, intl, employeeName } = props;

  const render = (
    <React.Fragment>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.employeeName)}
        value={employeeName}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectId)}
        value={data.uid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectOwner)}
        value={data.ownerEmployee && data.ownerEmployee.fullName || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectCustomer)}
        value={data.customer && data.customer.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectType)}
        value={data.project && data.project.value}
      />
      <TextField
        multiline
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectName)}
        value={data.name}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        multiline
        margin="dense"
        label={intl.formatMessage(
          summaryMessage.mapping.field.projectDescription
        )}
        value={data.description || 'N/A'}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectStart)}
        value={intl.formatDate(data.start, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.projectEnd)}
        value={intl.formatDate(data.end, GlobalFormat.Date)}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.allocatedMandays)}
        value={data.allocatedMandays}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={intl.formatMessage(summaryMessage.mapping.field.actualMandays)}
        value={data.actualMandays}
      />
    </React.Fragment>
  );

  return render;
};

export const ProjectMappingInformation = compose<AllProps, IOwnOption>(
  injectIntl
)(projectMappingInformation);
