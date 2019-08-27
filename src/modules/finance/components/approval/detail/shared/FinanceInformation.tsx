import { IFinanceDetail } from '@finance/classes/response';
import { financeMessage } from '@finance/locales/messages/financeMessage';
import { layoutMessage } from '@layout/locales/messages';
import { GlobalFormat, ModuleDefinitionType } from '@layout/types';
import { GlobalStyle } from '@layout/types/GlobalStyle';
import { Card, CardContent, CardHeader, IconButton, InputAdornment, TextField, Tooltip } from '@material-ui/core';
import { StandardTextFieldProps } from '@material-ui/core/TextField';
import { Description } from '@material-ui/icons';
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

  const documentStyle: Partial<StandardTextFieldProps> = {
    fullWidth: true,
    margin: 'dense',
    InputProps: {
      disableUnderline: true,
      readOnly: true,
      endAdornment: 
        data &&
        <InputAdornment position="end">
          <Tooltip
            title={intl.formatMessage(financeMessage.approval.field.goToDocument)}
            >
            <IconButton
              color="secondary"
              onClick={() => handleToDocument(data.moduleUid, data.documentUid)}
            >
              <Description />
            </IconButton>
          </Tooltip>
        </InputAdornment>
      
    }
  };

  const render = (
    <Card square>
      <CardHeader 
        title={intl.formatMessage(financeMessage.approval.section.infoTitle)}
        // subheader={intl.formatMessage(financeMessage.approval.section.infoSubTitle)}
      />
      <CardContent>
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessage.approval.field.uid)}
          value={data.uid}
        />
        <TextField
          
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessage.approval.field.moduleName)}
          value={data.module ? data.module.value : 'N/A'}
        />
        <TextField
          {...documentStyle}
          label={intl.formatMessage(financeMessage.approval.field.documentUid)}
          value={data.documentUid ? data.documentUid : 'N/A'}
        />
        {
          (data.document && data.document.documentNotes) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline
            label={
              data.moduleUid === ModuleDefinitionType.Expense &&
              intl.formatMessage(financeMessage.approval.field.notesExpense) ||
              data.moduleUid === ModuleDefinitionType.Mileage &&
              intl.formatMessage(financeMessage.approval.field.notesMileage)
            }
            value={data.document.documentNotes}
          />
        }
        {
          (data.document && data.document.approvalNotes) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            multiline
            label={intl.formatMessage(financeMessage.approval.field.approvalNotes)}
            value={data.document.approvalNotes}
          />
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessage.approval.field.requestor)}
          value={data.document && data.document.changes && data.document.changes.created ? data.document.changes.created.fullName : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessage.approval.field.approvalDate)}
          value={data.document && data.document.changes && data.document.changes.updatedAt ? 
            intl.formatDate(data.document.changes.updatedAt, GlobalFormat.Date) : ''}
        />
        {
          (data.document && data.document.amount && data.document.amount.advance) &&
          <TextField
          {...GlobalStyle.TextField.ReadOnly}
            label={intl.formatMessage(financeMessage.approval.field.advance)}
            value={intl.formatNumber(data.document.amount.advance, GlobalFormat.CurrencyDefault)}
          /> || ''
        }
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessage.approval.field.total)}
          value={data.document && data.document.amount && data.document.amount.total &&
            intl.formatNumber(data.document.amount.total, GlobalFormat.CurrencyDefault) || intl.formatNumber(0, GlobalFormat.CurrencyDefault)}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          label={intl.formatMessage(financeMessage.approval.field.status)}
          value={data.status ? data.status.value : 'N/A'}
        />
        <TextField
          {...GlobalStyle.TextField.ReadOnly}
          multiline
          label={intl.formatMessage(financeMessage.approval.field.notes)}
          value={data.notes || 'N/A'}
        />
        {
          data.changes &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.createdBy)}
            value={data.changes.created && data.changes.created.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.createdAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
        {
          data.changes &&
          (data.changes.updated && data.changes.updatedAt) &&
          <TextField
            {...GlobalStyle.TextField.ReadOnly}
            label={props.intl.formatMessage(layoutMessage.field.updatedBy)}
            value={data.changes.updated.fullName || 'N/A'}
            helperText={props.intl.formatDate(data.changes.updatedAt, GlobalFormat.DateTime) || 'N/A'}
          />
        }
      </CardContent>
    </Card>
  );

  return render;
};

export const FinanceInformation = compose<AllProps, OwnProps>(
  injectIntl
)(financeInformation);