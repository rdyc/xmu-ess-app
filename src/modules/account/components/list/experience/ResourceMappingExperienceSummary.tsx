import { IEmployeeExperience, IEmployeeExperienceCompetency } from '@account/classes/response/employeeExperience';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeExperience;
}

type AllProps
  = IOwnProps
  & InjectedIntlProps;

const listCompetencies = (data: IEmployeeExperienceCompetency[]) => {
  const competencies: string[] = [];
  data.map(item => {
    if (item.competency) {
      competencies.push(item.competency.value);
    }}
  );

  return competencies.join();
};

const resourceMappingExperienceSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.company)}
        value={props.data.company}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.position)}
        value={props.data.position}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.profession)}
        value={props.data.profession && props.data.profession.value || 'N/A'}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        multiline
        label={props.intl.formatMessage(accountMessage.experience.field.competencies)}
        value={props.data.competencies && listCompetencies(props.data.competencies) || 'N/A'}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
    <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.date)}
        value={`${props.data.start} - ${props.data.end}`}
      />
    </Grid>
  </Grid>
);

export const ResourceMappingExperienceSummary = compose<AllProps, IOwnProps>(injectIntl)(resourceMappingExperienceSummary);