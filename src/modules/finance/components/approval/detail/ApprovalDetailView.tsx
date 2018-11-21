import { ApprovalDetailProps } from '@finance/components/approval/detail/ApprovalDetail';
import { layoutMessage } from '@layout/locales/messages';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FinanceInformation } from './shared/FinanceInformation';

export const ApprovalDetailView: React.SFC<ApprovalDetailProps> = props => {
  const { 
    handleToDocument, intl
  } = props;
  const { isLoading, response } = props.financeApprovalState.detail;

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          {intl.formatMessage(layoutMessage.text.loading)}
        </Typography>
      }
      {
        response && 
        <Grid 
          container 
          spacing={16} 
          direction="row"
          justify="flex-start"
          alignItems="flex-start">
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              <FinanceInformation
                data={response.data}
                handleToDocument={handleToDocument}
              />
            }
          </Grid>
        </Grid>
      }
    </React.Fragment>
  );
  return render;
};