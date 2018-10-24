// import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grid, Typography } from '@material-ui/core';
// import { WorkflowStep } from '@organization/components';
// import { TimesheetInformation } from '@timesheet/components/entry/detail/shared/TimesheetInformation';
// import * as React from 'react';
// import { FormattedMessage } from 'react-intl';
// import { ApprovalDetailProps } from './ApprovalDetail';

// export const ApprovalDetailView: React.SFC<ApprovalDetailProps> = props => {
//   const {
//     dialogFullScreen, dialogOpen, dialogTitle, dialogDescription, dialogCancelText, dialogConfirmedText, handleDialogClose, handleDialogConfirmed, intl
//   } = props;

//   const { isLoading, response } = props.timesheetApprovalState.detail;

//   const renderDialog = (
//     <Dialog
//       fullScreen={dialogFullScreen}
//       open={dialogOpen}
//       aria-labelledby="timesheet-detail-dialog-title"
//       aria-describedby="timesheet-detail-dialog-description"
//     >
//       <DialogTitle id="timesheet-detail-dialog-title">
//         {dialogTitle || 'title'}
//       </DialogTitle>
//       <DialogContent>
//         <DialogContentText id="timesheet-detail-dialog-description">
//           {dialogDescription || 'description'}
//         </DialogContentText>
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={handleDialogClose} color="primary">
//           {dialogCancelText || 'cancel'}
//         </Button>
//         <Button onClick={handleDialogConfirmed} color="primary" autoFocus>
//           {dialogConfirmedText || 'confirm'}
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );

//   const render = (
//     <React.Fragment>
//       {
//         isLoading &&
//         <Typography variant="body2">
//           <FormattedMessage id="global.loading" />
//         </Typography>
//       }
//       {
//         response &&
//         <Grid
//           container
//           spacing={24}
//           direction="row"
//           justify="flex-start"
//           alignItems="flex-start"
//         >
//           <Grid item xs={12} md={4}>
//             {
//               response &&
//               response.data &&
//               <TimesheetInformation
//                 timesheet= {response.data}
//                 intl={intl}
//               />
//             }
//           </Grid>
//           <Grid item xs={12} md={8}>
//             {
//               response &&
//               response.data &&
//               response.data.workflow &&
//               response.data.workflow.steps &&
//               <WorkflowStep steps={response.data.workflow.steps} />
//             }
//           </Grid>
//         </Grid>
//       }
//       {renderDialog}
//     </React.Fragment>
//   );

//   return render;
// };