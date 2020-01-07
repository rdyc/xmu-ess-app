import { IEmployeeExperience } from '@account/classes/response/employeeExperience';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeExperience;
  employeeUid: string;
}

type AllProps
  = IOwnProps
  & InjectedIntlProps;

const accountEmployeeExperienceSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.employeeUid)}
        value={props.employeeUid}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.uid)}
        value={props.data.uid}
      />
    </Grid>
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
        label={props.intl.formatMessage(accountMessage.experience.field.start)}
        value={props.data.start}
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.experience.field.end)}
        value={props.data.end ? props.data.end : 'N/A'}
      />
    </Grid>
    {
      props.data.changes &&
      <Grid item xs={12} sm={6} md={3}>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(layoutMessage.field.createdBy)}
          value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
          helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
        />

        {
          (props.data.changes.updated && props.data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={props.data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </Grid>
    }
  </Grid>
);

export const AccountEmployeeExperienceSummary = compose<AllProps, IOwnProps>(injectIntl)(accountEmployeeExperienceSummary);