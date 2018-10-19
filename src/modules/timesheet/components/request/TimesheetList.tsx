// import AppMenu from '@constants/AppMenu';
// import { IBaseChanges } from '@generic/interfaces';
// import { withLayout, WithLayout } from '@layout/hoc/withLayout';
// import { withNavBottom, WithNavBottom } from '@layout/hoc/withNavBottom';
// import { Divider, Grid, List, ListItem, ListSubheader, Paper, Typography } from '@material-ui/core';
// import { ITimesheet } from '@timesheet/classes/response';
// import { TimesheetField } from '@timesheet/classes/types';
// import withApiTimesheetAll, { WithApiTimesheetAllHandler } from '@timesheet/enhancers/request/withApiTimesheetAll';
// import withTimesheetAll, { WithTimesheetAll } from '@timesheet/enhancers/request/withTimesheetAll';
// import * as moment from 'moment';
// import * as React from 'react';
// import { FormattedDate, FormattedNumber, FormattedPlural, InjectedIntlProps, injectIntl } from 'react-intl';
// import { RouteComponentProps, withRouter } from 'react-router';
// import { compose, lifecycle, ReactLifeCycleFunctions, setDisplayName } from 'recompose';
// import { isArray } from 'util';

// type AllProps
//   = WithTimesheetAll
//   & WithLayout
//   & WithNavBottom
//   & WithApiTimesheetAllHandler
//   & RouteComponentProps
//   & InjectedIntlProps;

// const requestList: React.SFC<AllProps> = props => {
//   const { history } = props;
//   const { isLoading, response } = props.timesheetAllState;

//   const handleClick = (timesheetUid: string) => {
//     if (!isLoading) {
//       history.push(`/timesheet/details/${timesheetUid}`);
//     }
//   };

//   const parseChanges = (changes: IBaseChanges | null) => {
//     let result = 'Unknown';

//     if (!changes) {
//       return result;
//     }

//     if (changes.updatedBy !== null) {
//       result = changes.updated ? (changes.updated ? changes.updated.fullName : changes.updatedBy) : changes.updatedBy;
//     } else {
//       result = changes.created ? changes.created.fullName : changes.createdBy;
//     }

//     return result;
//   };

//   const renderTimesheetList = (timesheets: ITimesheet[]) => {
//     const len = timesheets.length - 1;

//     return (
//       timesheets.map((timesheet, i) =>
//         <div key={timesheet.uid}>
//           <ListItem
//             button={!isLoading}
//             key={timesheet.uid}
//             onClick={() => handleClick(timesheet.uid)}
//           >
//             <Grid container spacing={24}>
//               <Grid item xs={8} sm={8}>
//                 <Typography
//                   noWrap
//                   color="primary"
//                   variant="body2"
//                 >
//                   {timesheet.uid}
//                 </Typography>
//                 <Typography
//                   noWrap
//                   variant="body1"
//                 >
//                   {timesheet.employee && timesheet.employee.fullName} &bull; &nbsp;
//                   <FormattedDate 
//                     year="numeric"
//                     month="short"
//                     day="numeric"
//                     value={timesheet.date || ''} 
//                   />
//                 </Typography>
//                 <Typography
//                   noWrap
//                   color="textSecondary"
//                   variant="caption"
//                 >
//                   {timesheet.customer && timesheet.customer.name} &bull; {timesheet.project && timesheet.project.name}
//                 </Typography>
//               </Grid>
//               <Grid item xs={4} sm={4}>
//                 <Typography
//                   noWrap
//                   variant="body1"
//                   align="right"
//                 >
//                   {timesheet.status && timesheet.status.value}
//                 </Typography>
//                 <Typography
//                   noWrap
//                   color="secondary"
//                   variant="caption"
//                   align="right"
//                 >
//                   {parseChanges(timesheet.changes)}
//                 </Typography>
//                 <Typography 
//                   noWrap
//                   variant="caption" 
//                   align="right"
//                 >
//                   {timesheet.changes && moment(timesheet.changes.updatedAt ? timesheet.changes.updatedAt : timesheet.changes.createdAt).fromNow()}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </ListItem>
//           {len !== i && <Divider />}
//         </div>
//       )
//     );
//   };

//   const RenderList = () => (
//     <List
//       component="nav"
//       subheader={
//         <ListSubheader
//           component="div"
//         >
//           {
//             response &&
//             response.metadata && 
//             <Grid container spacing={24}>
//               <Grid item xs={6} sm={6}>
//                 <Typography variant="caption" color="primary">
//                   <FormattedNumber value={response.metadata.total} /> &nbsp;
//                   <FormattedPlural one="timesheet" other="timesheets" value={response.metadata.total} />
//                 </Typography>
//               </Grid>
//               <Grid item xs={6} sm={6}>
//                 <Typography variant="caption" align="right" color="primary">
//                   <FormattedNumber value={response.metadata.paginate.current} /> of <FormattedNumber value={response.metadata.paginate.total} />
//                 </Typography>
//               </Grid>
//             </Grid>
//           }
//         </ListSubheader>
//       }
//     >
//       {
//         response &&
//         isArray(response.data) && 
//         renderTimesheetList(response.data)
//       }
//     </List>
//   );

//   return (
//     <React.Fragment>
//       {isLoading && response && <Typography variant="body2">loading</Typography>}     
//       {response &&
//         <Paper 
//           square 
//           elevation={1}
//         >
//         <RenderList/>
//         </Paper>}
//     </React.Fragment>
//   );
// };

// const lifecycles: ReactLifeCycleFunctions<AllProps, {}> = {
//   componentDidMount() { 
//     const { 
//       handleNext, handlePrev, handleSync, 
//       handleOrder, handleSize, handleSort, 
//       layoutDispatch, navBottomDispatch, 
//       history, intl 
//     } = this.props;

//     layoutDispatch.changeView({
//       uid: AppMenu.TimesheetHistory,
//       parentUid: AppMenu.Timesheet,
//       title: intl.formatMessage({id: 'timesheet.title'}),
//       subTitle : intl.formatMessage({id: 'timesheet.subTitle'})
//     });

//     layoutDispatch.modeListOn();
//     layoutDispatch.searchShow();
//     layoutDispatch.actionCentreShow();

//     navBottomDispatch.assignCallbacks({
//       onNextCallback: handleNext,
//       onPrevCallback: handlePrev,
//       onSyncCallback: handleSync,
//       onOrderCallback: handleOrder,
//       onDirectionCallback: handleSort,
//       onAddCallback: () => history.push('/timesheet/form'),
//       onSizeCallback: handleSize,
//     });

//     const items = Object.keys(TimesheetField)
//       .map(key => ({ id: key, name: TimesheetField[key] }));

//     navBottomDispatch.assignFields(items);
//   },

//   componentWillUnmount() {
//     const { layoutDispatch, navBottomDispatch } = this.props;

//     layoutDispatch.changeView(null);
//     layoutDispatch.modeListOff();
//     layoutDispatch.searchHide();
//     layoutDispatch.modeSearchOff();
//     layoutDispatch.actionCentreHide();
//     layoutDispatch.moreHide();

//     navBottomDispatch.dispose();
//   }
// };

// export default compose<AllProps, {}>(
//   setDisplayName('TimesheetList'),
//   withApiTimesheetAll({ 
//     orderBy: 'uid',
//     direction: 'descending',
//   }),
//   withTimesheetAll,
//   withLayout,
//   withNavBottom,
//   withRouter,
//   injectIntl,
//   lifecycle<AllProps, {}>(lifecycles),
// )(requestList);