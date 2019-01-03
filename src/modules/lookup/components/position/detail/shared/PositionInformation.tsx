import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { IPositionDetail } from '@lookup/classes/response';
import { lookupMessage } from '@lookup/locales/messages/lookupMessage';
import { Button, Card, CardContent, CardHeader, Checkbox, FormControlLabel, InputAdornment, TextField } from '@material-ui/core';
import { TextFieldProps } from '@material-ui/core/TextField';
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

  const allowedStatusStyle: TextFieldProps = {
    fullWidth: true,
    margin: 'dense',
    InputProps: {
      disableUnderline: true,
      readOnly: true,
      endAdornment:
        data &&
        <InputAdornment position="end">
          <Button
            color={data.isAllowMultiple ? 'primary' : 'secondary'}>
              {
                data.isAllowMultiple ?
                intl.formatMessage(lookupMessage.position.field.isAllowed) :
                intl.formatMessage(lookupMessage.position.field.isNotAllowed)
              }
            </Button>
        </InputAdornment>
    }
  };

  const render = (
    <Card square >
      <CardHeader
        title={intl.formatMessage(lookupMessage.position.section.infoTitle)}
        // subheader={intl.formatMessage(lookupMessage.position.section.infoSubHeader)}
      />
      <CardContent >
        <TextField
          {...allowedStatusStyle}
          label={intl.formatMessage(lookupMessage.position.field.uid)}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.name)}
          value={data.name || 'N/A'}
          multiline
        />
        {
          data.description ?
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            margin="dense"
            label={intl.formatMessage(lookupMessage.position.field.description)}        
            value={data.description}
            multiline
          />
          : ''
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.companyUid)}
          value={data.company && data.company.name || data.companyUid}
        />
        <FormControlLabel
          control={<Checkbox checked={!props.data.isExpired} />}
          label={props.data.isExpired ? 
            props.intl.formatMessage(lookupMessage.position.field.isExpired) :
            props.intl.formatMessage(lookupMessage.position.field.isNotExpired) }
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.inactiveDate)}
          // label={'Rate'}
          value={data.inactiveDate ? 
            intl.formatDate(data.inactiveDate, GlobalFormat.Date) : intl.formatMessage(lookupMessage.position.field.indefinitely)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          // label={intl.formatMessage(lookupMessage.position.field.createdBy)}
          label={props.intl.formatMessage(lookupMessage.position.field.createdBy)}
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
