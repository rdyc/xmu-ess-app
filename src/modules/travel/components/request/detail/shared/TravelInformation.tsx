import { Card, CardContent, CardHeader, TextField } from '@material-ui/core';
import { ITravelRequestDetail } from '@travel/classes/response';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: ITravelRequestDetail | undefined;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const travelInformation: React.SFC<AllProps> = props => {
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
        title={<FormattedMessage id="travel.infoTitle"/>}
        subheader={<FormattedMessage id="travel.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.uid" />}
          value={data && data.uid}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.statusType" />}
          value={data && data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.requestor" />}
          value={data && data.employee ? data.employee.fullName : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.positionUid" />}
          value={data && data.position ? data.position.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.destinationType" />}
          value={data && data.destination ? data.destination.value : 'N/A'}
        />
        {
          data &&
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.end" />}
            value={intl.formatDate(data.end , {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          />
        }
        {
          data &&
          <TextField
            {...styled}
            margin="dense"
            label={<FormattedMessage id="travel.field.information.end" />}
            value={intl.formatDate(data.end , {
              year: 'numeric',
              month: 'short',
              day: 'numeric'
            })}
          />
        }
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.customerUid" />}
          value={data && data.customer ? data.customer.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.projectUid" />}
          value={data && data.project ? data.project.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.siteUid" />}
          value={data && data.site ? data.site.name : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.activityType" />}
          value={data && data.activity ? data.activity.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.objective" />}
          value={data && data.objective || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.target" />}
          value={data && data.target || 'N/A'}
        />
        <TextField
          {...styled}
          margin="dense"
          label={<FormattedMessage id="travel.field.information.comment" />}
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