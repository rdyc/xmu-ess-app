import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IPositionDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Card, CardContent, CardHeader, Checkbox, FormControlLabel, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IPositionDetail;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

const positionInformation: React.SFC<AllProps> = props => {
  const { data, intl } = props;

  const render = (
    <Card square >
      <CardHeader
        title={intl.formatMessage(lookupMessage.position.section.infoTitle)}
        subheader={intl.formatMessage(lookupMessage.position.section.infoSubHeader)}
        // title={'Position Information'}
        // subheader={'Position main information'}
      />
      <CardContent >
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.uid)}
          // label={'Position ID'}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.name)}
          // label={'Position Name'}
          value={data.name || 'N/A'}
          multiline
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.symbol)}
          // label={'Symbol'}
          value={data.symbol || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.rate)}
          // label={'Rate'}
          value={props.intl.formatNumber(data.rate || 0)}
        />
        <FormControlLabel
          control={<Checkbox checked={props.data.isActive} />}
          label={props.data.isActive ? 
            props.intl.formatMessage(lookupMessage.position.field.isActive) :
            props.intl.formatMessage(lookupMessage.position.field.isNotActive) }
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(lookupMessage.position.field.createdBy)}
          label={'Created By'}
          value={data.changes && data.changes.created ? data.changes.created.fullName : 'N/A'}
          multiline
        />
      </CardContent>
    </Card>
  );
  return render;
};

export const PositionInformation = compose<AllProps, OwnProps>(
  injectIntl
)(positionInformation);
