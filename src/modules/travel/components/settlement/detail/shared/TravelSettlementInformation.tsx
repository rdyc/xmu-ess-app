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
        title={<FormattedMessage id="travelSettlement.infoTitle"/>}
        subheader={<FormattedMessage id="travelSettlement.infoSubTitle" />}
      />
      <CardContent>
      <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.uid" />}
          value={data.uid}
        />
    
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.statusType" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.requestor" />}
          value={data.employee ? data.employee.fullName : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.positionUid" />}
          value={data.position ? data.position.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.destinationType" />}
          value={data.destination ? data.destination.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.start" />}
          value={intl.formatDate(data.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.end" />}
          value={intl.formatDate(data.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.customerUid" />}
          value={data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.projectUid" />}
          value={data.project ? data.project.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.siteUid" />}
          value={data.site ? data.site.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.activityType" />}
          value={data.activity ? data.activity.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.objective" />}
          value={data.objective || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.target" />}
          value={data.target || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.comment" />}
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