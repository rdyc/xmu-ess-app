import { GlobalFormat } from '@layout/types';
import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITravelSettlementDetail } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITravelSettlementDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelSettlementInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const render = (
    <Card square>
      <CardHeader 
        title={props.intl.formatMessage(travelMessage.settlement.section.infoTitle)}
        subheader={props.intl.formatMessage(travelMessage.settlement.section.infoSubHeader)}
      />
      <CardContent>
      <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.settlement.field.uid)}
          value={data.uid}
        />
    
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.statusType)}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.employeeUid)}
          value={data.employee ? data.employee.fullName : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.positionUid)}
          value={data.position ? data.position.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.destinationType)}
          value={data.destination ? data.destination.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.start)}
          value={intl.formatDate(data.start, GlobalFormat.Date)}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.end)}
          value={intl.formatDate(data.end, GlobalFormat.Date)}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.customerUid)}
          value={data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.projectUid)}
          value={data.project ? data.project.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.siteUid)}
          value={data.site ? data.site.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.activityType)}
          value={data.activity ? data.activity.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.objective)}
          value={data.objective || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.target)}
          value={data.target || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={props.intl.formatMessage(travelMessage.request.field.comment)}
          value={data.comment || 'N/A'}
        />      
      </CardContent>
    </Card>
  );
  return render;
};

export const TravelSettlementInformation = compose<AllProps, OwnProps>(
  injectIntl
)(travelSettlementInformation);