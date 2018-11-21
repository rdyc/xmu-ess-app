import { IFinanceDetail } from '@finance/classes/response';
import { financeMessages } from '@finance/locales/messages/financeMessages';
import { GlobalFormat } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Button, Card, CardContent, CardHeader, InputAdornment, TextField } from '@material-ui/core';
import * as React from 'react';
import { InjectedIntlProps, injectIntl } from 'react-intl';
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

  const documentStyle = {
    InputProps: {
      endAdornment: 
        data &&
        <InputAdornment position="end">
          <Button
            variant="outlined"
            color="primary"
            size="large"
            onClick={() => handleToDocument(data.moduleUid, data.documentUid)}
          >
            {intl.formatMessage(financeMessages.approval.field.goToDocument)}
          </Button>
        </InputAdornment>
      
    }
  };

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(financeMessages.approval.section.infoTitle)}
        subheader={intl.formatMessage(financeMessages.approval.section.infoSubTitle)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.uid)}
          value={data.uid}
        />
        <TextField
          
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.moduleName)}
          value={data.module ? data.module.value : 'N/A'}
        />
        <TextField
          {...documentStyle}
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.documentUid)}
          value={data.documentUid ? data.documentUid : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.requestor)}
          value={data.document.changes.created ? data.document.changes.created.fullName : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.approvalDate)}
          value={data.document.changes.updatedAt ? 
            intl.formatDate(data.document.changes.updatedAt, GlobalFormat.Date) : ''}
        />
        {
          (data.document.amount &&
          data.document.amount.advance) &&
          <TextField
          {...GlobalStyle.TextField.ReadOnly}
            label={intl.formatMessage(financeMessages.approval.field.advance)}
            value={intl.formatNumber(data.document.amount.advance || 0)}
          /> || ''
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.total)}
          value={data.document.amount ?
            intl.formatNumber(data.document.amount.total || 0) : 0}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessages.approval.field.status)}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={intl.formatMessage(financeMessages.approval.field.notes)}
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