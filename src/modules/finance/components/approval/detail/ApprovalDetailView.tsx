import { ApprovalDetailProps } from '@finance/components/approval/detail/ApprovalDetail';
import {
  Grid,
  Typography,
} from '@material-ui/core';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { FinanceInformation } from './shared/FinanceInformation';

export const ApprovalDetailView: React.SFC<ApprovalDetailProps> = props => {
  const { 
    handleToDocument
  } = props;
  const { isLoading, response } = props.financeApprovalState.detail;

  const render = (
    <React.Fragment>
      {
        isLoading && 
        <Typography variant="body2">
          <FormattedMessage id="global.loading"/>
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