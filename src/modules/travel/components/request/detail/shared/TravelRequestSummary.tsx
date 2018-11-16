import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITravelRequestDetail } from '@travel/classes/response';
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
            label={<FormattedMessage id="travel.field.information.totalDuration" />}
            value={intl.formatNumber(data.summary ? data.summary.totalDuration : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.totalDiemValue" />}
            value={intl.formatNumber(data.summary ? data.summary.totalDiemValue : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.costTransport" />}
            value={intl.formatNumber(data.summary ? data.summary.totalCostTransport : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.costHotel" />}
            value={intl.formatNumber(data.summary ? data.summary.totalCostHotel : 0)}
          />
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.total" />}
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