// import { ProjectType } from '@common/classes/types';
import {
  // Avatar,
  Button,
  Card,
  CardContent,
  CardHeader,
  // Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  // FormControlLabel,
  Grid,
  List,
  ListItem,
  // ListItemAvatar,
  ListItemText,
  TextField,
  Typography,
} from '@material-ui/core';
// import PersonIcon from '@material-ui/icons/Person';
import { WorkflowStep } from '@organization/components';
import { IPurchaseDetail, IPurchaseItemRequest } from '@purchase/classes/response/purchaseRequest';
import { PurchaseRequestDetailProps } from '@purchase/components/purchaseRequest/detail/PurchaseRequestDetail';
import * as React from 'react';
import { FormattedMessage, FormattedNumber } from 'react-intl';

export const PurchaseRequestDetailView: React.SFC<PurchaseRequestDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  
  const { isLoading, response } = props.purchaseRequestState.detail;

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

  const renderDetail = (purchase: IPurchaseDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="purchase.infoTitle"/>}
        subheader={<FormattedMessage id="purchase.infoSubTitle" />}
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
          label={<FormattedMessage id="purchase.field.information.notes" />}
          value={purchase.notes ? purchase.notes : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.information.customerUid" />}
          value={purchase.customer ? purchase.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="project.field.information.name" />}
          value={purchase.project ?  purchase.project.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purhcase.field.information.createdBy" />}
          value={purchase.changes.created ? purchase.changes.created.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.date" />}
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
          value={intl.formatNumber(purchase.rate || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.totalRequest" />}
          value={intl.formatNumber(purchase.request)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.totalRequestIdt" />}
          value={intl.formatNumber(purchase.requestIDR || 0)}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="purchase.field.information.advance" />}
          value={intl.formatNumber(purchase.advance)}
        />
      </CardContent>
    </Card>
  );
  
  // const renderHistories = (histories: IPurchaseHistory[]) => (
  //   <Card square>
  //     <CardHeader 
  //       title={<FormattedMessage id="project.historiesTitle" />}
  //       subheader={<FormattedMessage id="project.historiesSubTitle" />}
  //     />
  //     <CardContent>
  //       <List>
  //       {
  //         histories.map(item => 
  //           item.employees &&
  //           <ListItem 
  //             disableGutters 
  //             key={item.positionUid}
  //           >
  //             <ListItemAvatar>
  //               <Avatar
  //                 alt={item.position.fullName} 
  //               >
  //                 <PersonIcon/>
  //               </Avatar>
  //             </ListItemAvatar>
  //             <ListItemText
  //               primary={item.employees} 
  //               secondary={item.employees.email}
  //             />
  //           </ListItem>
  //         )
  //       }
  //       </List>
  //     </CardContent>
  //   </Card>
  // );

  const renderItems = (items: IPurchaseItemRequest[]) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="project.siteTitle" />}
        subheader={<FormattedMessage id="project.siteSubTitle" />}
      />
      <CardContent>
        <List>
        {
          items.map(item => 
            <ListItem disableGutters key={item.uid}>
              <Grid container>
                <Grid item xs={7}>
                  <ListItemText
                    primary={item.uid} 
                    secondary={item.description ? item.description : 'N/A'}
                  />
                </Grid>
                <Grid item xs={5}>
                  <Typography 
                    noWrap 
                    variant="display1" 
                    align="right"
                  >
                    <FormattedNumber 
                      value={item.requestValue} 
                    />
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
          
          {/* <Grid item xs={12} md={4}>
            {
              response &&
              response.data &&
              response.data.histories &&
              renderHistories(response.data.histories)
            }
          </Grid> */}

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