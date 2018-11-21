import { IFinanceDetail } from '@finance/classes/response';
import { GlobalFormat } from '@layout/types';
import { Button, Card, CardContent, CardHeader, InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage, InjectedIntlProps, injectIntl } from 'react-intl';
import { compose } from 'recompose';

interface OwnProps {
  data: IFinanceDetail;
  handleToDocument: (moduleUid: string, documentUid: string) => void;
}

type AllProps
  = OwnProps
  & InjectedIntlProps;

export const financeInformation: React.SFC<AllProps> = props => {
  const { data, intl, handleToDocument } = props;

  const styled = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true
    }
  };

  const documentStyle = {
    fullWidth: true,
    InputProps: {
      disableUnderline: true,
      readOnly: true,
      endAdornment: 
        data &&
        <InputAdornment position="end">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => handleToDocument(data.moduleUid, data.documentUid)}
          >
            {<FormattedMessage id="finance.field.button.goToDocument" />}
          </Button>
        </InputAdornment>
      
    }
  };

  const render = (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="finance.infoTitle"/>}
        subheader={<FormattedMessage id="finance.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.uid" />}
          value={data.uid}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.moduleName" />}
          value={data.module ? data.module.value : 'N/A'}
        />
        <TextField
          {...documentStyle}
          margin="normal"
          label={<FormattedMessage id="finance.field.documentUid" />}
          value={data.documentUid ? data.documentUid : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.requestor" />}
          value={data.document.changes.created ? data.document.changes.created.fullName : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.approvalDate" />}
          value={data.document.changes.updatedAt ? 
            intl.formatDate(data.document.changes.updatedAt, GlobalFormat.Date) : ''}
        />
        {
          (data.document.amount &&
          data.document.amount.advance) &&
          <TextField
            {...styled}
            margin="normal"
            label={<FormattedMessage id="finance.field.advance" />}
            value={intl.formatNumber(data.document.amount.advance || 0)}
          /> || ''
        }
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.total" />}
          value={data.document.amount ?
            intl.formatNumber(data.document.amount.total || 0) : 0}
        />
        <TextField
          {...styled}
          margin="normal"
          label={<FormattedMessage id="finance.field.status" />}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...styled}
          margin="normal"
          multiline
          label={<FormattedMessage id="finance.field.notes" />}
          value={data.notes || 'N/A'}
        />
      </CardContent>
    </Card>
  );

  return render;
};

export const FinanceInformation = compose<AllProps, OwnProps>(
  injectIntl
)(financeInformation);