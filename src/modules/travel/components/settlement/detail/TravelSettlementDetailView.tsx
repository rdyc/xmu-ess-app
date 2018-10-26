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
  Divider,
  Grid,
  List,
  ListItem,
  TextField,
  Typography,
} from '@material-ui/core';
import { WorkflowStep } from '@organization/components';
import { ITravelSettlementDetail, ITravelSettlementItem } from '@travel/classes/response';
import * as React from 'react';
import { FormattedMessage } from 'react-intl';
import { SettlementDetailProps } from './TravelSettlementDetail';

export const TravelSettlementDetailView: React.SFC<SettlementDetailProps> = props => {
  const { 
    dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText,
    handleDialogClose, handleDialogConfirmed, intl
  } = props;
  
  const { isLoading, response } = props.travelSettlementState.detail;

  const renderDialog = (
    <Dialog
      fullScreen={dialogFullScreen}
      open={dialogOpen}
      aria-labelledby="travel-detail-dialog-title"
      aria-describedby="travel-detail-dialog-description"
    >
      <DialogTitle id="travel-detail-dialog-title">
        {dialogTitle || 'title'}
      </DialogTitle>
      <DialogContent>
        <DialogContentText id="travel-detail-dialog-description">
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

  const renderDetail = (travel: ITravelSettlementDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.infoTitle"/>}
        subheader={<FormattedMessage id="travelSettlement.infoSubTitle" />}
      />
      <CardContent>
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.settlementuid" />}
          value={travel.uid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.uid" />}
          value={travel.travelUid}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.status" />}
          value={travel.status ? travel.status.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.requestor" />}
          value={travel.employee ? travel.employee.fullName : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.destination" />}
          value={travel.destination ? travel.destination.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.start" />}
          value={intl.formatDate(travel.start, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.end" />}
          value={intl.formatDate(travel.end, {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
          })}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.customer" />}
          value={travel.customer ? travel.customer.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.project" />}
          value={travel.project ? travel.project.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.site" />}
          value={travel.site ? travel.site.name : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.activity" />}
          value={travel.activity ? travel.activity.value : 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.objectives" />}
          value={travel.objective || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.target" />}
          value={travel.target || 'N/A'}
        />
        <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.comments" />}
          value={travel.comment || 'N/A'}
        />        
      </CardContent>
    </Card>
  );

  const renderSummary = (travel: ITravelSettlementDetail) => (
    <Card square>
      <CardHeader 
        title={<FormattedMessage id="travel.summaryTitle" />}
        subheader={<FormattedMessage id="travel.summarySubTitle" />}
      />
      <CardContent>
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.siteValue" />}
          value={intl.formatNumber(travel.site ? travel.site.value : 0)}
          />        
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.totalDuration" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalDuration : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.totalDiemValue" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalDiemValue : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.costTransport" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalCostTransport : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.costHotel" />}
          value={intl.formatNumber(travel.summary ? travel.summary.totalCostHotel : 0)}
          />
          <TextField
          fullWidth
          contentEditable={false}
          margin="normal"
          label={<FormattedMessage id="travel.field.information.total" />}
          value={intl.formatNumber(travel.total || 0)}
        />        
      </CardContent>
    </Card>
  );

  const renderItems = (items: ITravelSettlementItem[]) => {
    const len = items.length - 1;
    return (
      <Card square>
        <CardHeader 
          title={<FormattedMessage id="travel.itemTitle" />}
          subheader={<FormattedMessage id="travel.itemSubTitle" />}
        />
        <CardContent>
          <List>
          {
            items.map((item, i) => (
              <div key={item.uid}>
              <ListItem 
                disableGutters 
                key={item.uid}
              >
                <Grid container spacing={24}>
                <Grid item xs={12} sm={12}>
                  <Typography 
                    noWrap 
                    color="primary" 
                    variant="body2"
                  >
                    {item.employee && item.employee.fullName}
                  </Typography>
                  <Typography 
                    noWrap
                    variant="body1"
                  >
                    {item.from} &nbsp;to&nbsp; {item.destination} 
                  </Typography>
                  <Typography 
                    noWrap
                    color="textSecondary" 
                    variant="caption"
                  >
                    {`Transport Cost: ${item.costTransport}`} &bull; {`Hotel Cost: ${item.costTransport}`} &nbsp;
                  </Typography>
                  <Typography 
                    noWrap
                    color="textSecondary" 
                    variant="caption"
                  >
                    {`Diem Value: ${item.amount} / ${item.duration} days`}; &nbsp;
                  </Typography>
                </Grid>
              </Grid>              
              </ListItem>
              {len !== i && <Divider />}
              </div>
            ))
          }        
          </List>
        </CardContent>
      </Card>
    );
  };

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
          
          {
            response &&
            response.data &&
            <Grid item xs={12} md={3}>
              {renderSummary(response.data)}
            </Grid>
          }
          {
            response &&
            response.data &&
            response.data.items &&
            <Grid item xs={12} md={5}>
            {renderItems(response.data.items)}
            </Grid>
          }
          <Grid item xs={12} md={8}>
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
