import { IEmployeeTraining } from '@account/classes/response/employeeTraining';
import { accountMessage } from '@account/locales/messages/accountMessage';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Grid, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface IOwnProps {
  data: IEmployeeTraining;
}

type AllProps
  = IOwnProps
  & InjectedIntlProps;

const resourceMappingTrainingSummary: React.SFC<AllProps> = props => (
  <Grid container>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.training.field.name)}
        value={props.data.name}
        multiline
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.training.field.trainingType)}
        value={props.data.training ? props.data.training.value : 'N/A'}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.training.field.organizer)}
        value={props.data.organizer}
        multiline
      />
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.training.field.certificationType)}
        value={props.data.certification ? props.data.certification.value : 'N/A'}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.training.field.start)}
        value={props.intl.formatDate(props.data.start, GlobalFormat.Date)}
      />
    </Grid>
    <Grid item xs={12} sm={6} md={3}>
      <TextField
        {...GlobalStyle.TextField.ReadOnly}
        margin="dense"
        label={props.intl.formatMessage(accountMessage.training.field.end)}
        value={props.data.end ? props.intl.formatDate(props.data.end, GlobalFormat.Date) : 'N/A'}
      />
    </Grid>
  </Grid>
);

export const ResourceMappingTrainingSummary = compose<AllProps, IOwnProps>(injectIntl)(resourceMappingTrainingSummary);