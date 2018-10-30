import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITravelSettlementDetail } from '@travel/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITravelSettlementDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelSettlementSummary: React.SFC<AllProps> = props => {
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
        title={<FormattedMessage id="travelSettlement.summaryTitle" />}
        subheader={<FormattedMessage id="travelSettlement.summarySubTitle" />}
      />
      <CardContent>
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.siteValue" />}
            value={intl.formatNumber(data.site ? data.site.value : 0)}
          />        
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

export const TravelSettlementSummary = compose<AllProps, OwnProps>(
  injectIntl
)(travelSettlementSummary);