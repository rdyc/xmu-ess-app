import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Grid,
  List,
  ListItem,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import { IPurchaseItem, ISettlementDetail } from '@purchase/classes/response/purchaseSettlement';
import { PurchaseSettlementDetailProps } from '@purchase/components/purchaseSettlement/detail/PurchaseSettlementDetail';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';
import { isNullOrUndefined } from 'util';

export const PurchaseSettlementDetailView: React.SFC<PurchaseSettlementDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  
  const { isLoading, response } = props.purchaseSettlementState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="purchase-detail-dialog-title"
      aria-describedby="purchase-detail-dialog-description"
    >
      <DialogTitle id="purchase-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="purchase-detail-dialog-description">
          {dialogDescription || 'description'}
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleDialogClose} color="primary">
          {dialogCancelText || 'cancel'}
        </Button>
        <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
          {dialogConfirmedText || 'confirm'}
        </Button>
      </DialogActions>
    </Dialog>
  );

  const renderDetail = (purchase: ISettlementDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="purchasesettlement.infoTitle"/>}
        subheader={<FormattedMessage id="purchasesettlement.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.uid" />}
          value={purchase.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.customerUid" />}
          value={purchase.customer ? purchase.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.project" />}
          value={purchase.project ? `${purchase.project.uid} - ${purchase.project.name}` : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.createdBy" />}
          value={purchase.changes.created ? purchase.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.settlementdate" />}
          value={intl.formatDate(purchase.date, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.currencyType" />}
          value={purchase.currency ? purchase.currency.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.rate" />}
          value={intl.formatNumber(purchase.rate)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.request" />}
          value={intl.formatNumber(purchase.request)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.requestIDR" />}
          value={intl.formatNumber(purchase.requestInIDR)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.actual" />}
          value={intl.formatNumber(purchase.actual)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.actualIDR" />}
          value={intl.formatNumber(purchase.actualInIDR)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.advance" />}
          value={intl.formatNumber(purchase.advance)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.balanceDue" />}
          value={intl.formatNumber(purchase.balanceDue)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.difference" />}
          value={intl.formatNumber(purchase.difference)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.differenceIDR" />}
          value={intl.formatNumber(purchase.differenceInIDR)}
        />
        {!isNullOrUndefined(purchase.notes) ?
          <TextField
            fullWidth
            contentEditable={false}
            margin="normal"
            label={<FormattedMessage id="purchase.field.information.notes" />}
            value={purchase.notes ? purchase.notes : 'N/A'}
          /> : ''
        }
        {!isNullOrUndefined(purchase.reject) ?
          <TextField
            fullWidth
            contentEditable={false}
            margin="normal"
            label={<FormattedMessage id="purchase.field.information.rejectreason" />}
            value={purchase.reject ? purchase.reject : 'N/A'}
          /> : ''
        }
      </CardContent>
    </Card>
  );
  
  const renderItems = (items: IPurchaseItem[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="purchase.itemTitle" />}
        subheader={<FormattedMessage id="purchase.itemSubTitle" />}
      />
      <CardContent>
        <List>
        {
          items.map(item => 
            <ListItem disableGutters key={item.uid}>
              <Grid container>
                <Grid item xs={4}>
                  <ListItemText
                    primary={item.uid} 
                    secondary={item.description ? item.description : 'N/A'}
                  />
                </Grid>
                <Grid item xs={8}>
                  <Typography 
                    noWrap 
                    align="right"
                  >
                      <ListItem>
                      <Typography
                        noWrap
                        color="primary"
                        variant="body2"
                        align="left"
                      >
                        <FormattedMessage id="purchase.itemTitle.request" />
                      </Typography>
                      </ListItem>
                        <ListItem>
                     <Typography
                          noWrap
                          color="secondary"
                          variant="headline">
                          <FormattedNumber
                            value={item.requestValue}
                          />
                      </Typography>
                      </ListItem>
                     
                      <ListItem>
                      <Typography
                        noWrap
                        color="primary"
                        variant="body2"
                        align="left"
                      >
                        <FormattedMessage id="purchase.itemTitle.actual" />
                      </Typography>
                      </ListItem>
                      <ListItem>
                      <Typography
                          noWrap
                          color="secondary"
                          variant="headline">
                          <FormattedNumber
                            value={item.actualValue}
                          />
                      </Typography>
                      </ListItem>
                     
                      <ListItem>
                      <Typography
                        noWrap
                        color="primary"
                        variant="body2"
                        align="left"
                      >
                        <FormattedMessage id="purchase.itemTitle.variance" />
                      </Typography>
                      </ListItem>
                      <ListItem>
                      <Typography
                          noWrap
                          color="secondary"
                          variant="headline">
                          <FormattedNumber
                            value={item.varianceValue}
                          />
                      </Typography>
                      </ListItem>
                  </Typography>
                </Grid>
              </Grid>
            </ListItem>
          )
        }
        </List>
      </CardContent>
    </Card>
  );

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
          alignItems="flex-start"
        >
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              renderDetail(response.data)
            }
          </Grid>
          
          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.items &&
              renderItems(response.data.items)
            }
          </Grid>

          <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.workflow &&
              response.data.workflow.steps &&
              <WorkflowStep steps={response.data.workflow.steps} />
            }
          </Grid>

        </Grid>
      }
      {renderDialog}
    </React.Fragment>
  );

  return render;
};