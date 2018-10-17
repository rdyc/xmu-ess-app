// import { IBaseChanges, IQueryCollectionState } from '@generic/interfaces';
// import { ConnectedReduxProps } from '@generic/types';
// import { ILeaveAllRequest } from '@lookup/classes/queries';
// import { ILeave } from '@lookup/classes/response';
// import { Divider, Grid, List, ListItem, ListSubheader, Typography, WithStyles } from '@material-ui/core';
// import styles from '@styles';
// import * as moment from 'moment';
// import * as React from 'react';
// import { FormattedNumber, FormattedPlural } from 'react-intl';
// import { RouteComponentProps } from 'react-router';
// import { isArray } from 'util';

// interface PropsFromState extends RouteComponentProps<void> {
//   leaveState: IQueryCollectionState<ILeaveAllRequest, ILeave>;
// }

// type AllProps = PropsFromState & 
//                 ConnectedReduxProps & 
//                 WithStyles<typeof styles>;

// export const LeaveListComponent: React.SFC<AllProps> = props => {
//   const { history  } = props;
//   const { response, isLoading  } = props.leaveState;

//   const handleClick = (leaveUid: string) => {
//     if (!isLoading) {
//       history.push(`/leave/details/${leaveUid}`);
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

//   const renderLeaveList = (leaves: ILeave[]) => {
//     const len = leaves.length - 1;

//     return (
//       leaves.map((leave, i) => 
//         <div key={leave.uid}>
//           <ListItem 
//             button={!isLoading} 
//             key={leave.uid} 
//             onClick={() => handleClick(leave.uid)}
//           >
//             <Grid container spacing={24}>
//               <Grid item xs={8} sm={8}>
//                 <Typography 
//                   noWrap 
//                   color="primary" 
//                   variant="body2"
//                 >
//                   {leave.name}
//                 </Typography>
//                 <Typography 
//                   noWrap
//                   variant="body1"
//                 >
//                   {leave.company && leave.company.name}
//                 </Typography>
//                 <Typography 
//                   noWrap
//                   color="textSecondary" 
//                   variant="caption"
//                 >
//                   {leave.year}
//                 </Typography>
//               </Grid>
//               <Grid item xs={4} sm={4}>
//                 <Typography 
//                   noWrap 
//                   variant="body1" 
//                   align="right"
//                 >
//                   {parseChanges(leave.changes)}
//                 </Typography>
//                 <Typography 
//                   noWrap
//                   variant="caption" 
//                   align="right"
//                 >
//                   {leave.changes && moment(leave.changes.updatedAt ? leave.changes.updatedAt : leave.changes.createdAt).fromNow()}
//                 </Typography>
//               </Grid>
//             </Grid>
//           </ListItem>
//           {len !== i && <Divider />}
//         </div>
//       )
//     );
//   };

//   return (
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
//                   <FormattedPlural one="leave" other="leaves" value={response.metadata.total} />
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
//      {
//         response &&
//         isArray(response.data) && 
//         renderLeaveList(response.data)
//       }
//     </List>
//   );
// };