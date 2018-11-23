import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, Grid, TextField, Typography } from '@material-ui/core';
import { ITravelRequestDetail, ITravelSettlementDetail } from '@travel/classes/response';
import { travelMessage } from '@travel/locales/messages/travelMessage';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITravelSettlementDetail;
  travelData: ITravelRequestDetail | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelSettlementSummary: React.SFC<AllProps> = props => {
  const { data, intl, travelData } = props;

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travelSettlement.summaryTitle" />}
        subheader={<FormattedMessage id="travelSettlement.summarySubTitle" />}
      />
      <CardContent>
        <Grid container spacing={8}>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <FormattedMessage id="travelSettlement.subTitleSummary"/>
            </Typography>        
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalDuration)}
              value={intl.formatNumber(data.summary ? data.summary.totalDuration : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalDiemValue)}
              value={intl.formatNumber(data.summary ? data.summary.totalDiemValue : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalTransportCost)}
              value={intl.formatNumber(data.summary ? data.summary.totalCostTransport : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalHotelCost)}
              value={intl.formatNumber(data.summary ? data.summary.totalCostHotel : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.total)}
              value={intl.formatNumber(data.total || 0)}
        />
        </Grid>
          <Grid item xs={12} md={6}>
            <Typography variant="body2">
              <FormattedMessage id="travel.subTitleSummary"/>
            </Typography>         
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalDuration)}
              value={intl.formatNumber(travelData && travelData.summary ? travelData.summary.totalDuration : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalDiemValue)}
              value={intl.formatNumber(travelData && travelData.summary ? travelData.summary.totalDiemValue : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalTransportCost)}
              value={intl.formatNumber(travelData && travelData.summary ? travelData.summary.totalCostTransport : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.totalHotelCost)}
              value={intl.formatNumber(travelData && travelData.summary ? travelData.summary.totalCostHotel : 0)}
            />
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              margin="dense"
              label={props.intl.formatMessage(travelMessage.request.field.total)}
              value={intl.formatNumber(travelData && travelData.total || 0)}
          />
          </Grid>
        </Grid>        
      </CardContent>
    </Card>
  );
  return render;
};

export const TravelSettlementSummary = compose<AllProps, OwnProps>(
  injectIntl
)(travelSettlementSummary);