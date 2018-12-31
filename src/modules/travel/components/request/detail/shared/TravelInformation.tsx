import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITravelRequestDetail } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITravelRequestDetail | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(travelMessage.request.section.infoTitle)}
        subheader={props.intl.formatMessage(travelMessage.request.section.infoSubHeader)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.uid)}
          value={data && data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.statusType)}
          value={data && data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.employeeUid)}
          value={data && data.employee ? data.employee.fullName : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.positionUid)}
          value={data && data.position ? data.position.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.destinationType)}
          value={data && data.destination ? data.destination.value : 'N/A'}
        />
        {
          data &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.start)}
            value={intl.formatDate(data.start, GlobalFormat.Date)}
          />
        }
        {
          data &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.end)}
            value={intl.formatDate(data.end, GlobalFormat.Date)}
          />
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.customerUid)}
          value={data && data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.projectUid)}
          value={`${ data && data.projectUid} - ${ data && data.project ? data.project.name : '' }`}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.siteUid)}
          value={data && data.site ? data.site.name : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.activityType)}
          value={data && data.activity ? data.activity.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.objective)}
          value={data && data.objective || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.target)}
          value={data && data.target || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.comment)}
          value={data && data.comment || 'N/A'}
        />        
      </CardContent>
    </Card>
  );
  return render;
};

export const TravelInformation = compose<AllProps, OwnProps>(
  injectIntl
)(travelInformation);