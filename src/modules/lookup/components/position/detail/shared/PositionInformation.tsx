import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat } from '@layout/types';
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

  // const allowedStatusStyle: TextFieldProps = {
  //   fullWidth: true,
  //   margin: 'dense',
  //   InputProps: {
  //     disableUnderline: true,
  //     readOnly: true,
  //     endAdornment:
  //       data &&
  //       <InputAdornment position="end">
  //         <Button
  //           color={data.isAllowMultiple ? 'primary' : 'secondary'}>
  //             {
  //               data.isAllowMultiple ?
  //               intl.formatMessage(lookupMessage.position.field.isAllowed) :
  //               intl.formatMessage(lookupMessage.position.field.isNotAllowed)
  //             }
  //           </Button>
  //       </InputAdornment>
  //   }
  // };

  const render = (
    <Card square >
      <CardHeader
        title={intl.formatMessage(lookupMessage.position.section.infoTitle)}
        // subheader={intl.formatMessage(lookupMessage.position.section.infoSubHeader)}
      />
      <CardContent >
        <TextField
          // {...allowedStatusStyle}
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(lookupMessage.position.field.uid)}
          value={data.uid}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.companyUid)}
          value={data.company && data.company.name || 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          multiline
          label={intl.formatMessage(lookupMessage.position.field.name)}
          value={data.name}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={intl.formatMessage(lookupMessage.position.field.description)}        
          value={data.description || 'N/A'}
          multiline
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          margin="dense"
          label={props.intl.formatMessage(lookupMessage.position.field.inactiveDate)}
          value={data.inactiveDate ? props.intl.formatDate(data.inactiveDate, GlobalFormat.Date) : 'N/A'}
        />
        <FormControlLabel
          control={ <Checkbox checked={props.data.isAllowMultiple} /> }
          label={props.intl.formatMessage(lookupMessage.position.field.isAllowMultiple)}
        />
        <br/>
        <FormControlLabel
          control={ <Checkbox checked={props.data.isExpired} /> }
          label={props.intl.formatMessage(lookupMessage.position.field.expireStatus)}
        />
        {
          props.data.changes &&
          <React.Fragment>
            <TextField
              {...GlobalStyle.TextField.ReadOnly}
              label={props.intl.formatMessage(layoutMessage.field.createdBy)}
              value={props.data.changes.created && props.data.changes.created.fullName || 'N/A'}
              helperText={props.intl.formatDate(props.data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
            />

            {
              (props.data.changes.updated && props.data.changes.updatedAt) &&
              <TextField
                {...GlobalStyle.TextField.ReadOnly}
                label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
                value={props.data.changes.updated.fullName || 'N/A'}
                helperText={props.intl.formatDate(props.data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
              />
            }
          </React.Fragment>
        }
      </CardContent>
    </Card>
  );
  return render;
};

export const PositionInformation = compose<AllProps, OwnProps>(
  injectIntl
)(positionInformation);
