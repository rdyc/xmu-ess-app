import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITravelRequestDetail } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITravelRequestDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelRequestSummary: React.SFC<AllProps> = props => {
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
        title={<FormattedMessage id="travel.summaryTitle" />}
        subheader={<FormattedMessage id="travel.summarySubTitle" />}
      />
      <CardContent>      
          <TextField
            {...styled}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.totalDuration)}
            value={intl.formatNumber(data.summary ? data.summary.totalDuration : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.totalDiemValue)}
            value={intl.formatNumber(data.summary ? data.summary.totalDiemValue : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.totalTransportCost)}
            value={intl.formatNumber(data.summary ? data.summary.totalCostTransport : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.totalHotelCost)}
            value={intl.formatNumber(data.summary ? data.summary.totalCostHotel : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={props.intl.formatMessage(travelMessage.request.field.total)}
            value={intl.formatNumber(data.total || 0)}
        />        
      </CardContent>
    </Card>
  );
  return render;
};

export const TravelRequestSummary = compose<AllProps, OwnProps>(
  injectIntl
)(travelRequestSummary);